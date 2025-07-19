document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const profileDropdownMenu = document.querySelector('.dropdown-logo');
    const profileDropdownTrigger = document.querySelector('.profile-dropdown-trigger');
    const menuItemsWithDropdown = document.querySelectorAll('.isi-container > li');
    const hasNestedItems = document.querySelectorAll('.has-nested');

    // --- Helper Functions ---

    // Mengontrol scrollbar sidebar (hanya relevan untuk mobile)
    function toggleSidebarScroll(enableScroll) {
        if (window.innerWidth <= 992 && sidebarNav) {
            sidebarNav.classList.toggle('no-scroll', !enableScroll);
        }
    }

    // Menutup semua dropdown sidebar (utama dan bersarang) dan mereset posisinya
    function closeAllSidebarDropdowns() {
        document.querySelectorAll('.sidebar-nav .dropdown.show, .sidebar-nav .dropdown-nested.show').forEach(dropdown => {
            dropdown.classList.remove('show');
            dropdown.style.left = '-9999px';
            dropdown.style.top = '-9999px';
        });
        toggleSidebarScroll(true); // Aktifkan kembali scrollbar setelah semua dropdown tertutup
    }

    // Mengatur posisi dropdown fixed
    function setDropdownPosition(dropdownElement, triggerElement) {
        if (window.innerWidth <= 992) { // Mobile: dropdown di bawah trigger (CSS handles this via position: relative in media query)
            dropdownElement.style.left = 'auto';
            dropdownElement.style.top = 'auto';
        } else { // Desktop: dropdown di samping trigger
            // Memaksa reflow/repaint sebelum mengukur
            dropdownElement.offsetHeight;
            triggerElement.offsetHeight;

            const triggerRect = triggerElement.getBoundingClientRect();
            const sidebarRect = sidebarNav.getBoundingClientRect();

            let topPosition = triggerRect.top;
            let leftPosition = sidebarRect.right + 10; // 10px margin dari sidebar

            // Penyesuaian agar dropdown tidak keluar layar bawah
            const dropdownHeight = dropdownElement.offsetHeight;
            const viewportHeight = window.innerHeight;
            const headerHeight = 60; // Tinggi header tetap

            if (topPosition + dropdownHeight > viewportHeight - 10) {
                topPosition = viewportHeight - dropdownHeight - 10;
                if (topPosition < headerHeight) {
                    topPosition = headerHeight;
                }
            }
            if (topPosition < headerHeight && topPosition + dropdownHeight > headerHeight) {
                 topPosition = headerHeight;
            }

            dropdownElement.style.left = `${leftPosition}px`;
            dropdownElement.style.top = `${topPosition}px`;
        }
    }

    // --- Event Listeners ---

    // 1. Menu Hamburger dan Sidebar Toggle
    if (mobileMenuToggle && sidebarNav) {
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            sidebarNav.classList.toggle('active');
            closeAllSidebarDropdowns();
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                profileDropdownMenu.classList.remove('show');
            }
            toggleSidebarScroll(sidebarNav.classList.contains('active') ? false : true);
        });

        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 992) {
                const isClickInsideSidebar = sidebarNav.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);

                if (sidebarNav.classList.contains('active') && !isClickInsideSidebar && !isClickOnToggle) {
                    sidebarNav.classList.remove('active');
                    closeAllSidebarDropdowns();
                }
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                if (sidebarNav.classList.contains('active')) {
                    sidebarNav.classList.remove('active');
                }
                toggleSidebarScroll(false);
            } else {
                toggleSidebarScroll(sidebarNav.classList.contains('active') ? false : true);
            }
            closeAllSidebarDropdowns();
            if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                profileDropdownMenu.classList.remove('show');
            }
        });
    }

    // 2. Dropdown Profil Pengguna
    if (profileDropdownTrigger && profileDropdownMenu) {
        profileDropdownTrigger.addEventListener('click', function(event) {
            event.stopPropagation();
            closeAllSidebarDropdowns();
            profileDropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function(event) {
            if (!profileDropdownMenu.contains(event.target) && !profileDropdownTrigger.contains(event.target)) {
                if (profileDropdownMenu.classList.contains('show')) {
                    profileDropdownMenu.classList.remove('show');
                }
            }
        });
    }

    // 3. Dropdown Menu Sidebar (Utama dan Bersarang)
    menuItemsWithDropdown.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            item.addEventListener('click', function(event) {
                event.stopPropagation();

                if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                    profileDropdownMenu.classList.remove('show');
                }

                const isCurrentlyActive = dropdown.classList.contains('show');

                menuItemsWithDropdown.forEach(otherItem => {
                    const otherDropdown = otherItem.querySelector('.dropdown');
                    if (otherDropdown && otherDropdown !== dropdown && otherDropdown.classList.contains('show')) {
                        otherDropdown.classList.remove('show');
                        otherDropdown.style.left = '-9999px';
                        otherDropdown.style.top = '-9999px';
                        otherDropdown.querySelectorAll('.dropdown-nested.show').forEach(nested => {
                            nested.classList.remove('show');
                            nested.style.left = '-9999px';
                            nested.style.top = '-9999px';
                        });
                    }
                });

                if (!isCurrentlyActive) {
                    dropdown.classList.add('show');
                    setTimeout(() => {
                        setDropdownPosition(dropdown, item);
                    }, 0);
                } else {
                    dropdown.classList.remove('show');
                    dropdown.style.left = '-9999px';
                    dropdown.style.top = '-9999px';
                }
            });
        }
    });

    // Handle nested dropdowns
    hasNestedItems.forEach(nestedItem => {
        const nestedTrigger = nestedItem.querySelector('a'); // Ini adalah link yang menjadi pemicu dropdown
        const nestedDropdown = nestedItem.querySelector('.dropdown-nested');

        if (nestedTrigger && nestedDropdown) {
            // Kita akan menggunakan event listener pada LI parent, BUKAN pada link A-nya
            // Ini untuk memastikan klik pada link A TIDAK dihentikan
            nestedItem.addEventListener('click', function(event) {
                // Hentikan propagasi event ke dropdown utama
                event.stopPropagation();

                // Cek apakah target klik adalah link yang memiliki href (bukan pemicu nested dropdown itu sendiri)
                // Jika target adalah link DI DALAM dropdown bersarang (bukan trigger nestedDropdown itu sendiri)
                // DAN link tersebut memiliki href, biarkan event default berjalan (yaitu navigasi)
                if (event.target.tagName === 'A' && event.target.closest('.dropdown-nested') === nestedDropdown && event.target.getAttribute('href')) {
                    // console.log("Navigating to: ", event.target.getAttribute('href'));
                    // Biarkan event default (navigasi) terjadi.
                    // Tidak perlu preventDefault() atau stopPropagation() tambahan di sini.
                    return; // Keluar dari fungsi ini agar link berfungsi
                }
                
                // Jika klik bukan pada link navigasi, baru proses toggle dropdown
                const isCurrentlyActive = nestedDropdown.classList.contains('show');

                nestedItem.parentNode.querySelectorAll('.dropdown-nested.show').forEach(otherNestedDropdown => {
                    if (otherNestedDropdown !== nestedDropdown) {
                        otherNestedDropdown.classList.remove('show');
                        otherNestedDropdown.style.left = '-9999px';
                        otherNestedDropdown.style.top = '-9999px';
                    }
                });
                
                if (!isCurrentlyActive) {
                    nestedDropdown.classList.add('show');
                    setTimeout(() => {
                        setDropdownPosition(nestedDropdown, nestedTrigger);
                    }, 0);
                } else {
                    nestedDropdown.classList.remove('show');
                    nestedDropdown.style.left = '-9999px';
                    nestedDropdown.style.top = '-9999px';
                }
            });
        }
    });

    // Menutup semua dropdown sidebar (kecuali profil) jika klik di luar
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebarNav ? sidebarNav.contains(event.target) : false;
        const isClickInsideProfileDropdown = profileDropdownMenu ? profileDropdownMenu.contains(event.target) : false;
        
        const isClickInsideAnySidebarDropdown = Array.from(document.querySelectorAll('.sidebar-nav .dropdown.show, .sidebar-nav .dropdown-nested.show'))
                                                     .some(dropdown => dropdown.contains(event.target));

        if (window.innerWidth > 992) {
            if (!isClickInsideSidebar && !isClickInsideAnySidebarDropdown) {
                closeAllSidebarDropdowns();
            }
        } else {
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            if (!isClickInsideSidebar && !isClickOnToggle && !isClickInsideProfileDropdown && !isClickInsideAnySidebarDropdown) {
                closeAllSidebarDropdowns();
                if (profileDropdownMenu && profileDropdownMenu.classList.contains('show')) {
                    profileDropdownMenu.classList.remove('show');
                }
                if (sidebarNav && sidebarNav.classList.contains('active')) {
                     sidebarNav.classList.remove('active');
                     toggleSidebarScroll(true);
                }
            }
        }
    });


    // --- 4. Chart Sales (Chart.js) ---
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Sales Performance',
                    data: [12000, 19000, 15000, 22000, 28000, 20000, 25000, 30000],
                    backgroundColor: 'rgba(1, 56, 106, 0.2)',
                    borderColor: '#01386A',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                return 'Rp ' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += 'Rp ' + context.parsed.y.toLocaleString();
                                    }
                                    return label;
                                }
                            }
                        },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: 25000,
                                yMax: 25000,
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 2,
                                borderDash: [6, 6],
                                label: {
                                    content: 'Target',
                                    enabled: true,
                                    position: 'end'
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    // --- 5. Peta Warehouse (OpenLayers) ---
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([106.829, -6.175]), // Contoh koordinat Jakarta
                zoom: 10
            })
        });

        const marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([106.829, -6.175]))
        });

        const vectorSource = new ol.source.Vector({
            features: [marker]
        });

        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                })
            })
        });
        map.addLayer(vectorLayer);
    }
});
