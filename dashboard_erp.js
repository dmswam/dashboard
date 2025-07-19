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
            // Hapus atribut style yang diatur oleh JS agar CSS default (hidden/height:0) berlaku
            // Ini PENTING untuk me-reset posisi desktop saat beralih ke mobile
            dropdown.style.left = ''; 
            dropdown.style.top = '';  
            dropdown.style.height = ''; // Hapus height eksplisit untuk transisi
            // Di mobile, overflow sudah diatur di CSS, tidak perlu manipulasi JS di sini
        });

        document.querySelectorAll('.isi-container > li.active-dropdown').forEach(item => {
            item.classList.remove('active-dropdown');
        });
        document.querySelectorAll('.dropdown li.active-nested').forEach(item => { 
            item.classList.remove('active-nested');
        });

        document.body.classList.remove('no-scroll'); // Pastikan body scroll aktif jika sidebar ditutup
    }

    function setDropdownPosition(dropdownElement, triggerElement, isNested = false) {
        if (!dropdownElement || !triggerElement) return;

        if (isDesktop()) {
            const triggerRect = triggerElement.getBoundingClientRect();
            const sidebarRect = sidebarNav.getBoundingClientRect(); // Mengambil posisi sidebar

            let topPosition;
            let leftPosition;

            if (isNested) {
                topPosition = triggerRect.top; 
                leftPosition = triggerRect.right + 10;
            } else {
                topPosition = triggerRect.top; 
                leftPosition = sidebarRect.right + 10; // Geser ke kanan dari sidebar
            }

            const dropdownHeight = dropdownElement.offsetHeight;
            const dropdownWidth = dropdownElement.offsetWidth;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const headerHeight = 60;

            // Penyesuaian agar dropdown tidak keluar dari viewport bawah
            if (topPosition + dropdownHeight > viewportHeight - 10) { 
                topPosition = viewportHeight - dropdownHeight - 10;
            }
            // Penyesuaian agar dropdown tidak keluar dari viewport atas (misal karena ada scroll)
            if (topPosition < headerHeight) { 
                topPosition = headerHeight;
            }

            // Penyesuaian agar nested dropdown tidak keluar dari viewport kanan (jika terlalu ke kanan, geser ke kiri)
            if (isNested && (leftPosition + dropdownWidth > viewportWidth - 10)) { 
                leftPosition = triggerRect.left - dropdownWidth - 10;
            }

            dropdownElement.style.left = `${leftPosition}px`;
            dropdownElement.style.top = `${topPosition}px`;
            dropdownElement.style.height = ''; // Hapus height eksplisit untuk desktop
        } else {
            // Di mobile, dropdown akan dikontrol oleh CSS (height: auto dan overflow)
            // Kita hanya perlu memastikan class 'show' ditambahkan/dihapus
            // dan tinggi diatur untuk transisi jika belum
            if (!dropdownElement.style.height || dropdownElement.style.height === '0px') {
                dropdownElement.style.height = `${dropdownElement.scrollHeight}px`; 
            } else {
                dropdownElement.style.height = '0px'; // Set ke 0 untuk transisi tutup
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
            }
        });

        // Menutup mobile sidebar jika klik di luar sidebar atau toggle
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

        // Penyesuaian saat resize
        window.addEventListener('resize', function() {
            // Perhatikan bahwa dropdown akan tertutup saat resize, jadi posisi akan di-reset oleh closeAllSidebarDropdowns
            closeAllSidebarDropdowns(); 

            // Jika dari mobile ke desktop, pastikan sidebar kembali normal
            if (isDesktop()) { 
                if (sidebarNav.classList.contains('active')) {
                    sidebarNav.classList.remove('active'); 
                }
                document.body.classList.remove('no-scroll'); 
            } else { // Jika dari desktop ke mobile, sesuaikan body scroll
                document.body.classList.toggle('no-scroll', sidebarNav.classList.contains('active'));
            }
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                profileDropdownMenu.classList.remove('show'); 
            }
        });
    }

    // 2. Profile Dropdown (Logic tetap sama)
    if (profileDropdownTrigger && profileDropdownMenu) {
        profileDropdownTrigger.addEventListener('click', function(event) {
            event.stopPropagation(); 
            closeAllSidebarDropdowns(); 
            profileDropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function(event) {
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show') &&
                !profileDropdownMenu.contains(event.target) && !profileDropdownTrigger.contains(event.target)) {
                profileDropdownMenu.classList.remove('show');
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
                }

                const isCurrentlyActive = item.classList.contains('active-dropdown');

                menuItemsWithDropdown.forEach(otherItem => {
                    if (otherItem !== item) { 
                        otherItem.classList.remove('active-dropdown');
                        const otherDropdown = otherItem.querySelector('.dropdown');
                        if (otherDropdown && otherDropdown.classList.contains('show')) {
                            otherDropdown.classList.remove('show');
                            // Penting: Reset style untuk dropdown lain
                            otherDropdown.style.left = ''; 
                            otherDropdown.style.top = '';  
                            otherDropdown.style.height = ''; 
                            otherDropdown.querySelectorAll('.dropdown-nested.show').forEach(nested => {
                                nested.classList.remove('show');
                                nested.style.left = '';
                                nested.style.top = '';
                                nested.style.height = '';
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
                    // Menggunakan setTimeout untuk memastikan DOM dirender sebelum menghitung tinggi
                    if (!isDesktop()) { // Hanya hitung tinggi untuk transisi di mobile
                        dropdown.style.height = `${dropdown.scrollHeight}px`;
                    } else { // Di desktop, panggil setDropdownPosition
                        setTimeout(() => {
                            setDropdownPosition(dropdown, link, false);
                        }, 0);
                    }
                } else {
                    item.classList.remove('active-dropdown');
                    if (!isDesktop()) { // Untuk transisi tutup di mobile
                        dropdown.style.height = '0px';
                        // Setelah transisi selesai, hapus kelas 'show'
                        dropdown.addEventListener('transitionend', function handler() {
                            dropdown.classList.remove('show');
                            dropdown.removeEventListener('transitionend', handler);
                        }, { once: true });
                    } else { // Di desktop, langsung hapus
                        dropdown.classList.remove('show');
                        dropdown.style.left = '';
                        dropdown.style.top = '';
                    }

                    // Reset semua nested dropdown juga
                    dropdown.querySelectorAll('.dropdown-nested.show').forEach(nested => {
                        nested.classList.remove('show');
                        nested.style.left = '';
                        nested.style.top = '';
                        nested.style.height = '';
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
                                }
                            }
                        }
                    });
                }

                if (!isCurrentlyActive) {
                    nestedItem.classList.add('active-nested');
                    nestedDropdown.classList.add('show');
                    if (!isDesktop()) { // Hanya hitung tinggi untuk transisi di mobile
                        nestedDropdown.style.height = `${nestedDropdown.scrollHeight}px`;
                    } else { // Di desktop, panggil setDropdownPosition
                        setTimeout(() => {
                            setDropdownPosition(nestedDropdown, nestedLink, true);
                        }, 0);
                    }
                } else {
                    nestedItem.classList.remove('active-nested');
                    if (!isDesktop()) { // Untuk transisi tutup di mobile
                        nestedDropdown.style.height = '0px';
                        nestedDropdown.addEventListener('transitionend', function handler() {
                            nestedDropdown.classList.remove('show');
                            nestedDropdown.removeEventListener('transitionend', handler);
                        }, { once: true });
                    } else { // Di desktop, langsung hapus
                        nestedDropdown.classList.remove('show');
                        nestedDropdown.style.left = '';
                        nestedDropdown.style.top = '';
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
