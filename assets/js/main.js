// ZeroReport MVP JavaScript

// Client email to folder mapping
const clientMapping = {
    'john@example.com': 'JohnDoe',
    'jane@example.com': 'JaneDoe'
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'login.html':
            initLoginPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        default:
            initGeneralPage();
            break;
    }
});

// Initialize Login Page
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('login-message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Add demo account click handlers
    const demoEmails = document.querySelectorAll('.demo-credentials p');
    demoEmails.forEach(email => {
        email.style.cursor = 'pointer';
        email.addEventListener('click', function() {
            const emailInput = document.getElementById('loginEmail');
            if (emailInput) {
                emailInput.value = this.textContent.trim();
                emailInput.focus();
            }
        });
    });
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.toLowerCase().trim();
    const messageEl = document.getElementById('login-message');
    
    // Clear previous messages
    messageEl.style.display = 'none';
    messageEl.className = 'login-message';
    
    // Validate email format
    if (!isValidEmail(email)) {
        showLoginMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Check if email exists in our client mapping
    if (clientMapping[email]) {
        const clientFolder = clientMapping[email];
        showLoginMessage('Redirecting to your dashboard...', 'success');
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = `client_reports/${clientFolder}/index.html`;
        }, 1500);
    } else {
        showLoginMessage('Access denied. Please check your email address or contact support.', 'error');
    }
}

// Show Login Message
function showLoginMessage(message, type) {
    const messageEl = document.getElementById('login-message');
    messageEl.textContent = message;
    messageEl.className = `login-message ${type}`;
    messageEl.style.display = 'block';
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}

// Initialize Contact Page
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Handle Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const messageEl = document.getElementById('form-message');
    
    // Clear previous messages
    messageEl.style.display = 'none';
    messageEl.className = 'form-message';
    
    // Basic validation
    if (!name || !email || !message) {
        showContactMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showContactMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (in real app, this would send to backend)
    showContactMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form after successful submission
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        messageEl.style.display = 'none';
    }, 3000);
}

// Show Contact Message
function showContactMessage(message, type) {
    const messageEl = document.getElementById('form-message');
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';
}

// Initialize General Page
function initGeneralPage() {
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add loading animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .view-report-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading state if it's not a same-page anchor
            if (!this.getAttribute('href').startsWith('#')) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Reset after navigation or timeout
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add some interactive elements on page load
function addInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .report-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('button, .cta-button, .view-report-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize interactive elements
document.addEventListener('DOMContentLoaded', addInteractiveElements);

// Console welcome message
console.log('%c🚀 ZeroReport MVP Loaded!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cDemo accounts: john@example.com, jane@example.com', 'color: #666; font-size: 12px;');

