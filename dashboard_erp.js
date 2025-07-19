document.addEventListener('DOMContentLoaded', function() {
    // =====================================
    // BAGIAN 1: Fungsionalitas Dropdown Navigasi
    // Meliputi: Mobile menu toggle, dropdown sidebar utama, dropdown sidebar bersarang, dan dropdown profil.
    // =====================================

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
        });

        document.querySelectorAll('.isi-container > li.active-dropdown').forEach(item => {
            item.classList.remove('active-dropdown');
        });
        document.querySelectorAll('.dropdown li.active-nested').forEach(item => {
            item.classList.remove('active'); // Perbaikan: gunakan 'active-nested'
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

    // =====================================
    // BAGIAN 2: Fungsionalitas Manajemen Data Organisasi
    // Meliputi: Render tabel anggota, update, dan delete data anggota.
    // =====================================

    const organisasiTableBody = document.getElementById('organisasiTableBody');

    // Fungsi untuk me-render ulang tabel anggota
    function renderAnggotaTable() {
        let daftarAnggota = JSON.parse(localStorage.getItem('daftarAnggota')) || [];

        if (!organisasiTableBody) {
            console.error("Elemen <tbody> tabel tidak ditemukan! Pastikan id='organisasiTableBody' ada di HTML Anda.");
            return;
        }

        organisasiTableBody.innerHTML = ''; // Kosongkan tbody sebelum mengisi data

        if (daftarAnggota.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" style="text-align: center;">Belum ada data anggota.</td>`;
            organisasiTableBody.appendChild(row);
        } else {
            daftarAnggota.forEach(anggota => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${anggota.nomor_anggota}</td>
                    <td>${anggota.nama_anggota}</td>
                    <td>${anggota.jenis_jabatan}</td>
                    <td>
                        <button class="update-button" data-id="${anggota.id}">Update</button>
                        <button class="delete-button" data-id="${anggota.id}">Hapus</button>
                    </td>
                `;
                organisasiTableBody.appendChild(row);
            });
        }
    }

    // Panggil fungsi renderAnggotaTable saat DOMContentLoaded
    renderAnggotaTable();

    // --- Event Listener untuk Tombol Update dan Delete ---
    organisasiTableBody.addEventListener('click', function(event) {
        const target = event.target;
        const anggotaId = target.getAttribute('data-id'); // Mengambil ID unik yang kita simpan

        if (target.classList.contains('update-button')) {
            if (anggotaId) {
                // Simpan ID anggota yang akan diupdate ke localStorage
                localStorage.setItem('editAnggotaId', anggotaId);
                // Lalu mengalihkan ke form input organisasi2.html untuk diedit
                window.location.href = 'organisasi2.html';
            } else {
                console.error("ID Anggota tidak ditemukan untuk update.");
            }
        } else if (target.classList.contains('delete-button')) {
            if (anggotaId) {
                handleDeleteAnggota(anggotaId);
            } else {
                console.error("ID Anggota tidak ditemukan untuk delete.");
            }
        }
    });

    // --- Fungsi Handler untuk Delete Anggota ---
    function handleDeleteAnggota(id) {
        if (confirm(`Apakah Anda yakin ingin menghapus anggota ini?`)) {
            let daftarAnggota = JSON.parse(localStorage.getItem('daftarAnggota')) || [];

            // Filter array, sisakan hanya yang ID-nya TIDAK sama dengan ID yang akan dihapus
            const updatedDaftarAnggota = daftarAnggota.filter(anggota => anggota.id !== parseInt(id));

            if (updatedDaftarAnggota.length < daftarAnggota.length) {
                localStorage.setItem('daftarAnggota', JSON.stringify(updatedDaftarAnggota));
                alert(`Data anggota berhasil dihapus.`);
                renderAnggotaTable(); // Render ulang tabel untuk menampilkan perubahan
            } else {
                alert(`Data anggota tidak ditemukan.`);
            }
        }
    }
});
