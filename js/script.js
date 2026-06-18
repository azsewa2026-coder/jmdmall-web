/* =============================================
   JMD MALL - MAIN JAVASCRIPT FILE
   Handles interactivity and functionality
   ============================================= */

// =============================================
// 1. MOBILE MENU TOGGLE
// =============================================

// Get DOM elements for navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Open/Close mobile menu when hamburger is clicked
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = event.target.closest('.nav-container');
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// =============================================
// 2. ACTIVE PAGE DETECTION
// =============================================

// Get current page filename
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// =============================================
// 3. SEARCH FUNCTIONALITY
// =============================================

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Search button click event
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
}

// Search on Enter key press
if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

// Perform search function
function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        alert('Please enter a search term');
        return;
    }
    
    // In a real application, this would redirect to a search results page
    // or make an API call to fetch search results
    console.log('Searching for: ' + searchTerm);
    alert('Search functionality would be implemented here.\nYou searched for: ' + searchTerm);
}

// =============================================
// 4. CATEGORY CARD INTERACTIONS
// =============================================

const categoryCards = document.querySelectorAll('.category-card');

// Add click event to category cards
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        console.log('Category selected: ' + categoryName);
        // In a real app, this would redirect to a category page
        alert('Welcome to ' + categoryName + '!\nCategory browsing would be implemented here.');
    });
});

// =============================================
// 5. CONTACT FORM HANDLING
// =============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real application, this would send the data to a server
        // For now, we'll just simulate successful submission
        console.log({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        });
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 3000);
    });
}

// Show form message (success or error)
function showFormMessage(messageText, type) {
    if (formMessage) {
        formMessage.textContent = messageText;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =============================================
// 6. CTA BUTTON FUNCTIONALITY
// =============================================

const ctaBtn = document.querySelector('.cta-btn');

if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        // Scroll to categories section
        const categoriesSection = document.querySelector('.categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// =============================================
// 7. CATEGORY LINK CLICK HANDLER
// =============================================

const categoryLinks = document.querySelectorAll('.category-link');

categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const categoryName = link.closest('.category-card').querySelector('h3').textContent;
        alert('Explore ' + categoryName + '\n\nThis functionality would be implemented in a full application.');
    });
});

// =============================================
// 8. SMOOTH SCROLL ENHANCEMENT
// =============================================

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href === '#') {
            event.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================
// 9. SCROLL ANIMATIONS
// =============================================

// Observe elements for scroll animation
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply to category cards and value cards
    const animatedElements = document.querySelectorAll('.category-card, .value-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// =============================================
// 10. UTILITY FUNCTIONS
// =============================================

// Log page information (for debugging)
function logPageInfo() {
    console.log('Page Information:');
    console.log('Current URL: ' + window.location.href);
    console.log('Page Title: ' + document.title);
    console.log('Current Time: ' + new Date().toLocaleString());
}

// Call on page load
window.addEventListener('load', () => {
    logPageInfo();
    console.log('JMD Mall website loaded successfully!');
});

// =============================================
// 11. ACCESSIBILITY ENHANCEMENTS
// =============================================

// Add keyboard navigation support
document.addEventListener('keydown', (event) => {
    // Close mobile menu on Escape key
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// =============================================
// 12. LOCAL STORAGE FOR USER PREFERENCES
// =============================================

// Save search history (simple example)
function saveSearchHistory(searchTerm) {
    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    // Keep only last 5 searches
    if (history.length >= 5) {
        history.pop();
    }
    
    // Add new search at the beginning
    if (!history.includes(searchTerm)) {
        history.unshift(searchTerm);
    }
    
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// =============================================
// END OF SCRIPT
// =============================================
