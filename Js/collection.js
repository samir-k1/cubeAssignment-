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

            const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for scroll animations
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

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Auto-add animate-on-scroll class to subscription section
  const subscriptionSection = document.querySelector('.subscription-section');
  if (subscriptionSection) {
    subscriptionSection.classList.add('animate-on-scroll');
  }

  // Auto-add animate-on-scroll class to feature cards
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.classList.add('animate-on-scroll');
    card.style.transitionDelay = `${0.1 * index}s`;
  });
});


        }

           const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll(
                '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-fade-in, .animate-scale, .animate-stagger'
            );
            
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        });

        // Add click handlers for interactive elements
        document.querySelectorAll('.nav-arrow').forEach(arrow => {
            arrow.addEventListener('click', () => {
                document.querySelectorAll('.nav-arrow').forEach(a => a.classList.remove('active'));
                arrow.classList.add('active');
            });
        });

        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });

        

        
        