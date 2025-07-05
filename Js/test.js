class TestimonialsSlider {
    constructor() {
        this.container = document.getElementById('testimonialsContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('testimonialsDotsContainer');
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalCards = this.container.children.length;
        this.maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.updateSlider();
        this.bindEvents();
        this.handleResize();
    }
    
    getCardsPerView() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 768) return 1;
        if (windowWidth <= 1024) return 2;
        return 3;
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        const totalDots = this.maxIndex + 1;
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateSlider() {
        // Calculate the offset based on card width and gap
        const cardWidth = this.container.children[0].offsetWidth;
        const gap = 30; // Match the CSS gap
        const offset = -(this.currentIndex * (cardWidth + gap));
        
        this.container.style.transform = `translateX(${offset}px)`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
        
        // Update active button state
        this.prevBtn.classList.toggle('active', this.currentIndex > 0);
        this.nextBtn.classList.toggle('active', this.currentIndex < this.maxIndex);
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        this.updateSlider();
    }
    
    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateSlider();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }
    
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling
        });
        
        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide(); // Swipe left - go to next
                } else {
                    this.prevSlide(); // Swipe right - go to previous
                }
            }
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            // Debounce resize events
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                    this.maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
                    
                    // Adjust current index if needed
                    if (this.currentIndex > this.maxIndex) {
                        this.currentIndex = this.maxIndex;
                    }
                    
                    this.createDots();
                    this.updateSlider();
                }
            }, 250);
        });
    }
    
    // Auto-play functionality (optional)
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateSlider();
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // Pause auto-play on hover
    pauseOnHover() {
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slider = new TestimonialsSlider();
    
    // Uncomment the following lines to enable auto-play
    // slider.startAutoPlay(4000); // Auto-play every 4 seconds
    // slider.pauseOnHover(); // Pause on hover
});

// Optional: Add scroll-triggered animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);