<script>
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        // Toggle the mobile menu visibility
        navMenu.classList.toggle('show-menu');
        // Toggle the hamburger animation
        this.classList.toggle('active');
    });
});
</script>