# 📄 Perangkum Dokumen AI

Website perangkum dokumen otomatis berbasis **Next.js 14 (App Router)** + **Tailwind CSS** yang mengekstrak teks dari file (PDF, DOCX, TXT, Markdown) lalu merangkumnya menggunakan **OpenAI API** dengan prompt perangkuman bawaan yang sudah lengkap.

Pengguna cukup meng-upload file dan klik **Rangkum** — tanpa perlu menulis prompt apa pun.

## ✨ Fitur

- **Upload file** — Drag & drop atau klik, support PDF, DOCX, TXT, MD, dengan validasi ekstensi di client & server.
- **Preview teks** — Menampilkan cuplikan 300 karakter pertama dari file yang diekstrak.
- **Merangkum dengan AI** — Prompt perangkuman akademik bawaan (Executive Summary, Key Takeaways, Glosarium, Tips, Action Items, dll).
- **Output Markdown lengkap** — Bold, italik, emoji, tabel, heading hierarkis. Dirender dengan `react-markdown` + `remark-gfm`.
- **Salin & Unduh** — Copy ke clipboard atau download sebagai file `.md`.
- **Riwayat** — Disimpan di `localStorage`, bisa dipilih kembali atau dihapus per item / semua.
- **Responsive** — Mobile, tablet, desktop.
- **Dark Mode** — Toggle terang/gelap dengan `next-themes`.

## 📁 Struktur

```
app/
├── api/summarize/route.ts   # API endpoint (prompt bawaan + OpenAI)
├── page.tsx                 # Halaman utama
└── layout.tsx               # Layout global + ThemeProvider
components/
├── FileUpload.tsx           # Upload drag & drop
├── SummaryOutput.tsx        # Render markdown + copy/download
├── Header.tsx               # Header + toggle dark mode
└── History.tsx              # Riwayat rangkuman
lib/
├── fileParser.ts            # Ekstrak teks PDF/DOCX/TXT/MD
└── constants.ts             # Batasan & daftar ekstensi
styles/globals.css
```

## 🚀 Instalasi & Menjalankan

1. **Clone / buka folder project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Siapkan environment variable**
   ```bash
   cp .env.example .env.local
   ```
   Lalu isi key sesuai provider yang dipakai:
   - **OpenAI**: set `AI_PROVIDER=openai` dan isi `OPENAI_API_KEY=sk-...`
   - **Gemini (Google)**: set `AI_PROVIDER=gemini` dan isi `GEMINI_API_KEY=AIza...` (ambil dari https://aistudio.google.com/apikey)

   Kamu bisa bebas pindah provider tinggal ubah `AI_PROVIDER` dan key yang sesuai.

4. **Jalankan development server**
   ```bash
   npm run dev
   ```
   Buka **http://localhost:3000**

5. **Build & production**
   ```bash
   npm run build
   npm start
   ```

## 🧪 Cara Menguji

1. Siapkan file uji (PDF, DOCX, TXT, atau MD).
2. Di halaman utama, seret file ke kotak upload (atau klik untuk memilih).
3. Pastikan cuplikan teks muncul.
4. Klik **🚀 Rangkum Sekarang**.
5. Tunggu loading selesai, lalu hasil rangkuman Markdown tampil lengkap.
6. Uji tombol **Salin**, **Download .md**, dan cek **Riwayat**.

## 🔐 Catatan Keamanan

- API key hanya disimpan di environment variable server (`OPENAI_API_KEY`), **tidak pernah** di kode client.
- Validasi format file dilakukan di client dan server.
- Output dirender dengan `react-markdown` (bukan `dangerouslySetInnerHTML`).

## ☁️ Deployment di Vercel

1. Push project ke GitHub.
2. Import di Vercel, isi environment variable `OPENAI_API_KEY` di dashboard.
3. Deploy. `pdf-parse` & `mammoth` berjalan dengan Node.js runtime default.
