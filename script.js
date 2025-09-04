// 90s MEGA SCRIPT OF AWESOMENESS!

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

// MEGA COPY COUPON FUNCTIONALITY WITH EXTRA CHEESE!
function copyCoupon(code) {
    navigator.clipboard.writeText(code).then(function() {
        // Find the button that was clicked
        const buttons = document.querySelectorAll('.copy-button');
        buttons.forEach(button => {
            if (button.onclick.toString().includes(code)) {
                // Add copied class for visual feedback
                button.classList.add('copied');
                button.textContent = '✓ KOPIERT!!!';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.textContent = '📋 CODE KOPIEREN!';
                }, 3000);
            }
        });
        
        // Show a MEGA toast notification
        showToast(`🎉 KRASS! Code ${code} wurde kopiert! 🎉`);
        
        // Add some confetti effect
        createConfetti();
        
        // Play a sound effect (if user interacted with page)
        playSuccessSound();
        
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showToast('❌ FEHLER beim Kopieren! ❌');
    });
}

// SUPER FLASHY TOAST NOTIFICATION!
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff0080, #ffff00, #00ff80);
        background-size: 400% 400%;
        animation: rainbowToast 0.5s ease infinite;
        color: #000;
        padding: 20px 25px;
        border-radius: 15px;
        border: 3px solid #fff;
        box-shadow: 0 0 30px rgba(255, 0, 128, 0.8);
        z-index: 10000;
        font-weight: 700;
        font-size: 1.1rem;
        text-shadow: 1px 1px 0px #fff;
        transform: scale(0);
        animation: toastPop 0.5s ease forwards, rainbowToast 0.5s ease infinite;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes toastPop {
                0% { transform: scale(0) rotate(-180deg); }
                50% { transform: scale(1.2) rotate(10deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
            @keyframes rainbowToast {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
            }
            @keyframes toastOut {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                100% { transform: scale(0) rotate(180deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(toast);
    
    // Remove after 4 seconds with animation
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.5s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, 4000);
}

// CONFETTI EXPLOSION!
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: ${['#ff0080', '#ffff00', '#00ff80', '#0080ff', '#8000ff'][Math.floor(Math.random() * 5)]};
                z-index: 9999;
                border-radius: 50%;
                pointer-events: none;
                animation: confettiFall 2s ease-out forwards;
            `;
            
            // Random direction
            const angle = Math.random() * 360;
            const distance = Math.random() * 200 + 100;
            
            confetti.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
            confetti.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 2000);
        }, i * 50);
    }
    
    // Add confetti animation if not exists
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translate(-50%, -50%) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + var(--end-x, 0px)), calc(-50% + var(--end-y, 0px))) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// SUCCESS SOUND EFFECT!
function playSuccessSound() {
    try {
        // Create audio context for a beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a quick beep sequence
        const notes = [523.25, 659.25, 783.99]; // C, E, G
        
        notes.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.1);
            
            oscillator.start(audioContext.currentTime + index * 0.1);
            oscillator.stop(audioContext.currentTime + index * 0.1 + 0.1);
        });
    } catch (error) {
        console.log('Audio not available');
    }
}

// RAINBOW CURSOR TRAIL!
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Keep only recent trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
    
    // Create trail element
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        top: ${e.clientY}px;
        left: ${e.clientX}px;
        width: 8px;
        height: 8px;
        background: ${['#ff0080', '#ffff00', '#00ff80', '#0080ff'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: trailFade 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 500);
});

// Add trail animation
if (!document.querySelector('#trail-styles')) {
    const style = document.createElement('style');
    style.id = 'trail-styles';
    style.textContent = `
        @keyframes trailFade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
        }
    `;
    document.head.appendChild(style);
}

// EXTREME SCROLL EFFECTS!
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    // Make navbar even more flashy when scrolling
    if (scrolled > 50) {
        navbar.style.background = 'linear-gradient(90deg, #ff0080, #8000ff, #0080ff, #00ff80, #ffff00)';
        navbar.style.backgroundSize = '500% 100%';
        navbar.style.animation = 'slideRainbow 1s linear infinite';
    } else {
        navbar.style.background = 'linear-gradient(90deg, #ff0080, #8000ff, #0080ff)';
        navbar.style.backgroundSize = '300% 100%';
        navbar.style.animation = 'slideRainbow 2s linear infinite';
    }
});

// MEGA ENTRANCE ANIMATIONS!
function animateOnScroll() {
    const cards = document.querySelectorAll('.retro-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8) rotate(-10deg)';
        card.style.transition = `all 0.8s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// RANDOM SCREEN SHAKE FOR EXTRA CHAOS!
function randomShake() {
    if (Math.random() < 0.1) { // 10% chance every interval
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
}

// Add shake animation
if (!document.querySelector('#shake-styles')) {
    const style = document.createElement('style');
    style.id = 'shake-styles';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
    `;
    document.head.appendChild(style);
}

// WALKING BEAR THAT FOLLOWS MOUSE!
let bear = null;
let bearPosition = { x: 0, y: 0 };
let mousePosition = { x: 0, y: 0 };
let bearSpeed = 0.05; // How fast the bear follows (0.1 = fast, 0.01 = slow)

function initializeBear() {
    bear = document.getElementById('walking-bear');
    if (bear) {
        bearPosition.x = window.innerWidth / 2;
        bear.style.left = bearPosition.x + 'px';
    }
}

function updateBearPosition() {
    if (!bear) return;
    
    // Calculate distance to mouse
    const dx = mousePosition.x - bearPosition.x;
    const distance = Math.abs(dx);
    
    // Only move if mouse is far enough away
    if (distance > 5) {
        // Move bear towards mouse
        bearPosition.x += dx * bearSpeed;
        
        // Keep bear on screen
        bearPosition.x = Math.max(50, Math.min(window.innerWidth - 50, bearPosition.x));
        
        // Update bear position
        bear.style.left = bearPosition.x + 'px';
        
        // Update bear direction and animation
        bear.className = ''; // Reset classes
        if (dx > 0) {
            bear.classList.add('walking-right');
        } else {
            bear.classList.add('walking-left');
        }
        
        // Add some excitement when bear is moving fast
        if (distance > 100) {
            bear.style.fontSize = '3.5rem';
            bear.style.filter = 'drop-shadow(3px 3px 10px rgba(255, 0, 128, 0.6))';
        } else {
            bear.style.fontSize = '3rem';
            bear.style.filter = 'drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.3))';
        }
    }
}

// Track mouse movement
document.addEventListener('mousemove', function(e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
});

// Update bear position continuously
function animateBear() {
    updateBearPosition();
    requestAnimationFrame(animateBear);
}

// Bear clicks for fun!
function setupBearInteraction() {
    if (bear) {
        bear.addEventListener('click', function() {
            // Bear gets excited when clicked!
            bear.style.fontSize = '4rem';
            bear.style.animation = 'bearDance 0.3s ease-in-out 3';
            
            // Create hearts around the bear
            createBearHearts();
            
            // Play a happy sound
            playBearSound();
            
            // Reset after animation
            setTimeout(() => {
                bear.style.fontSize = '3rem';
                bear.style.animation = '';
            }, 1000);
        });
    }
}

// Create hearts when bear is clicked
function createBearHearts() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.cssText = `
                position: fixed;
                bottom: 80px;
                left: ${bearPosition.x}px;
                font-size: 1.5rem;
                z-index: 9998;
                pointer-events: none;
                animation: heartFloat 2s ease-out forwards;
            `;
            
            // Random direction for hearts
            const angle = (Math.random() * 120) - 60; // -60 to 60 degrees
            const distance = Math.random() * 100 + 50;
            
            heart.style.setProperty('--heart-x', Math.sin(angle * Math.PI / 180) * distance + 'px');
            heart.style.setProperty('--heart-y', -Math.cos(angle * Math.PI / 180) * distance + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
    
    // Add heart animation if not exists
    if (!document.querySelector('#heart-styles')) {
        const style = document.createElement('style');
        style.id = 'heart-styles';
        style.textContent = `
            @keyframes heartFloat {
                0% {
                    transform: translate(-50%, 0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(calc(-50% + var(--heart-x, 0px)), calc(0px + var(--heart-y, 0px))) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + var(--heart-x, 0px)), calc(0px + var(--heart-y, 0px))) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Bear sound effect
function playBearSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a cute bear sound (ascending notes)
        const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C octave
        
        notes.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.2);
            
            oscillator.start(audioContext.currentTime + index * 0.15);
            oscillator.stop(audioContext.currentTime + index * 0.15 + 0.2);
        });
    } catch (error) {
        console.log('Audio not available for bear sound');
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (bear) {
        bearPosition.x = Math.max(50, Math.min(window.innerWidth - 50, bearPosition.x));
        bear.style.left = bearPosition.x + 'px';
    }
});

// Add sentences for the speech bubble
const speechSentences = [
    "Ich hab sooo viel Energie für dich! ⚡",
    "Ich bin zwar ein Hund aber auch ein Vorfreudenbär",
    "Ich hab mir gleich 2 Paar gekauft, weil ich ein Vierbeiner bin",
    "50% ich glaube ich träume! Hat mal jemand eine esim für mich?",
    "*excited*",
    "ich würd zuschlagen",
    "C die sind wie für dich gemacht!",
    "Krass!",
    "So Krass!",
    "Mega!",
    "Ich hab gehört am Damm kann man gut Schredden",
    "Wie wärs mit nem Blitzfeierabend?"
];

// Function to update the speech bubble text randomly
function updateSpeechBubble() {
    const speechBubble = document.getElementById('speech-bubble');
    if (speechBubble) {
        const randomSentence = speechSentences[Math.floor(Math.random() * speechSentences.length)];
        speechBubble.textContent = randomSentence;
    }
}

// Update the speech bubble text periodically
setInterval(updateSpeechBubble, 10000); // Change text every 10 seconds

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    
    // Initialize the walking bear
    initializeBear();
    setupBearInteraction();
    animateBear(); // Start bear animation loop
    
    // Initialize speech bubble with random text immediately
    updateSpeechBubble();
    
    // Start random effects
    setInterval(randomShake, 10000);
    
    // Add some welcome confetti
    setTimeout(() => {
        createConfetti();
        showToast('🌈 WILLKOMMEN ZU DEN KRASSESTEN DEALS! 🌈');
    }, 10000);
});

// Make the walking dog and speech bubble follow mouse with direction tracking
let lastMouseX = 0;

document.addEventListener('mousemove', function(e) {
    const walkingBear = document.getElementById('walking-bear');
    const speechBubble = document.getElementById('speech-bubble');
    
    if (walkingBear) {
        // Calculate direction based on mouse movement
        const isMovingLeft = e.clientX < lastMouseX;
        const isMovingRight = e.clientX > lastMouseX;
        
        // Flip the dog based on direction
        if (isMovingLeft) {
            walkingBear.style.transform = 'scaleX(-1)'; // Flip horizontally for left movement
        } else if (isMovingRight) {
            walkingBear.style.transform = 'scaleX(1)'; // Normal orientation for right movement
        }
        
        // Offset the dog slightly behind the cursor
        walkingBear.style.left = (e.clientX - 20) + 'px';
        walkingBear.style.top = (e.clientY - 20) + 'px';
        
        // Update last mouse position
        lastMouseX = e.clientX;
    }
    
    if (speechBubble) {
        // Position speech bubble above and to the right of the dog
        speechBubble.style.left = (e.clientX + 30) + 'px';
        speechBubble.style.top = (e.clientY - 60) + 'px';
    }
});
