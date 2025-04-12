// Modal Handlers and Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the modals to be loaded
    const checkModalsInterval = setInterval(() => {
        if (document.getElementById('post-job-modal') && 
            document.getElementById('submit-resume-modal') && 
            document.querySelector('.chatbot-toggle')) {
            clearInterval(checkModalsInterval);
            initializeModals();
            initializeChatbot();
        }
    }, 100);
});

function initializeModals() {
    // Make sure all modal components are loaded
    const postJobModal = document.getElementById('post-job-modal');
    const submitResumeModal = document.getElementById('submit-resume-modal');
    
    if (!postJobModal || !submitResumeModal) return;
    
    // Handle modal close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
            
            document.querySelectorAll('.chatbot-modal.show').forEach(chatbot => {
                chatbot.classList.remove('show');
            });
        }
    });
    
    // Add animation for form inputs
    const formInputs = document.querySelectorAll('.modal .form-control, .contact-form .form-control');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        // Remove focus effect if input is empty
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.form-group').classList.remove('focused');
            }
        });
        
        // Set initial state if input has value
        if (input.value) {
            input.closest('.form-group').classList.add('focused');
        }
    });
    
    // File input handling for resume upload
    const resumeUpload = document.getElementById('resume-upload');
    
    if (resumeUpload) {
        resumeUpload.addEventListener('change', function() {
            const fileName = this.files[0]?.name;
            const fileSize = this.files[0]?.size;
            const maxSize = 5 * 1024 * 1024; // 5MB
            const uploadNote = this.nextElementSibling;
            
            if (fileName) {
                if (fileSize > maxSize) {
                    uploadNote.textContent = 'File too large (max 5MB). Please select a smaller file.';
                    uploadNote.style.color = '#e74c3c';
                    this.value = ''; // Reset file input
                } else {
                    uploadNote.textContent = `Selected: ${fileName}`;
                    uploadNote.style.color = '#5D8AA8';
                }
            } else {
                uploadNote.textContent = 'Max file size: 5MB';
                uploadNote.style.color = '#777';
            }
        });
    }
}

function initializeChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotModal = document.getElementById('chatbot-modal');
    
    if (!chatbotToggle || !chatbotModal) return;
    
    // Add basic chatbot functionality
    const chatbotInput = chatbotModal.querySelector('.chatbot-input input');
    const chatbotButton = chatbotModal.querySelector('.chatbot-input button');
    const chatbotMessages = chatbotModal.querySelector('.chatbot-messages');
    
    // Sample responses for the chatbot
    const botResponses = [
        "Thanks for your message! A recruitment specialist will get back to you shortly.",
        "That's a great question. We have several opportunities that might fit your skills.",
        "I'd be happy to help you with your job search. Could you tell me more about your experience?",
        "Our team is here to help you find the perfect role. What skills are you looking to leverage?",
        "Thank you for your interest in our services. How can we assist you with your job search or hiring needs?"
    ];
    
    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        // Add avatar for bot messages
        if (!isUser) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            const avatarImg = document.createElement('img');
            avatarImg.src = 'images/bot-avatar.png';
            avatarImg.alt = 'Chatbot';
            avatarDiv.appendChild(avatarImg);
            messageDiv.appendChild(avatarDiv);
        }
        
        // Add message content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        const paragraph = document.createElement('p');
        paragraph.textContent = content;
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);
        
        // Add message to chat and scroll to bottom
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Animate message
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Function to handle user message
    function handleUserMessage() {
        const userMessage = chatbotInput.value.trim();
        
        if (userMessage) {
            // Add user message to chat
            addMessage(userMessage, true);
            
            // Clear input
            chatbotInput.value = '';
            
            // Simulate typing delay
            const typingDelay = Math.floor(Math.random() * 1500) + 500;
            
            setTimeout(() => {
                // Get random response
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                
                // Add bot response to chat
                addMessage(randomResponse);
            }, typingDelay);
        }
    }
    
    // Handle send button click
    chatbotButton.addEventListener('click', handleUserMessage);
    
    // Handle enter key press
    chatbotInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}