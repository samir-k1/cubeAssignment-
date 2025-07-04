// Product Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Subscription Options Handler
    const subscriptionOptions = document.querySelectorAll('.productSection__option');
    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
    const optionContents = document.querySelectorAll('.productSection__option-content');
    
    // Handle subscription option changes
    subscriptionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove active class from all options
            subscriptionOptions.forEach(option => {
                option.classList.remove('productSection__option--selected');
            });
            
            // Remove active class from all content areas
            optionContents.forEach(content => {
                content.classList.remove('productSection__option-content--active');
            });
            
            // Add active class to selected option
            const selectedOption = this.closest('.productSection__option');
            selectedOption.classList.add('productSection__option--selected');
            
            // Show corresponding content
            const optionType = selectedOption.dataset.option;
            const contentElement = document.getElementById(optionType + '-content');
            
            if (contentElement) {
                // Add active class with slight delay for smooth transition
                setTimeout(() => {
                    contentElement.classList.add('productSection__option-content--active');
                }, 50);
            }
        });
    });
    
    // Image Gallery Handler
    const mainImage = document.querySelector('.productSection__main-img');
    const thumbnails = document.querySelectorAll('.productSection__thumb');
    const prevBtn = document.querySelector('.productSection__nav-btn--prev');
    const nextBtn = document.querySelector('.productSection__nav-btn--next');
    const dots = document.querySelectorAll('.productSection__dot');
    
    let currentImageIndex = 0;
    const images = [
        'assets/MainingredientImg copy.png',
        'assets/img1.png',
        'assets/img2.png',
        'assets/img3.png'
    ];
    
    // Update main image
    function updateMainImage(index) {
        if (index >= 0 && index < images.length) {
            mainImage.src = images[index];
            currentImageIndex = index;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('productSection__dot--active', i === index);
            });
        }
    }
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        updateMainImage(newIndex);
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        updateMainImage(newIndex);
    });
    
    // Thumbnail clicks
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            updateMainImage(index);
        });
    });
    
    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            updateMainImage(index);
        });
    });
    
    // Fragrance Selection Handler
    const fragranceOptions = document.querySelectorAll('.productSection__fragrance-option input[type="radio"]');
    const includedImages = document.querySelectorAll('.productSection__included-img');
    
    fragranceOptions.forEach(option => {
        option.addEventListener('change', function() {
            const selectedFragrance = this.id.replace('-double', '').replace('-try', '');
            const fragranceImage = `assets/${selectedFragrance}.png`;
            
            // Update included images based on selected fragrance
            includedImages.forEach(img => {
                if (img.alt.includes('Monthly') || img.alt.includes('One Time')) {
                    img.src = fragranceImage;
                }
            });
        });
    });
    
    // Auto-slide functionality (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
            updateMainImage(nextIndex);
        }, 5000); // Change image every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    const gallery = document.querySelector('.productSection__gallery');
    gallery.addEventListener('mouseenter', stopAutoSlide);
    gallery.addEventListener('mouseleave', startAutoSlide);
    
    // Add to Cart Handler
    const addToCartBtn = document.querySelector('.productSection__add-to-cart');
    
    addToCartBtn.addEventListener('click', function() {
        // Get selected subscription
        const selectedSubscription = document.querySelector('input[name="subscription"]:checked');
        const subscriptionType = selectedSubscription ? selectedSubscription.id : 'single';
        
        // Get selected fragrance
        const selectedFragrance = document.querySelector('input[name^="fragrance"]:checked');
        const fragranceType = selectedFragrance ? selectedFragrance.id.replace('-double', '').replace('-try', '') : 'citrus';
        
        // Add loading state
        addToCartBtn.innerHTML = 'Adding...';
        addToCartBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            addToCartBtn.innerHTML = 'Add to Cart';
            addToCartBtn.disabled = false;
            
            // Show success message (you can customize this)
            alert(`Added ${subscriptionType} subscription with ${fragranceType} fragrance to cart!`);
        }, 1500);
    });
    
    // Smooth scrolling for better UX
    function smoothTransition(element, property, from, to, duration) {
        const start = performance.now();
        const change = to - from;
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeInOutQuad = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
            
            const currentValue = from + change * easeInOutQuad;
            element.style[property] = currentValue + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Enhanced option selection with smooth animations
    subscriptionOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio && !radio.checked) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const mainImageContainer = document.querySelector('.productSection__main-image');
    
    mainImageContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mainImageContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextBtn.click();
            } else {
                // Swipe right - previous image
                prevBtn.click();
            }
        }
    }
});