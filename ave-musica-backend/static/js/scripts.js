// Ave Musica Choir Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAudioPlayer();
    initEventsCarousel();
    initNewsletterForm();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initPerformanceCards();
    initBiographyAnimations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Audio player functionality
function initAudioPlayer() {
    const playBtn = document.getElementById('playBtn');
    const progressFill = document.querySelector('.progress-fill');
    const timeDisplay = document.querySelector('.time-display');
    
    let isPlaying = false;
    let currentTime = 0;
    let duration = 180; // 3 minutes in seconds (placeholder)
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }

    function playAudio() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playBtn.style.background = 'var(--accent-purple)';
        
        // Simulate audio progress (replace with actual audio implementation)
        const progressInterval = setInterval(() => {
            if (isPlaying && currentTime < duration) {
                currentTime++;
                updateProgress();
            } else {
                clearInterval(progressInterval);
                if (currentTime >= duration) {
                    resetAudio();
                }
            }
        }, 1000);
    }

    function pauseAudio() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.background = 'var(--accent-gold)';
    }

    function resetAudio() {
        isPlaying = false;
        currentTime = 0;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.background = 'var(--accent-gold)';
        updateProgress();
    }

    function updateProgress() {
        const progress = (currentTime / duration) * 100;
        progressFill.style.width = progress + '%';
        
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = currentTime % 60;
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = duration % 60;
        
        timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    }
}

// Events carousel functionality
function initEventsCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const eventCards = document.querySelectorAll('.event-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = eventCards.length;
    
    if (!carouselContainer || totalSlides === 0) return;
    
    // Initialize carousel
    updateCarousel();
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    function updateCarousel() {
        // Update event cards
        eventCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentSlide) {
                card.classList.add('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
        
        // Update carousel position
        const cardWidth = eventCards[0].offsetWidth + 30; // Include gap
        carouselContainer.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        updateCarousel();
    });
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Моля, въведете валиден имейл адрес.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Моля, въведете правилен имейл формат.', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            showNotification('Успешно се абонирахте за нашия бюлетин!', 'success');
            emailInput.value = '';
            
            // Here you would typically send the email to your backend
            console.log('Newsletter subscription:', email);
        });
    }
}

// Performance cards functionality
function initPerformanceCards() {
    const playCardBtns = document.querySelectorAll('.play-card-btn');
    
    playCardBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.performance-card');
            const title = card.querySelector('h3').textContent;
            
            // Toggle play/pause state
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                showNotification(`Възпроизвеждане: ${title}`, 'info');
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                showNotification(`Пауза: ${title}`, 'info');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .performances-grid, .biography-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Моля, попълнете всички полета.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Моля, въведете правилен имейл формат.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Съобщението е изпратено успешно!', 'success');
            contactForm.reset();
            
            // Here you would typically send the form data to your backend
            console.log('Contact form submission:', { name, email, message });
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#27ae60';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        default: return '#3498db';
    }
}

// Biography animations
function initBiographyAnimations() {
    const bioElements = document.querySelectorAll('.conductor-bio, .voices-grid');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    bioElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) prevBtn.click();
    }
    
    if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.click();
    }
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add loading screen
const loadingScreen = document.createElement('div');
loadingScreen.id = 'loading-screen';
loadingScreen.innerHTML = `
    <div class="loading-content">
        <div class="loading-logo">
            <i class="fas fa-music"></i>
            <span>Ave Musica</span>
        </div>
        <div class="loading-spinner"></div>
    </div>
`;

// Add loading screen styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    #loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-black);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loading-content {
        text-align: center;
    }
    
    .loading-logo {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 30px;
        font-family: var(--font-primary);
        font-size: 2rem;
        font-weight: 700;
        color: var(--accent-gold);
    }
    
    .loading-logo i {
        font-size: 2.5rem;
        animation: pulse 2s infinite;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 215, 0, 0.3);
        border-top: 3px solid var(--accent-gold);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(loadingStyles);
document.body.appendChild(loadingScreen);

// Remove loading screen after page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
}); 