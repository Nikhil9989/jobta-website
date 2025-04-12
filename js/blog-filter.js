// Blog Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the blog section to be loaded
    const checkBlogInterval = setInterval(() => {
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            clearInterval(checkBlogInterval);
            initializeBlogFilter();
        }
    }, 100);
});

function initializeBlogFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!filterButtons.length || !blogCards.length) return;
    
    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter blog cards
            blogCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // Show the card with animation
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide the card with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize blog cards with animation
    blogCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Add delay for staggered animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Initialize pagination functionality (simplified for demo)
    const paginationItems = document.querySelectorAll('.pagination-item');
    
    if (paginationItems.length) {
        paginationItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all pagination items
                paginationItems.forEach(pItem => pItem.classList.remove('active'));
                
                // Add active class to clicked pagination item
                this.classList.add('active');
                
                // Here you would typically fetch and display different blog posts
                // For demonstration, we'll just scroll to the top of the blog section
                document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
}