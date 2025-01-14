// Smooth scrolling for navigation links
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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
navbar.style.transform = 'translateY(0)';  // Always show navbar

// Typewriter animation
function typeWriter(element, text, speed = 20) {  
    const typingElement = element.querySelector('.typing');
    const cursorElement = element.querySelector('.cursor');
    let i = 0;
    typingElement.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            typingElement.textContent = text.substring(0, i + 1);
            // Move cursor to the end of the typed text
            typingElement.appendChild(cursorElement);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Handle newsletter subscription
function handleSubscribe(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button');
    const email = form.querySelector('input[type="email"]').value;
    
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    
    // Show success state
    button.textContent = 'Subscribed!';
    button.classList.add('subscribed');
    form.reset();
    
    setTimeout(() => {
        button.textContent = '';
        button.classList.remove('subscribed');
    }, 2000);
    
    return false;
}

// Copy code to clipboard
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    if (!codeElement) return;
    
    const text = codeElement.textContent;
    const button = codeElement.closest('.code-block').querySelector('.copy-button');
    const icon = button.querySelector('i');
    
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        
        // Reset after 2 seconds
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Visual feedback for error
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-times');
        
        setTimeout(() => {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-copy');
        }, 2000);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to features on scroll
    const features = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'all 0.6s ease-out';
        observer.observe(feature);
    });

    // Initialize typewriter
    const subtitle = document.querySelector('.typewriter');
    
    if (subtitle) {
        const text = "Kusion is an open-source tool that simplifies the management of infrastructure and Kubernetes resources into a single and collaborative workflow.";
        typeWriter(subtitle, text);
    }

    // Scroll animation for use case cards
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Once animated, no need to observe anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });

        const cards = document.querySelectorAll('.use-case-card');
        cards.forEach(card => {
            observer.observe(card);
        });
    };

    setTimeout(observeElements, 100); // Small delay to ensure DOM is fully ready

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
});
