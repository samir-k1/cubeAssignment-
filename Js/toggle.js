// Navigation Module
const NavigationModule = (function() {
    'use strict';
    
    // Private variables
    let navToggle, navMenu, navLinks, searchInput, searchToggle;
    
    // Private methods
    function initializeElements() {
        navToggle = document.getElementById('navToggle');
        navMenu = document.getElementById('navMenu');
        navLinks = document.querySelectorAll('.nav__link');
        searchInput = document.getElementById('searchInput');
        searchToggle = document.getElementById('searchToggle');
    }
    
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function initializeEventListeners() {
        // Toggle mobile menu
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Close menu when clicking on navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navToggle && navMenu && 
                !navToggle.contains(event.target) && 
                !navMenu.contains(event.target)) {
                closeMobileMenu();
            }
        });
        
        // Search functionality
        if (searchToggle && searchInput) {
            searchToggle.addEventListener('click', function() {
                searchInput.focus();
            });
            
            searchInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm) {
                        alert(`Searching for: ${searchTerm}`);
                        // Here you would typically send the search query to your backend
                    }
                }
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    }
    
    // Public API
    return {
        init: function() {
            initializeElements();
            initializeEventListeners();
        },
        
        // Public methods for external control
        openMenu: function() {
            if (navToggle && navMenu) {
                navToggle.classList.add('active');
                navMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        },
        
        closeMenu: closeMobileMenu
    };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    NavigationModule.init();
});