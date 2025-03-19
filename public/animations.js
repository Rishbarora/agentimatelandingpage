// Background shapes animation
function createBackgroundShapes() {
    const container = document.querySelector('.background-shapes');
    for (let i = 0; i < 10; i++) {
        const shape = document.createElement('div');
        shape.className = 'background-shape';
        shape.style.width = `${Math.random() * 300 + 100}px`;
        shape.style.height = shape.style.width;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        container.appendChild(shape);
    }

    anime({
        targets: '.background-shape',
        opacity: [0, 0.1, 0],
        scale: [1, 1.2, 1],
        duration: 4000,
        delay: anime.stagger(200),
        loop: true,
        easing: 'easeInOutQuad'
    });
}

// Create section flash transition effect
function createSectionFlashTransition() {
    const container = document.getElementById('animation-container');
    const flashSection = document.createElement('div');
    flashSection.className = 'section-flash';
    container.appendChild(flashSection);

    return anime({
        targets: flashSection,
        opacity: [0, 1, 0],
        scale: [0.95, 1, 0.95],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => flashSection.remove()
    });
}

// Create Mac window component
function createMacWindow() {
    const window = document.createElement('div');
    window.className = 'mac-window';
    window.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <div class="window-control close"></div>
                <div class="window-control minimize"></div>
                <div class="window-control maximize"></div>
            </div>
        </div>
        <div class="window-content"></div>
    `;
    return window;
}

// Animation sequences
const animations = [
    {
        name: "Window Creation",
        text: "Creating a new window component...",
        create: () => {
            const container = document.getElementById('animation-container');
            container.innerHTML = '';
            const window = createMacWindow();
            container.appendChild(window);

            return anime({
                targets: window,
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 1000,
                easing: 'easeOutExpo'
            });
        }
    },
    {
        name: "Image Component",
        text: "Adding an image component to the window...",
        create: () => {
            const container = document.getElementById('animation-container');
            const window = createMacWindow();
            const content = window.querySelector('.window-content');
            content.innerHTML = `
                <div class="image-component" style="width: 300px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
            `;
            container.innerHTML = '';
            container.appendChild(window);

            return anime({
                targets: '.image-component',
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 1000,
                easing: 'easeOutExpo'
            });
        }
    },
    {
        name: "Resize Component",
        text: "Demonstrating component resizing...",
        create: () => {
            const container = document.getElementById('animation-container');
            const window = createMacWindow();
            const content = window.querySelector('.window-content');
            content.innerHTML = `
                <div class="resize-component" style="width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
            `;
            container.innerHTML = '';
            container.appendChild(window);

            return anime({
                targets: '.resize-component',
                width: [200, 400, 200],
                height: [200, 300, 200],
                duration: 2000,
                easing: 'easeInOutQuad',
                loop: true,
                direction: 'alternate'
            });
        }
    },
    {
        name: "Layout Grid",
        text: "Creating a responsive grid layout...",
        create: () => {
            const container = document.getElementById('animation-container');
            const window = createMacWindow();
            const content = window.querySelector('.window-content');
            content.innerHTML = `
                <div class="grid-layout" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    ${Array(6).fill().map(() => `
                        <div class="grid-item" style="height: 100px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
                    `).join('')}
                </div>
            `;
            container.innerHTML = '';
            container.appendChild(window);

            return anime({
                targets: '.grid-item',
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: anime.stagger(100),
                duration: 1000,
                easing: 'easeOutExpo'
            });
        }
    }
];

// Text typing animation
function typeText(text, callback) {
    const textElement = document.querySelector('.ai-input-text');
    textElement.textContent = '';
    
    let currentIndex = 0;
    const interval = setInterval(() => {
        if (currentIndex < text.length) {
            textElement.textContent += text[currentIndex];
            currentIndex++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 50);
}

// Animation sequence
let currentAnimationIndex = 0;
let currentAnimation = null;

function startNextAnimation() {
    // Stop current animation if exists
    if (currentAnimation) {
        currentAnimation.pause();
    }

    // Get next animation
    const animation = animations[currentAnimationIndex];
    
    // Type the text
    typeText(animation.text, () => {
        // Create section flash transition
        const transition = createSectionFlashTransition();
        
        // Start the animation after transition
        setTimeout(() => {
            currentAnimation = animation.create();
            
            // Move to next animation after delay
            setTimeout(() => {
                currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
                startNextAnimation();
            }, 5000);
        }, 1000);
    });
}

// Initialize animations
createBackgroundShapes();

// Initialize title animation
anime({
    targets: '.title-text',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    delay: anime.stagger(200),
    easing: 'easeOutExpo'
});

anime({
    targets: '.subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    delay: 600,
    easing: 'easeOutExpo'
});

// Start the animation sequence
setTimeout(startNextAnimation, 1500); 