document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('header');
    const phaseCards = document.querySelectorAll('.phase-card');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    const themeToggle = document.getElementById('themeToggle');

    // ===== THEME TOGGLE FUNCTIONALITY =====
    // Check for saved theme preference or default to system preference
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        localStorage.setItem('theme', theme);
        
        // Sync toggle state with theme (checked = dark mode)
        if (themeToggle) {
            themeToggle.checked = theme === 'dark';
        }
    }

    // Initialize theme
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);

    // Theme toggle change handler
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Listen for system theme changes (if user hasn't manually set preference)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===== STICKY HEADER =====
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        header.style.transition = 'transform 0.3s ease-in-out';
        
        if (scrollTop > 50) {
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
        
        // Animate elements on scroll
        animateOnScroll();
    });

    // ===== SCROLL ANIMATIONS =====
    function animateOnScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate-on-scroll');
            }
        });
    }

    // Initialize animation for visible elements
    setTimeout(animateOnScroll, 100);

    // ===== PROJECT CARDS INTERACTION =====
    phaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-card-border)';
        });

        card.addEventListener('click', function() {
            // Reset all cards
            phaseCards.forEach(c => {
                c.style.borderColor = 'var(--color-card-border)';
                c.style.transform = 'translateY(0)';
                c.style.boxShadow = 'none';
            });
            
            // Highlight selected card
            this.style.borderColor = 'var(--color-primary)';
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    });

    // ===== CONTACT FORM =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.classList.add('btn--loading');
            submitButton.textContent = 'Sending...';
            
            // Simulate submission
            setTimeout(function() {
                contactForm.style.opacity = '0';
                contactForm.style.height = contactForm.offsetHeight + 'px';
                contactForm.style.transition = 'opacity 0.3s ease, height 0.5s ease 0.3s';
                
                setTimeout(function() {
                    contactForm.innerHTML = '';
                    
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <h3>Thank You!</h3>
                        <p>Your message has been received. I'll get back to you as soon as possible.</p>
                    `;
                    
                    contactForm.appendChild(successMessage);
                    contactForm.style.height = 'auto';
                    contactForm.style.opacity = '1';
                }, 300);
            }, 1500);
        });
    }

    // ===== SMOOTH SCROLL =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL VISIBILITY =====
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 600) {
            const backToTopBtn = document.querySelector('.back-to-top');
            if (backToTopBtn) backToTopBtn.style.display = 'flex';
        } else {
            const backToTopBtn = document.querySelector('.back-to-top');
            if (backToTopBtn) backToTopBtn.style.display = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
