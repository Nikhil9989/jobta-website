// Mobile menu toggle with improved animation
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.querySelector('i').classList.toggle('fa-bars');
    mobileToggle.querySelector('i').classList.toggle('fa-times');
});

// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Smoother animation with a calculated offset based on header height
            const headerHeight = document.querySelector('#header').offsetHeight;
            const scrollPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            // Add active class to the current nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.querySelector('i').classList.remove('fa-times');
            }
        }
    });
});

// Enhanced header scroll effect with class toggle
const header = document.getElementById('header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Trigger animations for elements in viewport
    animateOnScroll();
});

// Highlight the active section in navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const headerHeight = document.querySelector('#header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Form submission with enhanced feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission with loading state
        const submitButton = this.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Reset form and show success message
            this.reset();
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            // Create success notification
            const notification = document.createElement('div');
            notification.className = 'success-notification';
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! This is a placeholder. In the complete website, this form would be fully functional.';
            document.body.appendChild(notification);
            
            // Auto-remove notification after delay
            setTimeout(() => {
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 300);
                }, 3000);
            }, 100);
        }, 1500);
    });
}

// Enhanced job search placeholder functionality
const jobSearchForm = document.querySelector('.job-search');
if (jobSearchForm) {
    jobSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'info-notification';
        notification.innerHTML = '<i class="fas fa-info-circle"></i> Job search functionality will be available in the upcoming phase!';
        document.body.appendChild(notification);
        
        // Auto-remove notification after delay
        setTimeout(() => {
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }, 100);
    });
    
    // Trigger search on button click
    const searchButton = jobSearchForm.querySelector('button');
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            jobSearchForm.dispatchEvent(new Event('submit'));
        });
    }
}

// Enhanced animation on scroll with intersection observer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .stat-item, .benefit-item, .step-item, .fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0)';
        }
    });
};

// Set up intersection observer for smoother animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .stat-item, .benefit-item, .step-item, .fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right').forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .success-notification, .info-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .success-notification {
        background-color: #28a745;
    }
    
    .info-notification {
        background-color: #5D8AA8;
    }
    
    .success-notification i, .info-notification i {
        margin-right: 10px;
        font-size: 18px;
    }
    
    .success-notification.show, .info-notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #A3A8B2;
    }
    
    .nav-link.active:after {
        width: 100%;
    }
    
    .service-card, .stat-item, .benefit-item, .step-item, 
    .fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right {
        opacity: 0;
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .service-card {
        transform: translateY(30px);
    }
    
    .fade-in-up {
        transform: translateY(30px);
    }
    
    .fade-in-down {
        transform: translateY(-30px);
    }
    
    .fade-in-left {
        transform: translateX(-30px);
    }
    
    .fade-in-right {
        transform: translateX(30px);
    }
    
    .in-view {
        opacity: 1 !important;
        transform: translateY(0) translateX(0) !important;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize animations and stagger them for better visual effect
window.addEventListener('load', () => {
    // First, ensure all elements have transition properties
    document.querySelectorAll('.service-card, .stat-item, .benefit-item, .step-item').forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Then trigger animation
    setTimeout(() => {
        animateOnScroll();
        
        // Start auto-updating active link
        updateActiveNavLink();
    }, 100);
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0)';
        });
    });
    
    // Add interactive effects to benefit items
    document.querySelectorAll('.benefit-item').forEach(item => {
        const icon = item.querySelector('.benefit-icon');
        
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Enhanced form input interactions
    document.querySelectorAll('.form-control').forEach(input => {
        const createFloatingLabel = () => {
            // Check if input already has a label
            if (input.parentElement.querySelector('.floating-label')) return;
            
            const label = document.createElement('span');
            label.className = 'floating-label';
            label.textContent = input.placeholder;
            
            // Insert label before input
            input.parentElement.insertBefore(label, input);
            
            // Add active class if input has value
            if (input.value.trim() !== '') {
                label.classList.add('active');
            }
        };
        
        // Create labels on page load
        createFloatingLabel();
        
        // Add focus and blur event listeners
        input.addEventListener('focus', () => {
            const label = input.parentElement.querySelector('.floating-label');
            if (label) label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            const label = input.parentElement.querySelector('.floating-label');
            if (label && input.value.trim() === '') {
                label.classList.remove('active');
            }
        });
    });
    
    // Add styles for floating labels
    const labelStyles = document.createElement('style');
    labelStyles.textContent = `
        .form-group {
            position: relative;
        }
        
        .floating-label {
            position: absolute;
            top: 15px;
            left: 15px;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
            pointer-events: none;
            transition: all 0.2s ease;
            opacity: 0;
        }
        
        .floating-label.active {
            top: -10px;
            left: 10px;
            font-size: 12px;
            color: #5D8AA8;
            opacity: 1;
        }
        
        .form-control:focus {
            border-color: #5D8AA8;
        }
    `;
    document.head.appendChild(labelStyles);
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        });
    }
    
    // Add custom cursor effect for buttons
    const cursorEffect = document.createElement('div');
    cursorEffect.className = 'cursor-effect';
    document.body.appendChild(cursorEffect);
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            cursorEffect.style.opacity = '1';
            cursorEffect.style.transform = 'scale(1)';
            
            // Update position based on button
            const rect = button.getBoundingClientRect();
            cursorEffect.style.left = `${rect.left + rect.width / 2}px`;
            cursorEffect.style.top = `${rect.top + rect.height / 2}px`;
            cursorEffect.style.width = `${rect.width + 20}px`;
            cursorEffect.style.height = `${rect.height + 20}px`;
        });
        
        button.addEventListener('mouseleave', () => {
            cursorEffect.style.opacity = '0';
            cursorEffect.style.transform = 'scale(0.5)';
        });
    });
    
    // Add cursor effect styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .cursor-effect {
            position: fixed;
            pointer-events: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            mix-blend-mode: difference;
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
            z-index: 9998;
            transition: all 0.3s ease-out;
        }
    `;
    document.head.appendChild(cursorStyles);
});
