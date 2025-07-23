document.addEventListener('DOMContentLoaded', function() {
    // --- Script Pertama (Form Data Karyawan) ---
    const form = document.getElementById('datakaryawan');
    const linkSimpan = document.getElementById('linkSimpan');
    const idKaryawanInput = document.getElementById('id_karyawan');
    const namaKaryawanInput = document.getElementById('nama_karyawan');
    const jabatanKaryawanSelect = document.getElementById('jabatan_karyawan');
    const emailKaryawanInput = document.getElementById('email_karyawan');
    const rekeningKaryawanInput = document.getElementById('rekening_karyawan');
    const tglMasukKaryawanInput = document.getElementById('tgl_masuk_karyawan');
    const npwpKaryawanInput = document.getElementById('npwp_karyawan');
    const departementSelect = document.getElementById('departement');
    const linkBatal = document.getElementById('linkBatal');

    // Pastikan elemen-elemen form ada sebelum menambahkan event listener
    if (linkSimpan && idKaryawanInput && namaKaryawanInput && jabatanKaryawanSelect &&
        emailKaryawanInput && rekeningKaryawanInput && tglMasukKaryawanInput &&
        npwpKaryawanInput && departementSelect) {

        linkSimpan.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah link melakukan navigasi default

            const idKaryawan = idKaryawanInput.value;
            const namaKaryawan = namaKaryawanInput.value;
            const jabatanKaryawan = jabatanKaryawanSelect.value;
            const emailKaryawan = emailKaryawanInput.value;
            const rekeningKaryawan = rekeningKaryawanInput.value;
            const tglMasukKaryawan = tglMasukKaryawanInput.value;
            const npwpKaryawan = npwpKaryawanInput.value;
            const departement = departementSelect.value;

            // Ambil data karyawan yang sudah ada dari Local Storage
            let dataKaryawan = localStorage.getItem('dataKaryawan');
            dataKaryawan = dataKaryawan ? JSON.parse(dataKaryawan) : [];

            // Cek apakah ID karyawan sudah ada
            const isIdKaryawanExist = dataKaryawan.some(karyawan => karyawan.idKaryawan === idKaryawan);

            if (isIdKaryawanExist) {
                alert('ID Karyawan ini sudah ada. Silakan masukkan ID Karyawan yang berbeda.');
                idKaryawanInput.value = ''; // Kosongkan input ID karyawan
                idKaryawanInput.focus(); // Fokus kembali ke input ID karyawan
                return; // Hentikan proses penyimpanan
            }

            // Simpan data ke Local Storage jika ID karyawan belum ada
            const karyawanBaru = {
                idKaryawan: idKaryawan,
                namaKaryawan: namaKaryawan,
                jabatanKaryawan: jabatanKaryawan,
                emailKaryawan: emailKaryawan,
                rekeningKaryawan: rekeningKaryawan,
                tglMasukKaryawan: tglMasukKaryawan,
                npwpKaryawan: npwpKaryawan,
                departement: departement
            };

            dataKaryawan.push(karyawanBaru);
            localStorage.setItem('dataKaryawan', JSON.stringify(dataKaryawan));

            // Redirect ke halaman data_karyawan.html
            window.location.href = 'data_karyawan.html';
        });
    }

    if (linkBatal) {
        linkBatal.addEventListener('click', function(event) {
            window.location.href = 'data_karyawan.html'; // Kembali ke halaman data_karyawan.html tanpa menyimpan
        });
    }


    // --- Script Kedua (Sidebar & Dropdown Menu) ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const profileDropdownMenu = document.querySelector('.dropdown-logo');
    const profileDropdownTrigger = document.querySelector('.profile-dropdown-trigger');
    const menuItemsWithDropdown = document.querySelectorAll('.isi-container > li.perusahaan, .isi-container > li.finance, .isi-container > li.sales, .isi-container > li.procurement, .isi-container > li.warehouse, .isi-container > li.production, .isi-container > li.human');
    const hasNestedItems = document.querySelectorAll('.dropdown li.has-nested');

    // --- Helper Functions ---
    const isDesktop = () => window.innerWidth > 992;

    function closeAllSidebarDropdowns() {
        document.querySelectorAll('.sidebar-nav .dropdown.show, .sidebar-nav .dropdown-nested.show').forEach(dropdown => {
            dropdown.classList.remove('show');
            dropdown.style.left = '';
            dropdown.style.top = '';
            dropdown.style.height = '';
            dropdown.style.position = ''; // Reset position
        });

        document.querySelectorAll('.isi-container > li.active-dropdown').forEach(item => {
            item.classList.remove('active-dropdown');
        });
        document.querySelectorAll('.dropdown li.active-nested').forEach(item => {
            item.classList.remove('active-nested'); // Perbaikan: gunakan 'active-nested'
        });

        document.body.classList.remove('no-scroll');
    }

    // Fungsi yang diperbarui untuk menghitung posisi dropdown (termasuk dropdown profil)
    function setDropdownPosition(dropdownElement, triggerElement, isNested = false, isProfileDropdown = false) {
        if (!dropdownElement || !triggerElement) return;

        if (isDesktop()) {
            const triggerRect = triggerElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const dropdownHeight = dropdownElement.offsetHeight;
            const dropdownWidth = dropdownElement.offsetWidth;
            const headerHeight = 60; // Asumsi tinggi header, sesuaikan jika berbeda

            let topPosition;
            let leftPosition;

            if (isProfileDropdown) {
                // Untuk dropdown profil, posisikan relatif terhadap trigger (gambar profil)
                // Usahakan muncul di bawah trigger
                topPosition = triggerRect.bottom + 10; // 10px di bawah trigger
                leftPosition = triggerRect.right - dropdownWidth; // Sejajarkan kanan dropdown dengan kanan trigger

                // Penyesuaian jika dropdown terpotong di bagian bawah viewport
                if (topPosition + dropdownHeight > viewportHeight - 10) { // 10px margin dari bawah
                    // Coba posisikan di atas trigger jika tidak muat di bawah
                    topPosition = triggerRect.top - dropdownHeight - 10;
                    // Jika masih tidak muat atau melewati atas layar, posisikan di paling atas viewport
                    if (topPosition < 10) { // 10px margin dari atas
                        topPosition = 10;
                    }
                }

                // Penyesuaian jika dropdown keluar dari viewport kiri
                if (leftPosition < 10) { // 10px margin dari kiri
                    leftPosition = 10;
                }
                   // Penyesuaian jika dropdown keluar dari viewport kanan
                if (leftPosition + dropdownWidth > viewportWidth - 10) {
                    leftPosition = viewportWidth - dropdownWidth - 10;
                }

            } else if (isNested) { // Nested sidebar dropdowns
                topPosition = triggerRect.top;
                leftPosition = triggerRect.right + 10;

                // Penyesuaian agar dropdown tidak keluar dari viewport bawah
                if (topPosition + dropdownHeight > viewportHeight - 10) {
                    topPosition = viewportHeight - dropdownHeight - 10;
                }
                // Penyesuaian agar dropdown tidak keluar dari viewport atas
                if (topPosition < headerHeight) {
                    topPosition = headerHeight;
                }
                // Penyesuaian agar nested dropdown tidak keluar dari viewport kanan
                if (leftPosition + dropdownWidth > viewportWidth - 10) {
                    leftPosition = triggerRect.left - dropdownWidth - 10;
                }

            } else { // Main sidebar dropdowns
                const sidebarRect = sidebarNav.getBoundingClientRect();
                topPosition = triggerRect.top;
                leftPosition = sidebarRect.right + 10;

                // Penyesuaian agar dropdown tidak keluar dari viewport bawah
                if (topPosition + dropdownHeight > viewportHeight - 10) {
                    topPosition = viewportHeight - dropdownHeight - 10;
                }
                // Penyesuaian agar dropdown tidak keluar dari viewport atas
                if (topPosition < headerHeight) {
                    topPosition = headerHeight;
                }
            }

            dropdownElement.style.position = 'fixed'; // Pastikan position fixed untuk viewport
            dropdownElement.style.left = `${leftPosition}px`;
            dropdownElement.style.top = `${topPosition}px`;
            dropdownElement.style.height = ''; // Hapus height eksplisit untuk desktop

        } else { // Mobile mode
            // Di mobile, biarkan CSS mengatur posisi relatif atau statis
            // agar dropdown mengikuti aliran dokumen dan bisa di-scroll jika isinya panjang
            dropdownElement.style.position = ''; // Hapus fixed/absolute
            dropdownElement.style.left = '';
            dropdownElement.style.top = '';
            // Kita hanya perlu mengatur height untuk transisi di mobile
            if (!dropdownElement.style.height || dropdownElement.style.height === '0px') {
                dropdownElement.style.height = `${dropdownElement.scrollHeight}px`;
            } else {
                dropdownElement.style.height = '0px';
            }
        }
    }

    // --- Event Listeners ---

    // 1. Mobile Menu Toggle
    if (mobileMenuToggle && sidebarNav) {
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            sidebarNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll', sidebarNav.classList.contains('active'));
            closeAllSidebarDropdowns();
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                profileDropdownMenu.classList.remove('show');
                profileDropdownMenu.style.left = ''; // Reset profil dropdown position
                profileDropdownMenu.style.top = '';  // Reset profil dropdown position
                profileDropdownMenu.style.position = ''; // Reset position
            }
        });

        document.addEventListener('click', function(event) {
            if (!isDesktop()) {
                const isClickInsideSidebar = sidebarNav.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);
                if (sidebarNav.classList.contains('active') && !isClickInsideSidebar && !isClickOnToggle) {
                    sidebarNav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    closeAllSidebarDropdowns();
                }
            }
        });

        window.addEventListener('resize', function() {
            closeAllSidebarDropdowns();

            if (isDesktop()) {
                if (sidebarNav.classList.contains('active')) {
                    sidebarNav.classList.remove('active');
                }
                document.body.classList.remove('no-scroll');
            } else {
                document.body.classList.toggle('no-scroll', sidebarNav.classList.contains('active'));
            }
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                profileDropdownMenu.classList.remove('show');
                profileDropdownMenu.style.left = '';
                profileDropdownMenu.style.top = '';
                profileDropdownMenu.style.position = '';
            }
        });
    }

    // 2. Profile Dropdown (Logic diubah untuk memanggil setDropdownPosition)
    if (profileDropdownTrigger && profileDropdownMenu) {
        profileDropdownTrigger.addEventListener('click', function(event) {
            event.stopPropagation();
            closeAllSidebarDropdowns(); // Tutup dropdown sidebar lainnya

            // Toggle class 'show'
            profileDropdownMenu.classList.toggle('show');

            // Jika dropdown ditampilkan, hitung dan atur posisinya
            if (profileDropdownMenu.classList.contains('show')) {
                // Gunakan setTimeout untuk memastikan elemen sudah dirender dan ukurannya benar
                setTimeout(() => {
                    setDropdownPosition(profileDropdownMenu, profileDropdownTrigger, false, true); // isProfileDropdown = true
                }, 0);
            } else {
                // Saat ditutup, reset posisi dan hapus position fixed
                profileDropdownMenu.style.left = '';
                profileDropdownMenu.style.top = '';
                profileDropdownMenu.style.position = ''; // Penting: hapus fixed saat ditutup
            }
        });

        document.addEventListener('click', function(event) {
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show') &&
                !profileDropdownMenu.contains(event.target) && !profileDropdownTrigger.contains(event.target)) {
                profileDropdownMenu.classList.remove('show');
                // Hapus style top/left/position saat menutup
                profileDropdownMenu.style.left = '';
                profileDropdownMenu.style.top = '';
                profileDropdownMenu.style.position = ''; // Penting: hapus fixed saat ditutup
            }
        });
    }

    // 3. Main Sidebar Dropdowns (Level 1)
    menuItemsWithDropdown.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');

        if (link && dropdown) {
            link.addEventListener('click', function(event) {
                if (link.getAttribute('href') === '#' || !link.getAttribute('href')) {
                    event.preventDefault();
                }
                event.stopPropagation();

                if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                    profileDropdownMenu.classList.remove('show');
                    profileDropdownMenu.style.left = ''; // Reset profil dropdown position
                    profileDropdownMenu.style.top = '';  // Reset profil dropdown position
                    profileDropdownMenu.style.position = ''; // Reset position
                }

                const isCurrentlyActive = item.classList.contains('active-dropdown');

                menuItemsWithDropdown.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active-dropdown');
                        const otherDropdown = otherItem.querySelector('.dropdown');
                        if (otherDropdown && otherDropdown.classList.contains('show')) {
                            otherDropdown.classList.remove('show');
                            otherDropdown.style.left = '';
                            otherDropdown.style.top = '';
                            otherDropdown.style.height = '';
                            otherDropdown.style.position = ''; // Reset position
                            otherDropdown.querySelectorAll('.dropdown-nested.show').forEach(nested => {
                                nested.classList.remove('show');
                                nested.style.left = '';
                                nested.style.top = '';
                                nested.style.height = '';
                                nested.style.position = ''; // Reset position
                            });
                            otherDropdown.querySelectorAll('li.active-nested').forEach(nestedLi => {
                                nestedLi.classList.remove('active-nested');
                            });
                        }
                    }
                });

                if (!isCurrentlyActive) {
                    item.classList.add('active-dropdown');
                    dropdown.classList.add('show');
                    if (!isDesktop()) {
                        dropdown.style.height = `${dropdown.scrollHeight}px`;
                    } else {
                        setTimeout(() => {
                            setDropdownPosition(dropdown, link, false);
                        }, 0);
                    }
                } else {
                    item.classList.remove('active-dropdown');
                    if (!isDesktop()) {
                        dropdown.style.height = '0px';
                        dropdown.addEventListener('transitionend', function handler() {
                            dropdown.classList.remove('show');
                            dropdown.removeEventListener('transitionend', handler);
                        }, { once: true });
                    } else {
                        dropdown.classList.remove('show');
                        dropdown.style.left = '';
                        dropdown.style.top = '';
                        dropdown.style.position = ''; // Reset position
                    }

                    dropdown.querySelectorAll('.dropdown-nested.show').forEach(nested => {
                        nested.classList.remove('show');
                        nested.style.left = '';
                        nested.style.top = '';
                        nested.style.height = '';
                        nested.style.position = ''; // Reset position
                    });
                    dropdown.querySelectorAll('li.active-nested').forEach(nestedLi => {
                        nestedLi.classList.remove('active-nested');
                    });
                }
            });
        }
    });

    // 4. Nested Dropdowns (Level 2)
    hasNestedItems.forEach(nestedItem => {
        const nestedLink = nestedItem.querySelector('a');
        const nestedDropdown = nestedItem.querySelector('.dropdown-nested');

        if (nestedLink && nestedDropdown) {
            nestedLink.addEventListener('click', function(event) {
                if (nestedLink.getAttribute('href') === '#' || !nestedLink.getAttribute('href')) {
                    event.preventDefault();
                }
                event.stopPropagation();

                const isCurrentlyActive = nestedItem.classList.contains('active-nested');

                const parentDropdown = nestedItem.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelectorAll('li.has-nested').forEach(otherNestedItem => {
                        if (otherNestedItem !== nestedItem && otherNestedItem.classList.contains('active-nested')) {
                            otherNestedItem.classList.remove('active-nested');
                            const otherNestedDropdown = otherNestedItem.querySelector('.dropdown-nested');
                            if (otherNestedDropdown) {
                                if (!isDesktop()) {
                                    otherNestedDropdown.style.height = '0px';
                                    otherNestedDropdown.addEventListener('transitionend', function handler() {
                                        otherNestedDropdown.classList.remove('show');
                                        otherNestedDropdown.removeEventListener('transitionend', handler);
                                    }, { once: true });
                                } else {
                                    otherNestedDropdown.classList.remove('show');
                                    otherNestedDropdown.style.left = '';
                                    otherNestedDropdown.style.top = '';
                                    otherNestedDropdown.style.position = ''; // Reset position
                                }
                            }
                        }
                    });
                }

                if (!isCurrentlyActive) {
                    nestedItem.classList.add('active-nested');
                    nestedDropdown.classList.add('show');
                    if (!isDesktop()) {
                        nestedDropdown.style.height = `${nestedDropdown.scrollHeight}px`;
                    } else {
                        setTimeout(() => {
                            setDropdownPosition(nestedDropdown, nestedLink, true);
                        }, 0);
                    }
                } else {
                    nestedItem.classList.remove('active-nested');
                    if (!isDesktop()) {
                        nestedDropdown.style.height = '0px';
                        nestedDropdown.addEventListener('transitionend', function handler() {
                            nestedDropdown.classList.remove('show');
                            nestedDropdown.removeEventListener('transitionend', handler);
                        }, { once: true });
                    } else {
                        nestedDropdown.classList.remove('show');
                        nestedDropdown.style.left = '';
                        nestedDropdown.style.top = '';
                        nestedDropdown.style.position = ''; // Reset position
                    }
                }
            });
        }
    });

    // Menutup semua dropdown sidebar dan profil saat klik di luar area sidebar dan dropdown
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebarNav.contains(event.target);
        const isClickInsideProfileDropdown = profileDropdownMenu && profileDropdownMenu.contains(event.target);
        const isClickOnProfileTrigger = profileDropdownTrigger && profileDropdownTrigger.contains(event.target);
        const isClickOnMobileToggle = mobileMenuToggle && mobileMenuToggle.contains(event.target);

        const allOpenDropdowns = document.querySelectorAll('.dropdown.show, .dropdown-nested.show');
        let isClickInsideAnySidebarDropdown = false;
        allOpenDropdowns.forEach(dropdown => {
            if (dropdown.contains(event.target)) {
                isClickInsideAnySidebarDropdown = true;
            }
        });

        if (!isClickInsideSidebar && !isClickInsideAnySidebarDropdown && !isClickInsideProfileDropdown && !isClickOnProfileTrigger && !isClickOnMobileToggle) {
            closeAllSidebarDropdowns();
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                profileDropdownMenu.classList.remove('show');
                profileDropdownMenu.style.left = ''; // Reset profil dropdown position
                profileDropdownMenu.style.top = '';  // Reset profil dropdown position
                profileDropdownMenu.style.position = ''; // Reset position
            }
        }
    });
});
