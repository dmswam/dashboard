document.addEventListener('DOMContentLoaded', function() {
    // --- Inisialisasi Chart.js untuk Sales Chart ---
    // Pastikan elemen canvas dengan ID 'salesChart' ada di HTML Anda.
    const salesChartCanvas = document.getElementById('salesChart');
    if (salesChartCanvas) {
        const salesChartContext = salesChartCanvas.getContext('2d');

        function generateRandomSalesData(count, min, max) {
            const data = [];
            for (let i = 0; i < count; i++) {
                data.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }
            return data;
        }

        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'];
        const randomSalesData = generateRandomSalesData(labels.length, 100, 500);

        const annotationIndex = labels.length - 1;
        const annotationValue = randomSalesData[annotationIndex];
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        new Chart(salesChartContext, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sales Volume',
                    data: randomSalesData,
                    borderColor: '#FF7F00',
                    backgroundColor: 'rgba(255, 127, 0, 0.2)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#FF7F00',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#FF7F00',
                    pointHoverBorderColor: 'rgba(255,255,255,1)',
                    pointHitRadius: 10,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `Sales: ${context.raw}`;
                            }
                        },
                        backgroundColor: '#333',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#FF7F00',
                        borderWidth: 1
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                mode: 'vertical',
                                scaleID: 'x',
                                value: labels[annotationIndex],
                                borderColor: '#FF7F00',
                                borderWidth: 2,
                                borderDash: [6, 6],
                                label: {
                                    content: `${annotationValue} \n ${formattedDate}`,
                                    enabled: true,
                                    position: 'start',
                                    backgroundColor: 'rgba(255, 127, 0, 0.8)',
                                    color: 'white',
                                    font: {
                                        size: 12,
                                        weight: 'bold'
                                    },
                                    yAdjust: -10,
                                    xAdjust: 20,
                                    borderRadius: 5,
                                    padding: 8
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#666'
                        }
                    }
                }
            }
        });
    }

    // --- Inisialisasi OpenLayers untuk Peta Warehouse di Indonesia ---
    // Pastikan elemen div dengan ID 'map' ada di HTML Anda.
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
                center: ol.proj.fromLonLat([118.0, -2.0]),
                zoom: 5
            })
        });

        const warehouseLocations = [
            [106.8456, -6.2088], // Jakarta
            [112.7688, -7.2575], // Surabaya
            [104.7565, -2.9761], // Palembang
            [116.1157, -8.6534], // Denpasar
            [122.9772, -3.9933], // Kendari
            [110.4267, -7.0000], // Semarang
            [98.6785, 3.5952], // Medan
            [119.4327, -5.1477] // Makassar
        ];

        const features = warehouseLocations.map(coords => {
            return new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(coords))
            });
        });

        const vectorSource = new ol.source.Vector({
            features: features
        });

        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: 'red'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 2
                    })
                })
            })
        });
        map.addLayer(vectorLayer);
    }

    // --- Fungsi Utilitas untuk Menutup Semua Dropdown ---
    function closeAllDropdowns() {
        // Tutup semua dropdown navigasi utama dan bersarang
        document.querySelectorAll('.dropdown.show, .dropdown-nested.show').forEach(openDropdown => {
            openDropdown.classList.remove('show');
            openDropdown.style.maxHeight = '0';
            openDropdown.style.opacity = '0';
        });

        // Tutup dropdown profil jika terbuka
        const profileDropdown = document.querySelector('.dropdown-logo');
        if (profileDropdown && profileDropdown.classList.contains('show')) {
            profileDropdown.classList.remove('show');
            profileDropdown.style.maxHeight = '0';
            profileDropdown.style.opacity = '0';
        }
    }

    // --- Penanganan Dropdown Navigasi Utama ---
    // Mendapatkan semua pemicu dropdown utama (elemen LI seperti .perusahaan, .finance, dll.)
    // Kita mengecualikan '.dashboard' karena itu bukan dropdown
    const mainDropdownTriggers = document.querySelectorAll('.isi-container > li:not(.dashboard)');

    mainDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            // event.target adalah elemen spesifik yang diklik (misalnya: img, a, atau li itu sendiri)
            const clickedElement = event.target;
            // Dapatkan elemen UL.dropdown di dalam LI yang saat ini diklik
            const dropdown = this.querySelector('.dropdown');

            // Jika tidak ada dropdown yang ditemukan, keluar dari fungsi
            if (!dropdown) {
                return;
            }

            // Mencegah navigasi default untuk link jika href="#" atau tidak ada href
            // atau jika klik terjadi pada gambar
            if ((clickedElement.tagName === 'A' && (clickedElement.getAttribute('href') === '#' || !clickedElement.getAttribute('href'))) || clickedElement.tagName === 'IMG') {
                event.preventDefault();
            } else if (clickedElement === this) {
                // Jika klik pada LI itu sendiri (bukan img atau a), cegah default jika ada dropdown
                event.preventDefault();
            }


            event.stopPropagation(); // Hentikan propagasi event klik ke elemen induk (misalnya ke document)

            // Toggle tampilan dropdown
            if (dropdown.classList.contains('show')) {
                // Jika sudah terbuka, tutup
                dropdown.classList.remove('show');
                dropdown.style.maxHeight = '0';
                dropdown.style.opacity = '0';
            } else {
                // Jika tertutup, tutup semua dropdown lainnya lalu buka yang ini
                closeAllDropdowns(); // Menutup dropdown lain yang mungkin terbuka
                dropdown.classList.add('show');
                // Set max-height ke scrollHeight untuk animasi yang tepat
                // Ini penting agar transisi max-height bisa berjalan mulus
                dropdown.style.maxHeight = dropdown.scrollHeight + "px";
                dropdown.style.opacity = '1';
            }
        });
    });

    // --- Penanganan Dropdown Bersarang (Nested Dropdown) ---
    // Mendapatkan semua pemicu dropdown bersarang (link A di dalam li.has-nested)
    const nestedDropdownTriggers = document.querySelectorAll('.dropdown .has-nested > a');

    nestedDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah navigasi default untuk link '#'
            event.stopPropagation(); // Sangat penting: Mencegah event naik ke pemicu utama (main dropdown LI)

            const nestedDropdown = this.nextElementSibling; // Dapatkan elemen UL .dropdown-nested
            if (nestedDropdown && nestedDropdown.classList.contains('dropdown-nested')) {
                // Tutup semua dropdown bersarang lainnya dalam grup yang sama (dalam dropdown utama yang sama)
                const parentUl = this.closest('.dropdown'); // Dapatkan UL main dropdown
                if (parentUl) {
                    parentUl.querySelectorAll('.dropdown-nested.show').forEach(otherNestedDropdown => {
                        if (otherNestedDropdown !== nestedDropdown) {
                            otherNestedDropdown.classList.remove('show');
                            otherNestedDropdown.style.maxHeight = '0';
                            otherNestedDropdown.style.opacity = '0';
                        }
                    });
                }

                // Toggle tampilan dropdown bersarang yang sedang diklik
                if (nestedDropdown.classList.contains('show')) {
                    nestedDropdown.classList.remove('show');
                    nestedDropdown.style.maxHeight = '0';
                    nestedDropdown.style.opacity = '0';
                } else {
                    nestedDropdown.classList.add('show');
                    nestedDropdown.style.maxHeight = nestedDropdown.scrollHeight + "px";
                    nestedDropdown.style.opacity = '1';
                }
            }
        });
    });

    // --- Penanganan Dropdown Profil ---
    // Pemicu adalah gambar dengan ID 'ic'
    const profileToggle = document.getElementById('ic');
    // Dropdown itu sendiri adalah .dropdown-logo
    const profileDropdown = document.querySelector('.dropdown-logo');

    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Mencegah event menyebar ke document
            closeAllDropdowns(); // Tutup dropdown navigasi utama dan bersarang saat profil diklik

            // Toggle tampilan dropdown profil
            if (profileDropdown.classList.contains('show')) {
                profileDropdown.classList.remove('show');
                profileDropdown.style.maxHeight = '0';
                profileDropdown.style.opacity = '0';
            } else {
                profileDropdown.classList.add('show');
                // Set max-height ke scrollHeight untuk animasi yang tepat
                profileDropdown.style.maxHeight = profileDropdown.scrollHeight + "px";
                profileDropdown.style.opacity = '1';
            }
        });

        // Opsional: Klik pada item logout di dalam dropdown juga akan menutup dropdown
        // Ini memastikan bahwa setelah mengklik "Logout", dropdown profil akan tertutup.
        const logoutLink = profileDropdown.querySelector('li a[href="Dashboard.html"]');
        if (logoutLink) {
            logoutLink.addEventListener('click', function(event) {
                // Biarkan link melakukan navigasi, tapi tutup dropdown setelah itu
                closeAllDropdowns();
                // Jika ingin mencegah navigasi default link logout:
                // event.preventDefault();
                // window.location.href = "Dashboard.html"; // Navigasi manual
            });
        }
    }

    // --- Menutup Semua Dropdown saat Klik di Luar ---
    // Ini adalah event listener global yang akan menutup semua dropdown
    // jika klik terjadi di luar area navigasi utama dan area profil.
    document.addEventListener('click', function(event) {
        const navContainer = document.querySelector('.isi-container');
        // Mendapatkan LI yang membungkus gambar profil dan dropdown-logo
        const profileArea = document.querySelector('.logo-i > li:nth-child(2)');

        // Periksa apakah klik terjadi di dalam area navigasi atau area profil
        const isClickInsideNav = navContainer && navContainer.contains(event.target);
        const isClickInsideProfileArea = profileArea && profileArea.contains(event.target);

        // Jika klik tidak di dalam area navigasi DAN tidak di dalam area profil, tutup semua dropdown
        if (!isClickInsideNav && !isClickInsideProfileArea) {
            closeAllDropdowns();
        }
    });
});