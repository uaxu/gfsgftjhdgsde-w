document.addEventListener('DOMContentLoaded', function() {
    
    const createParticle = () => {
        const p = document.createElement('div');
        p.className = 'snowflake';
        p.style.left = Math.random() * window.innerWidth + 'px';
        p.style.fontSize = Math.random() * 14 + 6 + 'px';
        p.style.animationDuration = Math.random() * 6 + 6 + 's';
        p.innerText = '❆';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 12000);
    };
    
    setTimeout(() => {
        setInterval(createParticle, 300);
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
    }, 500);

    const card = document.getElementById('card');
    if (!card) return;
    
    let isActive = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = null;

    function smoothUpdate() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        if (Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01 && !isActive) {
            card.classList.remove('active');
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            return;
        }

        card.style.setProperty('--rotate-x', `${currentY}deg`);
        card.style.setProperty('--rotate-y', `${currentX}deg`);
        card.classList.add('active');

        rafId = requestAnimationFrame(smoothUpdate);
    }

    function updateCardRotation(e) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const mouseX = e.clientX / windowWidth;
        const mouseY = e.clientY / windowHeight;

        const centerX = mouseX - 0.5;
        const centerY = mouseY - 0.5;
        const intensity = 35;

        targetX = -centerX * intensity;
        targetY = centerY * intensity;

        isActive = true;

        if (!rafId) {
            smoothUpdate();
        }
    }

    function resetCardRotation() {
        targetX = 0;
        targetY = 0;
        isActive = false;
    }

    document.addEventListener('mousemove', updateCardRotation);
    document.addEventListener('mouseleave', resetCardRotation);
    document.addEventListener('mouseenter', () => {
        isActive = true;
        if (!rafId) {
            smoothUpdate();
        }
    });

    const warning = document.getElementById('copy-warning');
    if (warning) {
        document.querySelectorAll('[data-copy]').forEach(btn => {
            btn.addEventListener('click', async function() {
                const text = this.dataset.copy;
                try {
                    await navigator.clipboard.writeText(text);
                    warning.classList.add('show');
                    setTimeout(() => warning.classList.remove('show'), 1000);
                    this.style.boxShadow = '0 0 25px rgba(255,0,0,0.8)';
                    setTimeout(() => this.style.boxShadow = '', 300);
                } catch (err) {
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                    warning.classList.add('show');
                    setTimeout(() => warning.classList.remove('show'), 1000);
                }
            });
        });
    }

    const enterScreen = document.getElementById('enter-screen');
    const music = document.getElementById('bg-music');
    
    if (music) {
        music.volume = 0.1;
        if (enterScreen) {
            enterScreen.addEventListener('click', () => {
                music.play().catch(() => {});
                enterScreen.style.opacity = '0';
                enterScreen.style.pointerEvents = 'none';
                setTimeout(() => enterScreen.remove(), 400);
            });
        }
    }

    const titleChars = document.title.split('');
    if (titleChars.length > 0) {
        let tIndex = 0;
        setInterval(() => {
            const maxLen = titleChars.length;
            const currentLen = (tIndex % (maxLen + 1));
            document.title = titleChars.slice(0, currentLen).join('') || ' ';
            tIndex++;
            if (tIndex > maxLen + 3) tIndex = 0;
        }, 500);
    }

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transition = 'opacity 0.8s ease';
        }, 100);
    });
});
