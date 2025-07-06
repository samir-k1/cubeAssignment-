// Header JavaScript with Sliding Search Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get elements with error checking
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let searchActive = false;

    // Check if required elements exist
    if (!searchToggle || !searchInput) {
        console.error('Search elements not found. Make sure elements with IDs "searchToggle" and "searchInput" exist.');
        return;
    }

    // Search Toggle Functionality
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!searchActive) {
            // Open search
            searchInput.classList.add('active');
            searchToggle.classList.add('active');
            searchActive = true;
            
            // Focus on input after animation
            setTimeout(() => {
                searchInput.focus();
            }, 200);
        } else {
            // Close search
            closeSearch();
        }
    });

    // Close search function
    function closeSearch() {
        if (searchInput && searchToggle) {
            searchInput.classList.remove('active');
            searchToggle.classList.remove('active');
            searchActive = false;
            searchInput.value = '';
            searchInput.blur();
        }
    }

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (searchActive && searchToggle && searchInput && 
            !searchToggle.contains(e.target) && !searchInput.contains(e.target)) {
            closeSearch();
        }
    });

    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchActive) {
            closeSearch();
        }
    });

    // Handle search input submission
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchQuery = searchInput.value.trim();
            
            if (searchQuery) {
                // Handle search submission here
                console.log('Searching for:', searchQuery);
                
                // Example: You can redirect to search results page
                // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                
                // Or show a message
                alert(`Searching for: ${searchQuery}`);
                
                // Close search after submission
                closeSearch();
            }
        }
    });

    // Mobile menu toggle functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger lines
            const lines = navToggle.querySelectorAll('.nav__toggle-line');
            if (navMenu.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translateY(7px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                
                // Reset hamburger lines
                const lines = navToggle.querySelectorAll('.nav__toggle-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                
                // Reset hamburger lines
                const lines = navToggle.querySelectorAll('.nav__toggle-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            });
        });
    } else {
        console.warn('Mobile menu elements not found. Navigation toggle may not work on mobile.');
    }

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add background when scrolling
        if (currentScrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Search input real-time validation (optional)
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        // You can add real-time search suggestions here
        if (query.length > 2) {
            // Example: Show search suggestions
            console.log('Search suggestions for:', query);
        }
    });

    // Add smooth focus animation
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-green-dark)';
        });

        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'var(--primary-green)';
        });

        // Prevent search input from closing when clicking on it
        searchInput.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Add loading state for search (optional)
    function showSearchLoading() {
        if (searchToggle) {
            const searchIcon = searchToggle.querySelector('svg');
            if (searchIcon) {
                searchIcon.style.animation = 'spin 1s linear infinite';
            }
        }
    }

    function hideSearchLoading() {
        if (searchToggle) {
            const searchIcon = searchToggle.querySelector('svg');
            if (searchIcon) {
                searchIcon.style.animation = 'none';
            }
        }
    }

    // Add spin animation to CSS if needed
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Initialize header state
    console.log('Header with sliding search initialized successfully!');
});