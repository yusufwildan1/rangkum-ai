# StudentLab

StudentLab adalah aplikasi web untuk dua kebutuhan kuliah yang sudah tersedia:

- **Rangkum AI** — ekstrak teks dari PDF, DOCX, TXT, atau Markdown dan buat rangkuman Markdown terstruktur.
- **Jadwal Tugas** — catat deadline, tandai tugas selesai, dan simpan lampiran materi sebagai teks.
- **Testimoni pengguna** — pengguna dapat mengirim pengalaman mereka; hanya kiriman yang telah disetujui admin yang tampil di beranda.

## Status akses

Aplikasi menggunakan Google Sign-In. Secara bawaan setiap akun Google dapat masuk. Isi `ALLOWED_EMAILS` hanya bila Anda ingin membatasi akses ke daftar email tertentu. Admin moderasi testimoni ditentukan melalui `ADMIN_EMAILS`.

## Menjalankan secara lokal

1. Instal dependensi: `npm install`
2. Buat `.env.local` dan isi konfigurasi berikut:

```env
DATABASE_URL=postgresql://...
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
# Opsional: batasi akses aplikasi
# ALLOWED_EMAILS=email1@example.com,email2@example.com
# Wajib untuk membuka halaman moderasi /admin/testimonials
ADMIN_EMAILS=admin@example.com

# Pilih satu provider AI
AI_PROVIDER=openai
OPENAI_API_KEY=...
# OPENAI_MODEL=gpt-4o-mini

# atau
# AI_PROVIDER=gemini
# GEMINI_API_KEY=...
# GEMINI_MODEL=gemini-2.0-flash
```

3. Jalankan [schema.sql](./schema.sql) pada database PostgreSQL/Neon.
4. Jalankan `npm run dev`, kemudian buka `http://localhost:3000`.

## Pemeriksaan produksi

```bash
npm run build
npm start
```

## Batasan dan keamanan

- Upload divalidasi di server untuk ekstensi dan ukuran file; batas bawaan adalah 4 MB.
- Endpoint yang membuat data dan endpoint AI memiliki rate limit in-memory per akun. Untuk deployment dengan beberapa instance, ganti penyimpanan in-memory di `lib/rateLimit.ts` dengan penyimpanan bersama seperti Redis atau Vercel KV.
- Kunci AI dan kredensial autentikasi hanya disimpan di environment variable server.
- Error internal dicatat di server; pesan yang dikirim ke pengguna dibuat umum.

Fitur seperti flashcard, sitasi, timer fokus, dan laporan mingguan belum tersedia dan sengaja tidak dipromosikan sebagai fitur aktif.
