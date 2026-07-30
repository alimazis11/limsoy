Sistem Desain & Alur UX
Pendekatan desain menggunakan metode Atomic Design untuk menjaga konsistensi.

Alur Pengguna (Alur Pengguna) Utama:

Landing Page -> Autentikasi.

Dashboard (Menampilkan rencana latihan hari ini).

Tampilan Latihan Aktif (UI khusus yang besar, mudah diketuk dengan jari berkeringat).

Ringkasan Pasca Latihan (Ringkasan beban diangkat dan rekor baru).

Keputusan Desain Teknis (Komponen)
Mobile-First: Seluruh komponen dikembangkan untuk ukuran layar 320px - 428px terlebih dahulu, kemudian di- scale up ke desktop .

State Management: Gunakan React Context atau Zustand untuk state lokal (seperti pengatur waktu istirahat yang berjalan di latar belakang aplikasi). Hindari Redux karena terlalu berlebihan ( overkill ) untuk MVP.

Interaksi UI:

Geser untuk menghapus pada daftar set latihan.

Target tap besar : Tombol "Selesai" atau "Tambah Set" minimal berukuran 44x44 piksel untuk menghindari salah tekan.