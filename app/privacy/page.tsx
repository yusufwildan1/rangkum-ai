import Header from '@/components/Header';

export const metadata = { title: 'Student Lab - Privasi' };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-6 md:p-10 text-gray-700 dark:text-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            🔒 Kebijakan Privasi
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            Berlaku untuk situs <strong>J4Students</strong> — terakhir diperbarui: Agustus 2026
          </p>

          <div className="space-y-6 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Informasi yang Kami Kumpulkan</h2>
              <p>
                Saat Anda menggunakan J4Students, kami dapat mengumpulkan data berikut:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Data akun:</strong> nama, alamat email, dan foto profil yang Anda berikan melalui login Google.</li>
                <li><strong>Konten Anda:</strong> dokumen yang Anda unggah untuk dirangkum, serta riwayat rangkuman yang dihasilkan.</li>
                <li><strong>Jadwal tugas:</strong> daftar tugas dan tenggat waktu yang Anda buat di fitur Jadwal Tugas.</li>
                <li><strong>Data teknis:</strong> ringkasan aktivitas dasar untuk menjaga keandalan layanan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. Bagaimana Data Digunakan</h2>
              <p>Data yang kami kumpulkan digunakan untuk:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Menyediakan dan menjaga fitur merangkum dokumen dan jadwal tugas.</li>
                <li>Menyimpan riwayat Anda secara terpisah per akun agar tidak hilang.</li>
                <li>Memproses dokumen untuk menghasilkan rangkuman menggunakan model AI.</li>
                <li>Meningkatkan kualitas dan keamanan layanan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Pengolahan oleh Pihak Ketiga</h2>
              <p>
                Untuk menghasilkan rangkuman, teks dokumen dapat dikirim ke layanan AI
                (contoh: Google Gemini). Penyimpanan data menggunakan layanan database
                pihak ketiga (contoh: Neon). Kami berusaha memilih penyedia yang
                memiliki standar keamanan yang baik.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Keamanan Data</h2>
              <p>
                Data Anda disimpan di server yang terlindungi dan hanya dapat diakses
                oleh akun pemiliknya. Anda harus masuk menggunakan akun Google Anda
                sendiri untuk melihat data Anda. Tidak ada antarpengguna yang dapat
                melihat data milik orang lain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Penyimpanan Data di Perangkat</h2>
              <p>
                Sebagian preferensi (misalnya tema terang/gelap) dapat disimpan di
                perangkat Anda. Data inti (riwayat rangkuman & jadwal tugas) disimpan
                di server dan terhubung ke akun Anda.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Hak Anda</h2>
              <p>
                Anda berhak mengakses, memperbaiki, atau menghapus data Anda. Anda dapat
                menghapus riwayat rangkuman dan jadwal tugas dari dalam aplikasi, atau
                menghubungi kami untuk permintaan penghapusan lebih lanjut.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">7. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan
                hubungi kami di:{' '}
                <a href="mailto:zyn@gmail.com" className="text-blue-600 dark:text-blue-400 underline">
                  zyn@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">8. Perubahan Kebijakan</h2>
              <p>
                Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan
                akan ditampilkan di halaman ini. Penggunaan layanan setelah perubahan
                berarti Anda menyetujui kebijakan yang diperbarui.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
