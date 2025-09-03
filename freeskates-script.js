// Freeskates Website JavaScript

// Function to redirect to the coupon website
function redirectToCoupons() {
    // This will redirect to the JMK Coupons website
    window.open('index.html', '_blank');
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializePagination();
    initializeViewToggle();
    addCartFunctionality();
    addHoverEffects();
});

// Initialize filter functionality
function initializeFilters() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

// Sort products based on selected criteria
function sortProducts(criteria) {
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    
    productCards.sort((a, b) => {
        switch(criteria) {
            case 'price-low':
                return getPrice(a) - getPrice(b);
            case 'price-high':
                return getPrice(b) - getPrice(a);
            case 'name':
                return getName(a).localeCompare(getName(b));
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    productCards.forEach(card => productsGrid.appendChild(card));
    
    // Add animation
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Helper function to get price from product card
function getPrice(card) {
    const priceText = card.querySelector('.product-price').textContent;
    return parseFloat(priceText.replace(/[^0-9,]/g, '').replace(',', '.'));
}

// Helper function to get name from product card
function getName(card) {
    return card.querySelector('.product-name').textContent;
}

// Initialize pagination functionality
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.disabled) {
                // Remove active class from all buttons
                pageButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button (if it's a number)
                if (!this.classList.contains('prev') && !this.classList.contains('next')) {
                    this.classList.add('active');
                }
                
                // Handle prev/next functionality
                if (this.classList.contains('next')) {
                    const activeBtn = document.querySelector('.page-btn.active');
                    const nextBtn = activeBtn.nextElementSibling;
                    if (nextBtn && !nextBtn.classList.contains('next')) {
                        activeBtn.classList.remove('active');
                        nextBtn.classList.add('active');
                    }
                } else if (this.classList.contains('prev')) {
                    const activeBtn = document.querySelector('.page-btn.active');
                    const prevBtn = activeBtn.previousElementSibling;
                    if (prevBtn && !prevBtn.classList.contains('prev')) {
                        activeBtn.classList.remove('active');
                        prevBtn.classList.add('active');
                    }
                }
                
                // Simulate page load
                showPageTransition();
            }
        });
    });
}

// Initialize view toggle functionality
function initializeViewToggle() {
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productsGrid = document.querySelector('.products-grid');
    
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', function() {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            productsGrid.classList.remove('list-view');
            productsGrid.classList.add('grid-view');
        });
        
        listViewBtn.addEventListener('click', function() {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            productsGrid.classList.add('list-view');
            productsGrid.classList.remove('grid-view');
        });
    }
}

// Add cart functionality
function addCartFunctionality() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;
    
    // Add click handlers to all add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent the redirectToCoupons function if we want to add cart animation first
            e.preventDefault();
            
            // Add cart animation
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Update cart count
            itemCount++;
            cartCount.textContent = itemCount;
            
            // Add animation to cart
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
            
            // Show success message
            showAddToCartMessage(productName);
            
            // After animation, redirect to coupons
            setTimeout(() => {
                redirectToCoupons();
            }, 1000);
        });
    });
}

// Show add to cart message
function showAddToCartMessage(productName) {
    // Create message element
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.textContent = `${productName} added to cart!`;
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 2000);
}

// Show page transition effect
function showPageTransition() {
    const productsGrid = document.querySelector('.products-grid');
    
    productsGrid.style.opacity = '0.5';
    productsGrid.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        productsGrid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
    }, 200);
}

// Add hover effects
function addHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add smooth scrolling for navigation links
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

// Add loading animation for images
function addImageLoadingEffect() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
}

// Mobile menu toggle (if needed)
function initializeMobileMenu() {
    // This can be expanded for mobile hamburger menu functionality
    const navbar = document.querySelector('.navbar');
    
    // Add mobile responsiveness check
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            navbar.classList.add('mobile');
        } else {
            navbar.classList.remove('mobile');
        }
    });
}

// Initialize all functionality
initializeMobileMenu();
addImageLoadingEffect();
