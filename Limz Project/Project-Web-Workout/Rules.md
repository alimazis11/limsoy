Panduan Gaya Penulisan (Panduan Gaya)

Backend (Laravel):

Ikuti standar PSR-12 untuk penulisan PHP.

Gunakan konvensi Laravel: Nama Model Singular PascalCase ( WorkoutPlan), Nama Tabel Plural Snake_case ( workout_plans), Nama Controller yang diakhiri dengan kata Controller ( WorkoutPlanController).

Jangan melakukan query database langsung pada rute . Selalu gunakan Pengontrol .

Frontend (React):

Nama komponen yang digunakan PascalCase(contoh: WorkoutCard.jsx).

Gunakan Komponen Fungsional dan Kait , hindari penulisan Komponen Kelas .

API Komunikasi (CORS & Axios)

Karena frontend dan backend berjalan di port lokal yang berbeda (misal Vite di localhost:5173dan Laravel di localhost:8000), Laravel harus dikonfigurasi pada file config/cors.phpuntuk mengizinkan permintaan dari port Vite.

Gunakan Axios di React dengan konfigurasi Base URL yang mengarah ke http://localhost:8000/api.

Batasan Lingkungan Pengembangan (Lingkungan Pengembang Lokal)

Kesesuaian Versi: Vite membutuhkan lingkungan Node.js versi terbaru (umumnya versi 14.18+, atau 18+ untuk fitur optimal). Pada sistem operasi versi terdahulu, pastikan instalasi Node.js mencapai versi minimum yang diminta Vite agar tidak terjadi kesalahan saat perintah npm run devdijalankan.

XAMPP: Pastikan versi PHP pada XAMPP memenuhi syarat minimum versi Laravel yang Anda instal (contoh: Laravel 10 membutuhkan minimal PHP 8.1). Selalu jalankan modul Apache dan MySQL saat melakukan pengembangan.