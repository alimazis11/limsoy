Tumpukan Teknologi

Frontend: React.js dengan build tool Vite.

Alasan: Waktu build dan Hot Module Replacement (HMR) Jauh lebih cepat dibandingkan Create React App (CRA).

Backend: Laravel (PHP).

Alasan: Laravel menyediakan struktur MVC yang rapi, routing API bawaan, dan fitur autentikasi API ( Laravel Sanctum ) yang siap pakai tanpa perlu konfigurasi JWT manual yang rumit.

Database: MySQL (dijalankan secara lokal melalui XAMPP).

Alasan: MySQL sangat kompatibel dengan Laravel Eloquent ORM, dan XAMPP memberikan kemudahan manajemen database lokal melalui phpMyAdmin.

Struktur Folder (Split Repository) 
Disarankan untuk memisahkan folder agar frontend dan backend berjalan di port masing-masing secara independen.

Teks biasa
/fitjourney
  /frontend          # Proyek React (Vite) berjalan di port 5173
    /src
      /components    # UI Reusable (Button, Card, Form)
      /pages         # Halaman utama (Dashboard, WorkoutView)
      /services      # Konfigurasi Axios untuk memanggil API Laravel
      /store         # State management lokal (Zustand/Context)
  /backend           # Proyek Laravel berjalan di port 8000 (php artisan serve)
    /app
      /Http
        /Controllers # Logika API (Auth, WorkoutPlan, dll)
        /Resources   # Transformasi respon API menjadi JSON standar
      /Models        # Model Eloquent (User, Exercise, WorkoutLog)
    /routes
      api.php        # Seluruh endpoint API didefinisikan di sini
    /database
      /migrations    # File skema tabel database