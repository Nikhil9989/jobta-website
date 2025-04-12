// Sections Loader
document.addEventListener('DOMContentLoaded', function() {
    // Array of section IDs and their corresponding HTML files
    const sections = [
        { id: 'about-section', file: 'sections/about.html' },
        { id: 'services-section', file: 'sections/services.html' },
        { id: 'employers-section', file: 'sections/employers.html' },
        { id: 'job-seekers-section', file: 'sections/job-seekers.html' },
        { id: 'job-board-section', file: 'sections/job-board.html' },
        { id: 'blog-section', file: 'sections/blog.html' },
        { id: 'contact-section', file: 'sections/contact.html' },
        { id: 'footer-section', file: 'sections/footer.html' },
        { id: 'modals-container', file: 'sections/modals.html' }
    ];

    // Function to fetch and load a section
    async function loadSection(sectionId, file) {
        try {
            const response = await fetch(file);
            if (response.ok) {
                const html = await response.text();
                document.getElementById(sectionId).innerHTML = html;
            } else {
                console.error(`Error loading ${file}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Failed to load ${file}:`, error);
        }
    }

    // Load all sections
    sections.forEach(section => {
        loadSection(section.id, section.file);
    });

    // Once all sections are loaded, initialize any components or behaviors
    // This is a simplified approach; in a production environment, you might want to 
    // implement a more robust approach to ensure all content is loaded before initializing
    setTimeout(() => {
        initializeComponents();
    }, 500);
});

// Initialize components after all sections are loaded
function initializeComponents() {
    // Initialize modal triggers
    document.querySelectorAll('.post-job-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('post-job-modal').classList.add('show');
        });
    });

    document.querySelectorAll('.submit-resume-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('submit-resume-modal').classList.add('show');
        });
    });

    // Initialize modal close buttons
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });

    // Close modal when clicking outside of it
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });

    // Initialize chatbot
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeChat = document.querySelector('.close-chatbot');
    
    if (chatbotToggle && chatbotModal) {
        chatbotToggle.addEventListener('click', function() {
            chatbotModal.classList.add('show');
        });
    }
    
    if (closeChat && chatbotModal) {
        closeChat.addEventListener('click', function() {
            chatbotModal.classList.remove('show');
        });
    }

    // Handle form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.innerText;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                
                // Create notification
                const notification = document.createElement('div');
                notification.className = 'success-notification';
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your submission has been received.';
                document.body.appendChild(notification);
                
                // Show notification with animation
                setTimeout(() => {
                    notification.classList.add('show');
                    
                    // Hide notification after delay
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(notification);
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            
                            // Close modal if submission was successful
                            const modal = this.closest('.modal');
                            if (modal) {
                                modal.classList.remove('show');
                            }
                        }, 300);
                    }, 3000);
                }, 100);
            }, 1500);
        });
    });
}