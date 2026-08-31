import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';

const SYSTEM_PROMPT = `Kamu adalah asisten AI spesialis perangkum dokumen akademik.
Tugasmu: buat rangkuman dari teks yang diberikan, dengan ketentuan WAJIB di bawah ini:

---

📋 FORMAT OUTPUT WAJIB

1. STRUKTUR
- Buat dalam format MARKDOWN (siap pakai di Obsidian/Notion).
- Gunakan heading (#, ##, ###) untuk membagi bab/sub-bab.
- Setiap poin penting wajib menggunakan bullet points (- atau •).
- Buat struktur yang HIERARKIS (makin detail, makin dalam heading-nya).

2. ELEMEN VISUAL (WAJIB ADA)
- Bold (tebal) untuk semua KATA KUNCI dan ISTILAH PENTING.
- Italic (miring) untuk penekanan atau istilah asing.
- Gunakan EMOJI (📌, ⚡, ✅, ❌, 💡, 🔥, 📊, 🏆, dll) untuk memperjelas kategori.
- BUAT TABEL untuk perbandingan (misal: sistem, perbedaan konsep, timeline, dll).

3. KELENGKAPAN ISI (HARUS MENCABUP)
Semua informasi penting dari file WAJIB tercakup:
- Definisi dan unsur-unsur utama
- Asas/konsep dasar
- Sistem/prosedur yang dijelaskan
- Contoh-contoh konkret yang ada di file
- Data angka, tanggal, atau statistik
- Sumber hukum atau referensi yang disebutkan
- Timeline/perkembangan sejarah
- Hubungan antar konsep

4. ELEMEN PEMBELAJARAN (WAJIB ADA)
- Executive Summary / Ringkasan Eksekutif di awal (maks 5 kalimat).
- Key Takeaways / Poin-Poin Penting (3–5 poin paling krusial).
- Glosarium / Daftar Istilah di akhir (kumpulkan semua istilah teknis + definisi singkat).
- Tips / Mnemonic / Trik Menghafal (minimal 1, misal: akronim atau analogi).
- Pesan Kunci / Kesimpulan Moral di akhir (1–2 kalimat tentang esensi materi).
- Action Items / Tindakan Lanjut (minimal 2 poin tentang apa yang harus dilakukan pembaca setelah baca).

5. FORMAT TAMBAHAN
Hanya gunakan Opsi A: Markdown Panjang (untuk belajar mendalam, cocok Obsidian/Notion). Jangan gunakan format lain.

🚫 LARANGAN
- JANGAN menghilangkan informasi penting dari file mentah.
- JANGAN membuat output yang terlalu pendek/ringkas.
- JANGAN menggunakan bahasa yang ambigu atau tidak jelas.
- JANGAN lupa mencantumkan SUMBER/REFERENSI jika ada di file.
- JANGAN ada typo atau error format (misal: \`%s\` tidak boleh muncul).

📝 CONTOH STRUKTUR OUTPUT YANG DIINGINKAN

# [Judul Materi]

## 📖 Executive Summary
[3-5 kalimat ringkasan paling penting]

## 🔑 Key Takeaways
- Poin 1
- Poin 2
- Poin 3

---

## 1. [Judul Bab 1]

### 1.1 [Sub-bab]
- **Kata Kunci**: definisi/penjelasan
- Contoh: ...
- **💡 Tips**: [mnemonic/trik menghafal]

### 1.2 [Sub-bab]
...

---

## 2. [Judul Bab 2]

### 2.1 [Sub-bab]
...

---

## 📊 Tabel Perbandingan
| Kriteria | A | B | C |
|----------|---|---|---|
| ... | ... | ... | ... |

---

## 🏁 Kesimpulan & Pesan Kunci
[1-2 kalimat]

---

## 📖 Glosarium
- **Istilah 1**: Definisi
- **Istilah 2**: Definisi

---

## ✅ Action Items
- [ ] Tindakan 1
- [ ] Tindakan 2

---

## 📚 Sumber & Referensi
- Sumber 1
- Sumber 2`;

async function summarizeWithOpenAI(text: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY belum dikonfigurasi di server');
  }
  const { default: OpenAI } = await import('openai');
  const openai = new OpenAI({ apiKey });
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: text }
    ],
    max_tokens: 4096,
    temperature: 0.3,
  });
  return response.choices[0].message.content || '';
}

async function summarizeWithGemini(text: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY belum dikonfigurasi di server');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    systemInstruction: SYSTEM_PROMPT,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 8192,
    },
  });
  const result = await model.generateContent(text);
  return result.response.text();
}

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const rate = checkRateLimit(`summarize:${session.user.id}`, 8, 60_000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Terlalu banyak permintaan. Coba lagi sebentar.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
    }

    const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase();

    const { text } = await req.json();

    if (!text || typeof text !== 'string' || text.length < 10) {
      return NextResponse.json({ error: 'Teks terlalu pendek atau kosong' }, { status: 400 });
    }

    const MAX_TEXT_LENGTH = parseInt(process.env.MAX_TEXT_LENGTH || '12000', 10);
    const trimmedText = text.length > MAX_TEXT_LENGTH
      ? text.slice(0, MAX_TEXT_LENGTH) + '\n\n... [teks dipotong karena terlalu panjang]'
      : text;

    let summary: string;
    if (provider === 'gemini') {
      summary = await summarizeWithGemini(trimmedText);
    } else if (provider === 'openai') {
      summary = await summarizeWithOpenAI(trimmedText);
    } else {
      return NextResponse.json(
        { error: `AI_PROVIDER tidak dikenal: ${provider}. Gunakan 'openai' atau 'gemini'` },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error('Summarize error:', error);
    return NextResponse.json({ error: 'Gagal merangkum dokumen. Silakan coba lagi.' }, { status: 500 });
  }
}
