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
    initGallery();
    initLightbox();
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
    const progressBar = document.querySelector('.progress-bar');
    
    let isPlaying = false;
    let audio = null;
    
    // Create audio element
    function createAudio() {
        if (!audio) {
            // Try to load audio file, but fallback to placeholder if not available
            try {
                audio = new Audio('assets/audio/hero-audio.mp3');
                audio.addEventListener('loadedmetadata', function() {
                    updateTimeDisplay();
                });
                audio.addEventListener('timeupdate', function() {
                    updateProgress();
                    updateTimeDisplay();
                });
                audio.addEventListener('ended', function() {
                    resetAudio();
                });
                audio.addEventListener('error', function() {
                    console.log('Audio file not found, using placeholder');
                    // Fallback to placeholder functionality
                    initPlaceholderAudio();
                });
            } catch (error) {
                console.log('Audio creation failed, using placeholder');
                initPlaceholderAudio();
            }
        }
    }
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }
    
    // Progress bar click functionality
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            if (!audio) return;
            
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const clickPercent = clickX / width;
            
            audio.currentTime = clickPercent * audio.duration;
        });
    }

    function playAudio() {
        createAudio();
        
        if (audio && audio.src) {
            audio.play().then(() => {
                isPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playBtn.style.background = 'var(--accent-purple)';
            }).catch(error => {
                console.log('Audio play failed:', error);
                initPlaceholderAudio();
            });
        } else {
            // Use placeholder audio if no real audio is available
            initPlaceholderAudio();
        }
    }

    function pauseAudio() {
        if (audio) {
            audio.pause();
        }
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.background = 'var(--accent-gold)';
    }

    function resetAudio() {
        if (audio) {
            audio.currentTime = 0;
        }
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.background = 'var(--accent-gold)';
        updateProgress();
    }

    function updateProgress() {
        if (!audio || !audio.duration) return;
        
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
    }

    function updateTimeDisplay() {
        if (!audio || !audio.duration) {
            timeDisplay.textContent = '0:00 / 0:00';
            return;
        }
        
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60);
        
        timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    }
    
    // Placeholder functionality when audio file is not available
    function initPlaceholderAudio() {
        let currentTime = 0;
        let duration = 180; // 3 minutes
        let progressInterval = null;
        
        function playPlaceholder() {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.style.background = 'var(--accent-purple)';
            
            progressInterval = setInterval(() => {
                if (isPlaying && currentTime < duration) {
                    currentTime++;
                    updatePlaceholderProgress();
                } else {
                    clearInterval(progressInterval);
                    if (currentTime >= duration) {
                        resetPlaceholder();
                    }
                }
            }, 1000);
        }
        
        function pausePlaceholder() {
            isPlaying = false;
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.style.background = 'var(--accent-gold)';
        }
        
        function updatePlaceholderProgress() {
            const progress = (currentTime / duration) * 100;
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = currentTime % 60;
            const totalMinutes = Math.floor(duration / 60);
            const totalSeconds = duration % 60;
            
            if (timeDisplay) {
                timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
            }
        }
        
        function resetPlaceholder() {
            isPlaying = false;
            currentTime = 0;
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.style.background = 'var(--accent-gold)';
            updatePlaceholderProgress();
        }
        
        // Override play/pause functions
        const originalPlay = playAudio;
        const originalPause = pauseAudio;
        
        playAudio = function() {
            if (audio && audio.src) {
                originalPlay();
            } else {
                if (isPlaying) {
                    pausePlaceholder();
                } else {
                    playPlaceholder();
                }
            }
        };
        
        pauseAudio = function() {
            if (audio && audio.src) {
                originalPause();
            } else {
                pausePlaceholder();
            }
        };
        
        // Initialize placeholder display
        updatePlaceholderProgress();
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

// Optimized image loading - skip lazy loading for faster initial load
// All images are loaded immediately for better performance

// Optimized loading - remove loading screen for faster loading
// The page will load immediately without waiting for all resources

// Gallery functionality
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more images
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Зареждане...';
            
            setTimeout(() => {
                // Add more gallery items here
                const galleryGrid = document.querySelector('.gallery-grid');
                const newItems = [
                    {
                        category: 'concerts',
                        image: 'https://via.placeholder.com/400x300/9b59b6/ffffff?text=Концерт+3',
                        title: 'Зимен концерт',
                        description: 'Празнични мелодии'
                    },
                    {
                        category: 'rehearsals',
                        image: 'https://via.placeholder.com/400x300/1abc9c/ffffff?text=Репетиция+3',
                        title: 'Индивидуална репетиция',
                        description: 'Работа върху техника'
                    }
                ];
                
                newItems.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.dataset.category = item.category;
                    galleryItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <div class="gallery-info">
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                            </div>
                            <button class="gallery-zoom">
                                <i class="fas fa-search-plus"></i>
                            </button>
                        </div>
                    `;
                    galleryGrid.appendChild(galleryItem);
                });
                
                this.innerHTML = '<i class="fas fa-images"></i> Зареди още';
                showNotification('Добавени са нови изображения!', 'success');
            }, 1500);
        });
    }
}

// Lightbox functionality
function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let galleryImages = [];
    
    // Collect all gallery images
    function collectGalleryImages() {
        const items = document.querySelectorAll('.gallery-item');
        galleryImages = Array.from(items).map(item => ({
            src: item.querySelector('img').src,
            title: item.querySelector('.gallery-info h4').textContent,
            description: item.querySelector('.gallery-info p').textContent
        }));
    }
    
    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        const image = galleryImages[index];
        
        lightboxImage.src = image.src;
        lightboxCaption.querySelector('h4').textContent = image.title;
        lightboxCaption.querySelector('p').textContent = image.description;
        
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(currentImageIndex);
    }
    
    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openLightbox(currentImageIndex);
    }
    
    // Event listeners
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-zoom')) {
            collectGalleryImages();
            const galleryItem = e.target.closest('.gallery-item');
            const index = Array.from(document.querySelectorAll('.gallery-item')).indexOf(galleryItem);
            openLightbox(index);
        }
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    // Close on background click
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
} 