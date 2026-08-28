import DocPage from '@/components/DocPage';
import { RocketIcon } from '@/components/icons/NeonIcons';

export const metadata = {
  title: 'Documentation - Rangkum AI | Student Lab',
};

export default function RangkumDocumentationPage() {
  return (
    <DocPage
      title="Rangkum AI"
      tagline="Ubah dokumen kuliah menjadi catatan belajar yang lengkap & terstruktur."
      badge="Dokumentasi"
      icon={<RocketIcon size={38} />}
      color="var(--neon-cyan)"
      glow="rgba(34, 224, 255, 0.35)"
      overview="Rangkum AI adalah tools yang memanfaatkan AI untuk merangkum dokumen secara otomatis. Cukup unggah file PDF, DOCX, TXT, atau Markdown, lalu AI menyusun ringkasan eksekutif, poin penting, glosarium, tips menghafal, dan action items — siap kamu pelajari atau bagikan."
      capabilities={[
        'Merangkum PDF, DOCX, TXT, dan Markdown secara otomatis.',
        'Output lengkap: ringkasan eksekutif, poin penting, glosarium, tips menghafal, dan action items.',
        'Menyimpan hasil ke riwayat untuk dibuka ulang kapan saja.',
        'Menyalin, mengunduh sebagai file Markdown, atau mengekspor menjadi PDF.',
        'Pilihan ukuran kertas PDF: A5, B5, A4, dan Folio.',
        'Animasi ketik kata-per-kata saat hasil ditampilkan agar mudah dibaca.',
      ]}
      examples={[
        {
          title: 'File Asli (Input)',
          badge: 'Input',
          fileUrl: '/docs/input-definisi-kup.pdf',
          fileName: '01. Definisi KUP.pdf',
          note: 'Dokumen mentah yang diunggah',
        },
        {
          title: 'Hasil Rangkuman (Output)',
          badge: 'Output',
          fileUrl: '/docs/hasil-rangkuman-a4.pdf',
          fileName: 'Perangkum Dokumen AI A4.pdf',
          note: 'Hasil generate oleh Rangkum AI (A4)',
        },
      ]}
      sections={[
        {
          title: 'Cara memulai',
          body: [
            '1. Buka menu Rangkum AI (pastikan sudah masuk/login).',
            '2. Seret dan lepas file, atau klik area upload untuk memilih file dari perangkatmu.',
            '3. Format yang didukung: PDF, DOCX, TXT, dan Markdown, dengan ukuran maksimal 4MB.',
            '4. Klik tombol "Rangkum Sekarang" dan tunggu AI menyusun hasilnya.',
          ],
        },
        {
          title: 'Tips hasil terbaik',
          body: [
            'Gunakan dokumen dengan teks yang jelas dan resolusi baik agar AI membaca dengan akurat.',
            'Jika file terlalu besar, kompres dulu ukurannya agar tidak melebihi batas 4MB.',
            'Manfaatkan bagian glosarium dan action items untuk bahan belajar dan revisi.',
          ],
        },
        {
          title: 'Menyimpan & membagikan',
          body: [
            'Setiap hasil rangkuman otomatis tersimpan di riwayat.',
            'Kamu bisa menyalin teks, mengunduh sebagai Markdown, atau mengunduh sebagai PDF dengan ukuran kertas pilihanmu.',
            'Mode gelap tersedia agar nyaman dibaca siang maupun malam.',
          ],
        },
      ]}
      toolHref="/rangkum"
      toolLabel="Rangkum AI"
    />
  );
}
