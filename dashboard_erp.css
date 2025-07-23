/* dashboard_erp.css */

/* --- RESET BROWSER DEFAULTS DAN PENGATURAN GLOBAL --- */
*, *::before, *::after {
  box-sizing: border-box; /* Sangat penting untuk layout responsif */
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* Mencegah scroll horizontal pada seluruh halaman */
  overflow-x: hidden; /* Pastikan ini ada dan efektif! */
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #D9D9D9; /* Warna latar belakang halaman */
}



.header-left .company-logo {
  height: 100px;
  width: auto;
}


/* Tambahkan ini untuk mengontrol scroll body saat mobile sidebar aktif */
body.no-scroll {
  overflow: hidden; /* Ini akan menimpa overflow-x: hidden juga, yang diinginkan */
}


/* --- HEADER UTAMA --- */
.main-header {
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  height: 60px;
  /* Pastikan header tidak menyebabkan scroll horizontal karena kontennya */
  
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.company-logo {
  height: 40px; /* Sesuaikan tinggi logo */
  width: auto;
}

.header-right {
  display: flex;
  align-items: center;
}

/* --- TOMBOL MENU HAMBURGER (Mobile Only) --- */
.mobile-menu-toggle {
  display: none; /* Sembunyikan secara default di desktop */
  background: none;
  border: none;
  font-size: 1.8em;
  cursor: pointer;
  color: #01386A;
  padding: 5px 10px;
}

/* --- DROPDOWN PROFIL (di header) --- */
/* Dalam dashboard_erp.css */

/* Dalam dashboard_erp.css */

/* Dalam dashboard_erp.css */

.user-profile-area {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative; /* Ini tetap harus ada untuk containment */
}

.profile-dropdown-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
}

#ic {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.dropdown-logo {
  display: none;
  /* Hapus atau komentari baris di bawah ini */
  /* position: absolute; */
  /* top: 60px; */
  /* right: 0; */

  background-color: #fff;
  border-radius: 8px;
  min-width: 180px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 999; /* Pastikan ini cukup tinggi */
}

.dropdown-logo.show {
  display: block;
}

/* Tambahkan transisi jika Anda ingin efek halus */
.dropdown-logo {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none; /* Mencegah interaksi saat disembunyikan */
  transform: translateY(-10px); /* Efek meluncur dari atas */
}

.dropdown-logo.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}


/* ... sisa CSS tidak berubah ... */


.dropdown-logo li a {
  color: #333;
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  white-space: nowrap; /* Pastikan teks tidak melompat baris */
  font-size: 0.95em;
  overflow: hidden; /* Sembunyikan overflow */
  text-overflow: ellipsis; /* Tambahkan elipsis jika teks terlalu panjang */
}

.dropdown-logo li a:hover {
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 0 8px;
}

/* --- LAYOUT UTAMA (Sidebar Navigasi dan Konten Dashboard) --- */
.main-layout-container {
  display: flex;
  height: calc(100vh - 60px); /* Tinggi viewport dikurangi tinggi header */
  margin-top: 60px; /* Dorong konten ke bawah header */
  width: 100%;
  overflow: hidden; /* Menambah overflow hidden untuk container utama, scroll akan di elemen dalamnya */
}

/* --- SIDEBAR NAVIGASI UTAMA --- */
.sidebar-nav {
  width: 250px; /* Lebar default di desktop */
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  height: 100%; /* Mengisi tinggi penuh .main-layout-container */
  flex-shrink: 0;
  overflow-y: auto; /* Izinkan scroll vertikal di desktop juga */
  overflow-x: hidden; /* Pastikan tidak ada scroll horizontal di sidebar */

  transition: transform 0.3s ease-in-out; /* Untuk animasi slide-in/out mobile */
  z-index: 150;
  padding-top: 10px; /* Padding dari atas */
  position: relative; /* Penting untuk z-index dropdown yang fixed */
}

/* Hilangkan scrollbar default */
.sidebar-nav::-webkit-scrollbar {
  width: 0; /* Untuk Chrome, Safari, Opera */
  height: 0;
}
.sidebar-nav {
  scrollbar-width: none; /* Untuk Firefox */
}


.isi-container {
  list-style: none;
  padding: 0 15px; /* Padding horizontal di dalam sidebar */
  margin: 0;
  width: 100%;
}

/* --- ITEM MENU UTAMA (Dashboard, Perusahaan, Finance, dll.) --- */
.isi-container > li {
  display: flex;
  align-items: center;
  position: relative; /* PENTING: Untuk positioning absolute dropdown */
  cursor: pointer;
  margin-bottom: 10px;
  padding: 8px 0;
  transition: background-color 0.2s ease-in-out;
  border-radius: 6px;
}

/* Tambahkan padding di sisi kiri untuk ikon */
.isi-container > li > a {
  padding-left: 10px;
}

.isi-container > li:hover {
  background-color: #e8f0fe;
}

/* Kelas aktif untuk item menu parent dropdown */
.isi-container > li.active-dropdown {
  background-color: #e8f0fe;
}

.dashboard {
  margin-top: 0;
}

.isi-container > li img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  object-fit: contain;
}

.isi-container > li a {
  text-decoration: none;
  color: #01386A;
  font-weight: bold;
  flex-grow: 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

/* Gaya untuk ikon panah dropdown */
.isi-container > li a .arrow-icon {
  font-size: 0.8em;
  margin-left: 10px;
  transition: transform 0.2s ease-in-out;
}

.isi-container > li.active-dropdown > a .arrow-icon {
  transform: rotate(90deg);
}


/* --- DROPDOWN UTAMA SIDEBAR (level 1) --- */
.dropdown {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s ease-in-out;
  pointer-events: none;

  background-color: #fff;
  border-radius: 8px;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 10;

  position: fixed; /* DEFAULT DI DESKTOP */
  top: -9999px; /* Default hide */
  left: -9999px; /* Default hide */
  overflow-x: hidden; /* Tetap hidden di desktop */
}

/* --- NESTED DROPDOWN SIDEBAR (level 2) --- */
.dropdown-nested {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s ease-in-out;
  pointer-events: none;

  background-color: #fff;
  border-radius: 8px;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 11;

  position: fixed; /* DEFAULT DI DESKTOP */
  top: -9999px; /* Default hide */
  left: -9999px; /* Default hide */
  overflow-x: hidden; /* Tetap hidden di desktop */
}

/* Saat dropdown aktif */
.dropdown.show,
.dropdown-nested.show {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
  pointer-events: auto;
  /* Posisi `left` dan `top` akan diatur oleh JS di desktop */
}

.dropdown li,
.dropdown-nested li {
  padding: 0;
  position: relative;
}

.dropdown li a,
.dropdown-nested li a {
  color: #333;
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  white-space: nowrap; /* Teks tetap dalam satu baris */
  font-size: 0.95em;
  /* TIDAK ADA overflow: hidden dan text-overflow: ellipsis di sini secara default */
}

.dropdown li a:hover {
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 0 8px;
}
.dropdown-nested li a:hover {
  background-color: #e0e0e0; /* Sedikit beda warna hover untuk nested */
  border-radius: 4px;
  margin: 0 8px;
}





/* --- INPUT GROUP (Specific styling to revert to original) --- */
.input-group {
  background-color: #fff;
  position: fixed; /* Reverted to fixed position */
  left: 250px; /* Original fixed left position, aligns with sidebar */
  width: 961px; /* Original fixed width */
  padding: 20px;
  height: 500px; /* Original fixed height */
  margin-left: 20px; /* Original fixed margin-left */
  margin-top: 30px; /* Original fixed margin-top */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow-y: auto; /* Izinkan scroll vertikal di area konten ini */
  -webkit-overflow-scrolling: touch;
  max-width: calc(100% - 290px); /* 100% - sidebar width - margin-left - margin-right */

  /* Removed display:flex and flex-direction for this container to allow original static flow */
}

.input-group label {
  margin-bottom: 5px;
}

.input-group input {
  width: 200px; /* Original fixed width */
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #EAEAEA;
  /* Reverted individual input margins */
}

.input-group select {
  width: 200px; /* Original fixed width */
  height: 40px;
  padding: 0; /* Adjust padding for select if needed */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #EAEAEA;
  margin-bottom: 20px; /* Original margin-bottom for select */
}

/* Reverted individual input specific margins */
#id_karyawan {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 115px;
}
#nama_karyawan {
  margin-left: 100px;
  margin-bottom: 20px;
}
#jabatan_karyawan {
  margin-left: 85px;
  margin-bottom: 20px;
}
#email_karyawan {
  margin-left: 105px;
  margin-bottom: 20px;
}
#rekening_karyawan {
  margin-left: 70px;
  margin-bottom: 20px;
}
#tgl_masuk_karyawan {
  margin-left: 115px;
  margin-bottom: 20px;
}
#npwp_karyawan {
  margin-left: 100px;
  margin-bottom: 20px;
}
#departement {
  margin-left: 60px;
  margin-bottom: 20px;
}

.simpan {
  background-color: #01386A;
  color: #fff;
  margin-left: 0px; /* Original fixed margin-left */
  width: 80px; /* Original fixed width */
  height: 30px; /* Original fixed height */
   /* Reverted to fixed position */
  margin-top: 20px; /* Original fixed margin-top */
  border-radius: 10px;
  cursor: pointer;
}
.batal {
  background-color: #6a0101;
  color: #fff;
  margin-left: 100px; /* Original fixed margin-left */
  width: 80px; /* Original fixed width */
  height: 30px; /* Original fixed height */
   /* Reverted to fixed position */
  margin-top: 20px; /* Original fixed margin-top */
  border-radius: 10px;
  cursor: pointer;
}


#formData {
  display: grid;
  /* Ini mendefinisikan kolom:
     Kolom pertama (untuk label): Lebar tetap 120px (sesuaikan jika perlu)
     Kolom kedua (untuk input/select): Mengisi sisa ruang yang tersedia (1fr) */
  grid-template-columns: 120px 1fr;
  gap: 15px 10px; /* Jarak vertikal antar baris (15px) dan horizontal antar kolom (10px) */
  max-width: 500px; /* Batasi lebar maksimum form agar tidak terlalu lebar */
  }

#formData label {
  text-align: right; /* Rata kanan teks label agar sejajar dengan input */
  padding-right: 15px; /* Jarak antara teks label dan input */
  line-height: 2; /* Menyelaraskan teks label secara vertikal dengan input */
  align-self: center; /* Pusatkan label secara vertikal di dalam sel grid */
  font-weight: 500; /* Sedikit lebih tebal untuk label */
  color: #333;
}

#formData input,
#formData select {
  width: 100%; /* Pastikan input dan select mengisi seluruh lebar kolom yang tersedia */
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box; /* Penting: padding dan border tidak menambah lebar elemen */
  font-size: 1rem;
  color: #555;
  /* Hapus default styling untuk panah di select jika tidak diinginkan */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #f8f8f8; /* Warna latar belakang input/select */
}

/* Untuk icon kalender pada input date dan icon jam pada input time */
#formData input[type="date"],
#formData input[type="time"] {
  position: relative;
  padding-right: 40px; /* Tambahkan padding agar icon tidak tumpang tindih dengan teks */
}

/* Opsional: Styling fokus */
#formData input:focus,
#formData select:focus {
  border-color: #007bff; /* Warna border saat fokus */
  outline: none; /* Hapus outline bawaan browser */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); /* Efek bayangan saat fokus */
}

/* Styling untuk select agar mirip input */
#ekspedisi {
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.6%20146.2%20208.4%205.4%2069.6z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 30px; /* Sesuaikan padding agar tidak menutupi panah kustom */
}

/* Styling untuk <br> agar tidak mengganggu layout Grid */
#formData br {
  display: none; /* Sembunyikan tag <br> karena Grid sudah mengatur baris baru */
}

/* --- MEDIA QUERIES UNTUK RESPONSIBILITAS (Adjustments for input-group) --- */

/* Untuk layar yang lebih kecil dari 768px (umumnya tablet dalam potret dan ponsel) */
@media (max-width: 768px) {
  .main-header {
      padding: 10px;
      justify-content: space-between;
  }

  .header-left {
      justify-content: flex-start;
  }

  .mobile-menu-toggle {
      display: block;
  }

  .user-profile-area {
      margin-left: auto;
  }

  .main-layout-container {
      flex-direction: column;
      height: auto;
      margin-top: 60px;
  }

  .sidebar-nav {
      position: fixed;
      top: 60px;
      left: 0;
      width: 250px;
      height: calc(100vh - 60px);
      transform: translateX(-100%);
      box-shadow: 3px 0 8px rgba(0,0,0,0.2);
      z-index: 180;
  }

  .sidebar-nav.active {
      transform: translateX(0);
  }

  .isi-container > li {
      padding: 12px 15px;
  }

  .dropdown,
  .dropdown-nested {
      position: static;
      visibility: visible;
      opacity: 1;
      box-shadow: none;
      border-radius: 0;
      background-color: #f8f8f8;
      width: 100%;
      min-width: unset;
      padding-left: 20px;
      transition: none;
      pointer-events: auto;
      display: none;
  }

  .dropdown.show,
  .dropdown-nested.show {
      display: block;
  }

  .dropdown li a,
  .dropdown-nested li a {
      padding: 10px 10px;
      font-size: 0.9em;
  }

  /* --- Reverting .input-group behavior for smaller screens as per request --- */
  /*
    Warning: Keeping fixed positioning and explicit widths/heights
    on smaller screens will likely cause horizontal scrolling issues
    or elements to go off-screen. This is generally not recommended
    for a responsive design.
  */
  .pu {
      /* You will likely need to adjust this for mobile */
      margin-left: 20px; /* Example adjustment */
      margin-top: 80px; /* Example adjustment */
      position: relative; /* Changing to relative on mobile is usually better */
      width: calc(100% - 40px); /* Adjust width to fit */
      text-align: center; /* Center text */
  }

  .input-group {
      position: relative; /* Change to relative for mobile layout */
      left: 0; /* Remove fixed left */
      width: calc(100% - 40px); /* Adjust width to fill container minus margins */
      margin: 20px; /* Adjust margin */
      height: auto; /* Allow height to adjust based on content */
      display: block; /* Revert to block layout if not using flex */
      max-width: none; /* No max-width on mobile */
      box-sizing: border-box; /* Crucial for width calculations */
  }

  .input-group form {
      width: 100%;
  }

  .input-group label,
  .input-group input,
  .input-group select {
      width: 100%; /* Make inputs and selects full width on mobile */
      margin-left: 0; /* Remove fixed left margins */
      margin-right: 0;
      margin-bottom: 15px; /* Add some spacing */
      max-width: none; /* Remove max-width on mobile */
      display: block; /* Ensure they take full line */
  }

  /* Adjust specific input margins for mobile if still needed */
  #nomor_anggota,
  #nama_anggota,
  #jenis_jabatan {
      margin-left: 0; /* Ensure these are also reset */
  }

  .simpan,
  .batal {
      position: static; /* Change to static for mobile */
      width: 100%; /* Make buttons full width */
      margin-left: 0; /* Remove fixed margin */
      margin-top: 10px; /* Adjust top margin for spacing */
      display: block; /* Make them stack */
  }
  .simpan + .batal { /* If you want space between stacked buttons */
      margin-top: 10px;
  }
}

/* Untuk layar yang lebih kecil dari 480px (umumnya ponsel) */
@media (max-width: 480px) {
  .main-header {
      padding: 8px 15px;
      height: 50px;
  }

  .company-logo {
      height: 35px;
  }

  #ic {
      width: 40px;
      height: 40px;
  }

  .mobile-menu-toggle {
      font-size: 1.6em;
  }

  .main-layout-container {
      margin-top: 50px;
  }

  .sidebar-nav {
      width: 200px;
      height: calc(100vh - 50px);
  }

  .isi-container > li {
      font-size: 0.9em;
      padding: 10px 10px;
  }

  .isi-container > li img {
      width: 25px;
      height: 25px;
  }

  .pu {
      font-size: 18px;
      margin: 15px; /* More consistent margins */
  }

  .input-group {
      margin: 15px; /* More consistent margins */
      padding: 10px; /* Smaller padding */
  }

  .input-group input,
  .input-group select {
      height: 28px;
      padding: 8px;
  }

  .simpan,
  .batal {
      height: 32px;
  }
}
