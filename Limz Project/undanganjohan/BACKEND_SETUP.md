# Wedding Invitation Website - XAMPP MySQL Setup

## Prerequisites
- Node.js dan npm sudah terinstall
- XAMPP sudah terinstall dengan MySQL/MariaDB

## Setup Backend dengan XAMPP

### 1. Start XAMPP
- Buka XAMPP Control Panel
- Klik tombol "Start" untuk Apache dan MySQL

### 2. Create Database
- Buka browser: `http://localhost/phpmyadmin`
- Login (default: user=root, password=kosong)
- Klik "New" untuk membuat database baru
- Nama database: `wedding`
- Charset: `utf8mb4_general_ci`
- Klik "Create"

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Variables
File `.env` sudah siap dengan konfigurasi default:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=wedding
PORT=5000
NODE_ENV=development
```

Jika XAMPP MySQL menggunakan password, ubah:
```
DB_PASSWORD=your_password
```

### 5. Jalankan Server dan Frontend

**Cara 1: Bersamaan (recommended)**
```bash
npm run dev:all
```

**Cara 2: Terpisah**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

### 6. Testing
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/wishes`
- Database: `http://localhost/phpmyadmin`

Coba kirim comment dari website, seharusnya muncul di database.

## Verifikasi Database

Di phpMyAdmin:
1. Pilih database `wedding`
2. Lihat tabel `wishes`
3. Semua comment yang dikirim akan tersimpan di sini

## API Endpoints

### Get All Wishes
```
GET http://localhost:5000/api/wishes
```

### Get Attendance Stats
```
GET http://localhost:5000/api/wishes/stats
```

### Post New Wish
```
POST http://localhost:5000/api/wishes
Content-Type: application/json

{
  "name": "John Doe",
  "wish": "Selamat menjalani hidup baru",
  "status": "hadir",
  "date": "27/7/2026"
}
```

## Troubleshooting

### Error: "connect ECONNREFUSED"
- Pastikan MySQL di XAMPP sudah running
- Cek port MySQL di XAMPP (default: 3306)

### Error: "Unknown database"
- Buat database `wedding` di phpMyAdmin

### Error: "Access denied for user 'root'"
- Update DB_PASSWORD di `.env` jika MySQL menggunakan password

## Features
✓ Comment system dengan MySQL database
✓ Real-time attendance counter
✓ XAMPP MySQL untuk persistent storage
✓ CORS enabled
✓ Responsive design
✓ Fallback ke localStorage jika backend down
