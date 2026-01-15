// script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Generate Stars
    // ============================================
    function generateStars() {
        const starsContainer = document.getElementById('starsContainer');
        const numberOfStars = 100;

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            starsContainer.appendChild(star);
        }
    }

    generateStars();

    // ============================================
    // Generate Falling Moons
    // ============================================
    function generateFallingMoons() {
        const fallingMoonsContainer = document.getElementById('fallingMoonsContainer');
        const numberOfMoons = 15; // Jumlah bulan yang jatuh

        function createFallingMoon() {
            const moon = document.createElement('div');
            moon.className = 'falling-moon';
            
            // Random size between 20px and 60px
            const size = Math.random() * 40 + 20;
            moon.style.width = size + 'px';
            moon.style.height = size + 'px';
            
            // Random starting position
            moon.style.left = Math.random() * 100 + '%';
            
            // Random animation duration between 8s and 15s
            const duration = Math.random() * 7 + 8;
            moon.style.animationDuration = duration + 's';
            
            // Random delay
            moon.style.animationDelay = Math.random() * 5 + 's';
            
            fallingMoonsContainer.appendChild(moon);
            
            // Remove and recreate after animation completes
            setTimeout(() => {
                moon.remove();
                createFallingMoon();
            }, (duration + 5) * 1000);
        }

        // Create initial falling moons
        for (let i = 0; i < numberOfMoons; i++) {
            setTimeout(() => {
                createFallingMoon();
            }, i * 800);
        }
    }

    generateFallingMoons();

    // ============================================
    // Generate Floating Moon Particles
    // ============================================
    function generateMoonParticles() {
        const body = document.body;
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'moon-particle';
            
            // Random size between 5px and 15px
            const size = Math.random() * 10 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random starting position at bottom
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '0';
            particle.style.position = 'fixed';
            particle.style.zIndex = '1';
            
            // Random animation duration
            const duration = Math.random() * 5 + 5;
            particle.style.animationDuration = duration + 's';
            
            body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, 2000); // Create new particle every 2 seconds
    }

    generateMoonParticles();

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Scroll to section
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ============================================
    // Active Section Highlight on Scroll
    // ============================================
    const sections = document.querySelectorAll('.section');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);

    // ============================================
    // Parallax Effect for Moon
    // ============================================
    const moonContainer = document.querySelector('.moon-container');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        moonContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // ============================================
    // Mouse Follow Effect
    // ============================================
    let mouseX = 0;
    let mouseY = 0;
    let moonX = 0;
    let moonY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });
    
    function animateMoon() {
        moonX += (mouseX * 20 - moonX) * 0.05;
        moonY += (mouseY * 20 - moonY) * 0.05;
        
        moonContainer.style.transform = `translate(${moonX}px, ${moonY}px)`;
        
        requestAnimationFrame(animateMoon);
    }
    
    animateMoon();

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    function reveal() {
        const reveals = document.querySelectorAll('.timeline-item, .experience-card, .project-card, .about-content, .contact-content');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    document.querySelectorAll('.timeline-item, .experience-card, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    window.addEventListener('scroll', reveal);
    reveal(); // Call once on load

    // ============================================
    // Typing Effect for Main Title
    // ============================================
    const glitchText = document.querySelector('.glitch');
    const originalText = glitchText.textContent;
    
    function glitchEffect() {
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let iteration = 0;
        
        const interval = setInterval(() => {
            glitchText.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
    
    // Run glitch effect on hover
    glitchText.addEventListener('mouseenter', glitchEffect);

    // ============================================
    // Form Submission
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message (you can replace this with actual form submission)
        alert('Thank you for your message! I will get back to you soon. ✨');
        
        // Reset form
        contactForm.reset();
    });

    // ============================================
    // Add Hover Effect to Project Cards
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // Skill Items Animation
    // ============================================
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(139, 92, 246, 0.5)';
            this.style.boxShadow = '0 5px 20px rgba(139, 92, 246, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(139, 92, 246, 0.2)';
            this.style.boxShadow = 'none';
        });
    });

    // ============================================
    // Add Floating Animation to Elements
    // ============================================
    function addFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.experience-card, .project-card');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 0.2;
            const duration = 3 + (index % 3);
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    addFloatingAnimation();

    // ============================================
    // Cursor Trail Effect
    // ============================================
    function createTrail(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
    
    // Add cursor trail CSS
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        .cursor-trail {
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 1s ease-out forwards;
        }
        
        @keyframes trailFade {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(trailStyle);
    
    document.addEventListener('mousemove', createTrail);

    // ============================================
    // Add Particle Effect on Click
    // ============================================
    document.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
        createMoonBurst(e.clientX, e.clientY);
    });
    
    function createParticles(x, y) {
        const colors = ['#8b5cf6', '#ec4899', '#f0abfc', '#ffffff'];
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '5px';
            particle.style.height = '5px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            let posX = 0;
            let posY = 0;
            let opacity = 1;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                
                particle.style.transform = `translate(${posX}px, ${posY}px)`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            animate();
        }
    }

    // Create mini moons on click
    function createMoonBurst(x, y) {
        const moonCount = 5;
        
        for (let i = 0; i < moonCount; i++) {
            const miniMoon = document.createElement('div');
            const size = Math.random() * 15 + 10;
            
            miniMoon.style.position = 'fixed';
            miniMoon.style.left = x + 'px';
            miniMoon.style.top = y + 'px';
            miniMoon.style.width = size + 'px';
            miniMoon.style.height = size + 'px';
            miniMoon.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
            miniMoon.style.borderRadius = '50%';
            miniMoon.style.pointerEvents = 'none';
            miniMoon.style.zIndex = '9999';
            miniMoon.style.boxShadow = '0 0 10px rgba(248, 249, 250, 0.6)';
            
            const angle = (Math.PI * 2 * i) / moonCount;
            const distance = 3;
            const vx = Math.cos(angle) * distance;
            const vy = Math.sin(angle) * distance;
            
            document.body.appendChild(miniMoon);
            
            let posX = 0;
            let posY = 0;
            let opacity = 1;
            let rotation = 0;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                rotation += 5;
                opacity -= 0.015;
                
                miniMoon.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;
                miniMoon.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    miniMoon.remove();
                }
            };
            
            animate();
        }
    }

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c✨ Welcome to Moon Goddess Portfolio! ✨', 
        'font-size: 20px; color: #8b5cf6; font-weight: bold;');
    console.log('%cMade with 💜 and magic', 
        'font-size: 14px; color: #ec4899;');

    // ============================================
    // Loading Animation Complete
    // ============================================
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Add Custom Cursor (Optional)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(139, 92, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        }
        
        body {
            cursor: none;
        }
        
        a, button {
            cursor: none;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = (e.clientX - 10) + 'px';
        cursor.style.top = (e.clientY - 10) + 'px';
    });
    
    document.querySelectorAll('a, button, .btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'rgba(236, 72, 153, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(139, 92, 246, 0.5)';
        });
    });
});