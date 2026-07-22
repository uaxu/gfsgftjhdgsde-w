// ============================================
// MAPA DE ÍCONES
// ============================================
var iconMap = {
    discord: 'https://cdn.simpleicons.org/discord/000000',
    telegram: 'https://cdn.simpleicons.org/telegram/000000',
    instagram: 'https://cdn.simpleicons.org/instagram/000000',
    twitter: 'https://cdn.simpleicons.org/twitter/000000',
    youtube: 'https://cdn.simpleicons.org/youtube/000000',
    github: 'https://cdn.simpleicons.org/github/000000',
    tiktok: 'https://cdn.simpleicons.org/tiktok/000000',
    snapchat: 'https://cdn.simpleicons.org/snapchat/000000',
    pinterest: 'https://cdn.simpleicons.org/pinterest/000000',
    spotify: 'https://cdn.simpleicons.org/spotify/000000',
    steam: 'https://cdn.simpleicons.org/steam/000000',
    roblox: 'https://cdn.simpleicons.org/roblox/000000',
    onlyfans: 'https://cdn.simpleicons.org/onlyfans/000000',
    gmail: 'https://cdn.simpleicons.org/gmail/000000',
    bitcoin: 'https://cdn.simpleicons.org/bitcoin/000000',
    ethereum: 'https://cdn.simpleicons.org/ethereum/000000',
    litecoin: 'https://cdn.simpleicons.org/litecoin/000000',
    solana: 'https://cdn.simpleicons.org/solana/000000',
    polygon: 'https://cdn.simpleicons.org/gmail/000000',
    namemc: 'https://cdn.simpleicons.org/gmail/000000',
    spacehey: 'https://cdn.simpleicons.org/gmail/000000'
};

// ============================================
// FUNÇÃO PARA OBTER URL DO ÍCONE
// ============================================
function getIconUrl(icon) {
    if (!icon) return iconMap.gmail;
    if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/assets/')) {
        return icon;
    }
    return iconMap[icon] || iconMap.gmail;
}

// ============================================
// FUNÇÕES DE COPY
// ============================================
function copyText(text, btn) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        var successful = document.execCommand('copy');
        if (successful) {
            showCopyWarning();
            flashButton(btn);
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
    }
    textArea.remove();
}

function showCopyWarning() {
    var warning = document.getElementById('copy-warning');
    if (!warning) return;
    warning.classList.add('show');
    setTimeout(function() {
        warning.classList.remove('show');
    }, 1200);
}

function flashButton(btn) {
    if (!btn) return;
    btn.style.boxShadow = '0 0 25px rgba(255,0,0,0.8)';
    setTimeout(function() {
        btn.style.boxShadow = '';
    }, 300);
}

// ============================================
// RESTAURAR URL (remove ?user=)
// ============================================
(function restoreURL() {
    var params = new URLSearchParams(window.location.search);
    var user = params.get('user');
    if (user) {
        sessionStorage.setItem('whbf_user', user);
        var cleanPath = '/' + user + '/';
        window.history.replaceState({}, '', cleanPath);
    }
})();

// ============================================
// FUNÇÃO PARA ANIMAR O TÍTULO
// ============================================
function startTitleAnimation() {
    var user = sessionStorage.getItem('whbf_user') || 'aaa';
    var profile = PROFILES[user];
    
    if (!profile || !profile.titleAnimation) {
        return;
    }

    var frames = profile.titleAnimation;
    var index = 0;

    if (window.titleInterval) {
        clearInterval(window.titleInterval);
    }
    
    window.titleInterval = setInterval(function() {
        document.title = frames[index] || profile.name || 'WHBF';
        index = (index + 1) % frames.length;
    }, 400);
}

// ============================================
// CARREGAR PERFIL
// ============================================
(function loadProfile() {
    var user = sessionStorage.getItem('whbf_user') || 'aaa';
    var profile = PROFILES[user];

    if (!profile) {
        window.location.href = 'https://whbf.cc';
        return;
    }
    
    document.title = profile.name;
    
    var imgEl = document.getElementById('profile-img');
    if (imgEl) {
        imgEl.src = profile.image;
        imgEl.alt = profile.name;
    }
    
    var nameEl = document.getElementById('profile-name');
    if (nameEl) {
        nameEl.textContent = profile.name;
    }
    
    var groupEl = document.getElementById('profile-group');
    if (groupEl) {
        groupEl.textContent = '- ' + profile.group + ' -';
    }
    
    var musicEl = document.getElementById('bg-music');
    if (musicEl) {
        musicEl.src = profile.music;
    }

    var container = document.getElementById('buttons-container');
    if (!container) return;
    
    container.innerHTML = '';

    profile.buttons.forEach(function(btn) {
        var iconUrl = getIconUrl(btn.icon);
        var isLink = btn.label.startsWith('http://') || btn.label.startsWith('https://');
        var element;
        
        if (isLink) {
            element = document.createElement('a');
            element.href = btn.label;
            element.target = '_blank';
            element.className = 'btn';
        } else {
            element = document.createElement('div');
            element.className = 'btn';
            element.dataset.copy = btn.label;
            element.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                copyText(this.dataset.copy, this);
            };
        }
        element.innerHTML = '<div class="icon"><img src="' + iconUrl + '" alt="' + btn.icon + '"></div>';
        container.appendChild(element);
    });

    setTimeout(function() {
        startTitleAnimation();
    }, 100);
})();

// ============================================
// ENTER SCREEN
// ============================================
(function setupEnterScreen() {
    var enterScreen = document.getElementById('enter-screen');
    var music = document.getElementById('bg-music');
    if (!enterScreen) return;
    enterScreen.addEventListener('click', function() {
        if (music) {
            music.volume = 0.1;
            music.play().catch(function() {});
        }
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
        setTimeout(function() {
            if (this.parentNode) this.remove();
        }.bind(this), 500);
    });
})();

// ============================================
// ASCII ART
// ============================================
function loadAsciiArt() {
    fetch('/whbfascii.txt')
        .then(function(res) {
            if (!res.ok) throw new Error('Ficheiro não encontrado');
            return res.text();
        })
        .then(function(art) {
            console.log('%c' + art, 'color:#000000; font-family:monospace; font-size:14px;');
        })
        .catch(function() {});
}
loadAsciiArt();

// ============================================
// 3D CARD EFFECT + SNOW + FADE IN
// ============================================
(function() {
    var createParticle = function() {
        var p = document.createElement('div');
        p.className = 'snowflake';
        p.style.left = Math.random() * window.innerWidth + 'px';
        p.style.fontSize = Math.random() * 14 + 6 + 'px';
        p.style.animationDuration = Math.random() * 6 + 6 + 's';
        p.innerText = '❆';
        document.body.appendChild(p);
        setTimeout(function() { p.remove(); }, 12000);
    };
    
    setTimeout(function() {
        setInterval(createParticle, 300);
        for (var i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
    }, 500);

    var card = document.getElementById('card');
    if (card) {
        var isActive = false;
        var currentX = 0;
        var currentY = 0;
        var targetX = 0;
        var targetY = 0;
        var rafId = null;

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

            card.style.setProperty('--rotate-x', currentY + 'deg');
            card.style.setProperty('--rotate-y', currentX + 'deg');
            card.classList.add('active');

            rafId = requestAnimationFrame(smoothUpdate);
        }

        function updateCardRotation(e) {
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var mouseX = e.clientX / windowWidth;
            var mouseY = e.clientY / windowHeight;
            var centerX = mouseX - 0.5;
            var centerY = mouseY - 0.5;
            var intensity = 35;
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
    }

    var fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(function(el) {
        el.style.opacity = '0';
        setTimeout(function() {
            el.style.opacity = '1';
            el.style.transition = 'opacity 0.8s ease';
        }, 100);
    });
})();
