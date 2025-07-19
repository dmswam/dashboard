document.addEventListener('DOMContentLoaded', function() {
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
                profileDropdownMenu.style.top = '';   // Reset profil dropdown position
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
                    profileDropdownMenu.style.top = '';   // Reset profil dropdown position
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
                profileDropdownMenu.style.top = '';   // Reset profil dropdown position
                profileDropdownMenu.style.position = ''; // Reset position
            }
        }
    });
});

// Chart.js (Pastikan script ini ada di dashboard_erp.js Anda)
var salesCtx = document.getElementById('salesChart').getContext('2d');
var salesChart = new Chart(salesCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [{
            label: 'Sales Rupiah',
            data: [120, 190, 300, 500, 200, 300, 450, 550, 600, 700, 800, 900],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: 500,
                        yMax: 500,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        label: {
                            content: 'Target',
                            enabled: true,
                            position: 'start'
                        }
                    }
                }
            }
        }
    }
});

// OpenLayers (Pastikan script ini ada di dashboard_erp.js Anda)
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([106.816666, -6.200000]), // Contoh koordinat Jakarta
        zoom: 10
    })
});
