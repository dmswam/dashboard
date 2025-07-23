document.addEventListener('DOMContentLoaded', function() {
    // --- Get common DOM elements once at the beginning ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const contactForm = document.querySelector('.contact-form');
    const ctaDemoForm = document.querySelector('.cta-demo-section .cta-form');

    // --- Smooth Scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            // Remove 'active' class from all nav links
            document.querySelectorAll('.main-nav ul li a').forEach(link => {
                link.classList.remove('active');
            });
            // Add 'active' class to the clicked link
            this.classList.add('active');

            // Scroll to the target section smoothly
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open after clicking a link
            if (mobileMenuToggle && mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false'); // Update ARIA attribute
            }
        });
    });

    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Toggle visibility
            mobileMenuToggle.classList.toggle('active'); // Toggle icon/style
            
            // Toggle aria-expanded for accessibility
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
        });
    }

    // --- Testimonial Slider ---
    if (testimonialSlider && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const testimonialCard = testimonialSlider.querySelector('.testimonial-card');

        if (testimonialCard) { // Ensure a card exists before calculating width
            const cardWidth = testimonialCard.offsetWidth + 30; // Card width + gap (30px from CSS)

            nextBtn.addEventListener('click', () => {
                // Calculate max scrollable width considering padding/margin
                const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
                
                if (scrollAmount < maxScroll) {
                    scrollAmount += cardWidth;
                    // Ensure we don't scroll past the end exactly
                    if (scrollAmount > maxScroll) {
                        scrollAmount = maxScroll; 
                    }
                } else {
                    scrollAmount = 0; // Loop back to start
                }
                testimonialSlider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            prevBtn.addEventListener('click', () => {
                if (scrollAmount > 0) {
                    scrollAmount -= cardWidth;
                    // Ensure we don't scroll past the beginning exactly
                    if (scrollAmount < 0) {
                        scrollAmount = 0;
                    }
                } else {
                    // Loop to the end if at the beginning
                    scrollAmount = testimonialSlider.scrollWidth - testimonialSlider.clientWidth; 
                }
                testimonialSlider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        } else {
            console.warn("Testimonial cards not found within the slider. Slider functionality may not work.");
        }
    }

    // --- Form Validation Helper Function ---
    // A simple helper to validate email format
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // --- Basic Form Validation (Contact Form) ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (name === '' || email === '' || message === '') {
                alert('Mohon lengkapi semua kolom formulir.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Mohon masukkan alamat email yang valid.');
                return;
            }

            // If all validations pass
            alert('Pesan Anda berhasil terkirim! Kami akan menghubungi Anda segera.');
            contactForm.reset(); // Clear the form fields
        });
    }

    // --- Basic Form Validation (CTA Demo Form) ---
    if (ctaDemoForm) {
        ctaDemoForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const institutionNameInput = ctaDemoForm.querySelector('input[type="text"]');
            const emailInput = ctaDemoForm.querySelector('input[type="email"]');

            const institutionName = institutionNameInput ? institutionNameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';

            if (institutionName === '' || email === '') {
                alert('Mohon lengkapi semua kolom formulir.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Mohon masukkan alamat email yang valid.');
                return;
            }

            // If all validations pass
            alert('Terima kasih! Tim kami akan segera menghubungi Anda untuk menjadwalkan demo.');
            ctaDemoForm.reset(); // Clear the form fields
        });
    }

    // --- Scroll reveal effect (using Intersection Observer API for better performance) ---
    // Select elements that should have a fade-in effect
    const fadeInElements = document.querySelectorAll(
        '.hero-content, .hero-image, .solution-card, .feature-item, ' +
        '.testimonial-card, .about-content, .about-image, ' +
        '.contact-info, .contact-form-container, ' +
        '.main-header .logo, .main-nav, .auth-buttons' // Add header elements for initial fade-in if desired
    );

    const observerOptions = {
        root: null, // Observing relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible'); // Add class to trigger animation
                observer.unobserve(entry.target); // Stop observing once animated to save resources
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        element.classList.add('fade-in-hidden'); // Apply initial hidden state
        observer.observe(element); // Start observing each element
    });

    // Dynamically add CSS for fade-in effect (good practice to keep CSS in CSS file, but fine for small dynamic additions)
    // Consider moving these to your dashboard.css file if you prefer
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-hidden {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
