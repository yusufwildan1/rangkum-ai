import Header from '@/components/Header';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-6 md:p-10 text-gray-700 dark:text-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            📄 Syarat &amp; Ketentuan
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            Berlaku untuk situs <strong>J4Students</strong> — terakhir diperbarui: Agustus 2026
          </p>

          <div className="space-y-6 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Penerimaan Syarat</h2>
              <p>
                Dengan menggunakan J4Students, Anda dianggap telah membaca, memahami,
                dan menyetujui seluruh syarat dan ketentuan ini. Jika Anda tidak
                setuju, mohon tidak menggunakan layanan ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. Penggunaan Layanan</h2>
              <p>Anda setuju untuk menggunakan layanan ini secara wajar dan tidak:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Menyalahgunakan, membongkar, atau meretas sistem layanan.</li>
                <li>Mengunggah konten ilegal atau melanggar hukum.</li>
                <li>Menyalahgunakan akun orang lain.</li>
                <li>Menggunakan hasil layanan untuk tujuan yang melanggar peraturan yang berlaku.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Akun dan Login</h2>
              <p>
                Untuk mengakses fitur penyimpanan, Anda perlu masuk menggunakan akun
                Google. Anda bertanggung jawab menjaga kerahasiaan akun Anda. Data
                yang disimpan akan terhubung dengan akun Anda dan tidak dapat diakses
                pengguna lain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Akurasi Hasil</h2>
              <p>
                Rangkuman yang dihasilkan oleh AI bersifat otomatis dan mungkin tidak
                selalu akurat atau lengkap. Hasil tersebut disediakan sebagai bantuan,
                dan Anda tetap bertanggung jawab untuk memverifikasi informasi penting.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Hak Kekayaan Intelektual</h2>
              <p>
                Seluruh tampilan, desain, logo, dan perangkat lunak layanan ini adalah
                milik pengembang. Anda tidak boleh menyalin atau menggunakan kembali
                tanpa izin. Konten yang Anda unggah tetap menjadi milik Anda.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Batasan Tanggung Jawab</h2>
              <p>
                Layanan disediakan &quot;sebagaimana adanya&quot; tanpa jaminan tertentu.
                Pengembang tidak bertanggung jawab atas kerugian yang timbul dari
                penggunaan atau ketidakmampuan menggunakan layanan ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">7. Perubahan Layanan</h2>
              <p>
                Kami berhak mengubah, menangguhkan, atau menghentikan sebagian atau
                seluruh layanan sewaktu-waktu tanpa pemberitahuan, termasuk menambah
                atau menghapus fitur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">8. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini,
                silakan hubungi kami di:{' '}
                <a href="mailto:yuwiaffa@gmail.com" className="text-blue-600 dark:text-blue-400 underline">
                  yuwiaffa@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
