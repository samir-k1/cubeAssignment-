   function toggleMobileMenu() {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
        
        // Initialize mobile menu
        document.addEventListener('DOMContentLoaded', toggleMobileMenu);
        
        // Accordion functionality
        function toggleAccordion(header) {
            const accordionItem = header.parentElement;
            const content = accordionItem.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');
            
            // Close all other accordion items
            const allAccordionItems = document.querySelectorAll('.accordion-item');
            allAccordionItems.forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').classList.remove('active');
                    item.querySelector('.accordion-icon').textContent = '+';
                }
            });
            
            // Toggle current accordion item
            accordionItem.classList.toggle('active');
            content.classList.toggle('active');
            
            // Update icon
            if (content.classList.contains('active')) {
                icon.textContent = '−';
            } else {
                icon.textContent = '+';
            }
        }

        const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Stagger animation delays
document.querySelectorAll('.slide-in-stagger').forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
        child.style.setProperty('--i', index);
    });
});

// Set animation delays for stats and features
document.querySelectorAll('.hero__stat').forEach((stat, index) => {
    stat.style.setProperty('--i', index);
});

document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.setProperty('--i', index);
});

document.querySelectorAll('.stat-item').forEach((item, index) => {
    item.style.setProperty('--i', index);
});

document.querySelectorAll('.accordion-item').forEach((item, index) => {
    item.style.setProperty('--i', index);
});

document.querySelectorAll('.nav__menu li').forEach((item, index) => {
    item.style.setProperty('--i', index);
});