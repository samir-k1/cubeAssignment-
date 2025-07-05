// Use a unique name for the observer to avoid conflicts
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            section.classList.add('animate');
            
            // Animate stat items
            const statItems = section.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                item.classList.add('animate');
            });
            
            // Animate numbers - THIS IS THE KEY PART!
            const numbers = section.querySelectorAll('.stat-number');
            numbers.forEach(number => {
                animateNumber(number);
            });
            
            // Unobserve after animation
            statsObserver.unobserve(section);
        }
    });
}, {
    threshold: 0.3
});

// Observe the stats section when page loads
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Number animation function - THIS MAKES THE NUMBERS COUNT UP!
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}