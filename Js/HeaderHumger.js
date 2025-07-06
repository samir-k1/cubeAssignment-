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

// DOM Elements
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const header = document.querySelector('.header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Search functionality
let isSearchActive = false;

function openSearch() {
    isSearchActive = true;
    searchContainer.classList.add('active');
    header.classList.add('search-active');
    searchToggle.classList.add('active');
    
    // Focus on search input after animation completes
    setTimeout(() => {
        searchInput.focus();
    }, 400);
    
    // Add event listener for escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeSearch() {
    isSearchActive = false;
    searchContainer.classList.remove('active');
    header.classList.remove('search-active');
    searchToggle.classList.remove('active');
    
    // Clear search input
    searchInput.value = '';
    
    // Remove event listener for escape key
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape' && isSearchActive) {
        closeSearch();
    }
}

// Event listeners for search
searchToggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (isSearchActive) {
        closeSearch();
    } else {
        openSearch();
    }
});

searchClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeSearch();
});

// Handle search form submission
const searchForm = document.querySelector('.search__input-group');
const searchSubmit = document.querySelector('.search__submit');

searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    handleSearch();
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
    }
});

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Add your search logic here
        console.log('Searching for:', searchTerm);
        
        // Example: You can redirect to search results page
        // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        
        // Or show a notification
        showSearchNotification(searchTerm);
    }
}

function showSearchNotification(searchTerm) {
    // Create a simple notification
    const notification = document.createElement('div');
    // notification.style.cssText = `
    //     position: fixed;
    //     top: 20px;
    //     right: 20px;
    //     background: var(--primary-green);
    //     color: white;
    //     padding: 1rem 1.5rem;
    //     border-radius: var(--radius-md);
    //     box-shadow: var(--shadow-soft);
    //     z-index: 1000;
    //     animation: slideIn 0.3s ease;
    // `;
    notification.textContent = `Searching for: "${searchTerm}"`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles for notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Mobile menu functionality
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (isSearchActive && 
        !searchContainer.contains(e.target) && 
        !searchToggle.contains(e.target)) {
        closeSearch();
    }
});

// Prevent search container clicks from closing the search
searchContainer.addEventListener('click', (e) => {
    e.stopPropagation();
});

// // Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('GTG Navigation initialized');
    
    // Add staggered animation delay to nav items
    const navItems = document.querySelectorAll('.nav__menu li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
});

 /// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements - check if they exist
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.querySelector('.nav__search-container');
    
    // Only proceed if elements exist
    if (!searchToggle || !searchInput) {
        console.warn('Search elements not found');
        return;
    }
    
    // Toggle search function
    function toggleSearch() {
        if (searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
        } else {
            searchInput.classList.add('active');
            searchInput.focus();
        }
    }
    
    // Close search function
    function closeSearch() {
        if (searchInput) {
            searchInput.classList.remove('active');
        }
    }
    
    // Search toggle click event
    searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleSearch();
    });
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        // Check if searchContainer exists and if click is outside
        if (searchContainer && !searchContainer.contains(e.target)) {
            closeSearch();
        }
    });
    
    // Handle Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Add your search logic here
                // closeSearch(); // Uncomment if you want to close after search
            }
        }
    });
    
    // Handle Escape key to close
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
    
});
