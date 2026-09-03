        document.addEventListener('DOMContentLoaded', () => {
            // Automatically update footer year
            document.getElementById('year').textContent = new Date().getFullYear();

            // Mobile Navigation Toggle
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navItems = document.querySelectorAll('.nav-link');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // Close mobile menu when clicking a link
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.textContent = '☰';
                });
            });

            // Highlight Active Navigation Link on Scroll
            const sections = document.querySelectorAll('section');
            
            window.addEventListener('scroll', () => {
                let current = '';
                const scrollY = window.pageYOffset;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                navItems.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === `#${current}`) {
                        a.classList.add('active');
                    }
                });
            });

            // Intersection Observer for scroll animations (fade-in)
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optional: stop observing once faded in
                        // observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));

            // Carousel Logic
            const track = document.getElementById('photoTrack');
            const slides = Array.from(track.children);
            const nextButton = document.querySelector('.carousel-btn.next');
            const prevButton = document.querySelector('.carousel-btn.prev');
            const dotsNav = document.querySelector('.carousel-indicators');
            const dots = Array.from(dotsNav.children);
            
            let currentIndex = 0;

            const updateCarousel = (index) => {
                // Move track
                track.style.transform = `translateX(-${index * 100}%)`;
                
                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            };

            // Next button click
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                updateCarousel(currentIndex);
            });

            // Prev button click
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
                updateCarousel(currentIndex);
            });

            // Dot click
            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('div');
                if (!targetDot) return;
                
                currentIndex = parseInt(targetDot.dataset.index);
                updateCarousel(currentIndex);
            });

            // Optional: Auto-play functionality (uncomment to enable)
            // setInterval(() => {
            //     currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            //     updateCarousel(currentIndex);
            // }, 5000); // Changes image every 5 seconds

        });