import DocPage from '@/components/DocPage';
import JadwalTugasVisual from '@/components/JadwalTugasVisual';
import { CalendarIcon } from '@/components/icons/NeonIcons';

export const metadata = {
  title: 'Documentation - Jadwal Tugas | Student Lab',
};

export default function JadwalTugasDocumentationPage() {
  return (
    <DocPage
      title="Jadwal Tugas"
      tagline="Kelola deadline dan tugas kuliah dalam satu tempat yang rapi & terorganisir."
      badge="Dokumentasi"
      icon={<CalendarIcon size={38} />}
      color="var(--neon-pink)"
      glow="rgba(255, 79, 216, 0.35)"
      overview="Jadwal Tugas adalah tools untuk mengelola semua tugas kuliahmu. Tambahkan tugas beserta tanggal jatuh tempo, tandai yang sudah selesai, dan jaga jadwal tetap rapi — semuanya dalam satu daftar yang mudah digunakan."
      capabilities={[
        'Menambahkan tugas dengan tanggal jatuh tempo via pemilih kalender.',
        'Menandai tugas yang sudah selesai dengan animasi coret yang halus.',
        'Menghapus tugas yang tidak diperlukan lagi.',
        'Menampilkan tanggal terformat dengan rapi (contoh: 27 Agu 2026).',
        'Daftar tugas tersimpan secara pribadi untuk setiap pengguna.',
      ]}
      visualExamples={[
        {
          title: 'Pratinjau visual (animasi)',
          note: 'Contoh nyata daftar tugas yang sedang berjalan',
          view: <JadwalTugasVisual />,
        },
      ]}
      sections={[
        {
          title: 'Cara memulai',
          body: [
            '1. Buka menu Jadwal Tugas (pastikan sudah masuk/login).',
            '2. Gunakan kolom input untuk menambahkan judul tugas dan pilih tanggal lewat ikon kalender.',
            '3. Klik tombol "Tambah" untuk memasukkan tugas ke daftar.',
            '4. Kelola tugas lewat daftar yang tampil secara otomatis.',
          ],
        },
        {
          title: 'Menandai selesai & menghapus',
          body: [
            'Klik tanda centang pada suatu tugas untuk menandainya selesai — ditampilkan dengan animasi coret.',
            'Gunakan tombol hapus untuk membuang tugas yang tidak diperlukan lagi.',
            'Tugas yang sudah selesai berpindah secara otomatis di dalam daftar.',
          ],
        },
        {
          title: 'Tips menjaga produktivitas',
          body: [
            'Tambahkan tanggal jatuh tempo untuk setiap tugas agar tidak terlewat.',
            'Tandai tugas segera setelah selesai untuk menjaga daftar tetap ter-update.',
            'Jadikan kebiasaan meninjau daftar tugas secara berkala.',
          ],
        },
      ]}
      toolHref="/jadwal-tugas"
      toolLabel="Jadwal Tugas"
    />
  );
}
