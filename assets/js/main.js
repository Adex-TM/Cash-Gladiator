document.addEventListener('DOMContentLoaded', function () {
    const well = document.querySelector('.well-shaft');
    const levels = document.querySelectorAll('.well-level');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        well.style.transform = `rotateX(${scrollY / 50}deg)`;

        levels.forEach(level => {
            const depth = level.getAttribute('data-depth');
            level.style.opacity = 1 - (scrollY / 1000) * depth * 0.3;
        });
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const desktopNav = document.querySelector('.desktop-nav');

mobileMenuBtn.addEventListener('click', () => {
    desktopNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = desktopNav.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        // Close all answers first
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('active');
        });
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
        });

        // Open clicked answer if it was closed
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (desktopNav.classList.contains('active')) {
            desktopNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Create floating particles
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Random animation
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    // Random size and color
    const size = Math.random() * 3 + 1;
    const colors = ['var(--neon-blue)', 'var(--cyber-purple)', 'var(--hologram-pink)', 'var(--cyber-yellow)'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;

    particlesContainer.appendChild(particle);
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.level-card, .sticker-card, .about-image');

    elements.forEach((el, index) => {
        const elementPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            }, index * 200);
        }
    });
};

// Set initial state
document.querySelectorAll('.level-card, .sticker-card, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) rotateX(10deg) rotateY(10deg)';
    el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Initialize animations on load
window.addEventListener('load', () => {
    animateOnScroll();
    header.classList.add('loaded');
});