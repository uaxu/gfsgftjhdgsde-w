//  MAPA DE ÍCONES 
var iconMap = {
    discord: 'https://cdn.simpleicons.org/discord/8a0002',
    telegram: 'https://cdn.simpleicons.org/telegram/8a0002',
    instagram: 'https://cdn.simpleicons.org/instagram/8a0002',
    twitter: 'https://cdn.simpleicons.org/twitter/8a0002',
    youtube: 'https://cdn.simpleicons.org/youtube/8a0002',
    github: 'https://cdn.simpleicons.org/github/8a0002',
    tiktok: 'https://cdn.simpleicons.org/tiktok/8a0002',
    snapchat: 'https://cdn.simpleicons.org/snapchat/8a0002',
    pinterest: 'https://cdn.simpleicons.org/pinterest/8a0002',
    spotify: 'https://cdn.simpleicons.org/spotify/8a0002',
    steam: 'https://cdn.simpleicons.org/steam/8a0002',
    roblox: 'https://cdn.simpleicons.org/roblox/8a0002',
    onlyfans: 'https://cdn.simpleicons.org/onlyfans/8a0002',
    gmail: 'https://cdn.simpleicons.org/gmail/8a0002',
    bitcoin: 'https://cdn.simpleicons.org/bitcoin/8a0002',
    ethereum: 'https://cdn.simpleicons.org/ethereum/8a0002',
    litecoin: 'https://cdn.simpleicons.org/litecoin/8a0002',
    solana: 'https://cdn.simpleicons.org/solana/8a0002',
    polygon: 'https://cdn.simpleicons.org/gmail/8a0002',
    namemc: 'https://cdn.simpleicons.org/gmail/8a0002',
    spacehey: 'https://cdn.simpleicons.org/gmail/8a0002'
};

//  FUNÇÃO PARA OBTER URL DO ÍCONE 
function getIconUrl(icon) {
    if (!icon) return iconMap.gmail;
    if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/assets/')) {
        return icon;
    }
    return iconMap[icon] || iconMap.gmail;
}

//  FUNÇÃO PARA COPIAR TEXTO 
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
        } else {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    showCopyWarning();
                    flashButton(btn);
                }).catch(function() {
                    alert('Falha ao copiar: ' + text);
                });
            } else {
                alert('Falha ao copiar: ' + text);
            }
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('Falha ao copiar: ' + text);
    }
    textArea.remove();
}

//  FUNÇÃO PARA MOSTRAR O WARNING 
function showCopyWarning() {
    var warning = document.getElementById('copy-warning');
    if (!warning) return;
    warning.classList.add('show');
    setTimeout(function() {
        warning.classList.remove('show');
    }, 1200);
}

//  FLASH NO BOTÃO 
function flashButton(btn) {
    if (!btn) return;
    btn.style.boxShadow = '0 0 25px rgba(255,0,0,0.8)';
    setTimeout(function() {
        btn.style.boxShadow = '';
    }, 300);
}

//  PROFILE DATA LOADING 
(function loadProfile() {
    var user = sessionStorage.getItem('whbf_user') || 'under';
    var profile = PROFILES[user];

    if (!profile) {
        window.location.href = 'https://whbf.cc';
        return;
    }

    document.getElementById('page-title').textContent = profile.name;
    document.getElementById('profile-img').src = profile.image;
    document.getElementById('profile-img').alt = profile.name;
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-group').textContent = '- ' + profile.group + ' -';
    document.getElementById('bg-music').src = profile.music;

    var container = document.getElementById('buttons-container');
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
                var text = this.dataset.copy;
                copyText(text, this);
            };
        }
        element.innerHTML = '<div class="icon"><img src="' + iconUrl + '" alt="' + btn.icon + '"></div>';
        container.appendChild(element);
    });
})();

//  RESTAURAR URL PARA /user/
(function restoreURL() {
    var params = new URLSearchParams(window.location.search);
    var user = params.get('user');
    if (user) {
        sessionStorage.setItem('whbf_user', user);
        var cleanPath = '/' + user + '/';
        window.history.replaceState({}, '', cleanPath);
    }
})();

//  ENTER SCREEN LOGIC
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

fetch('/whbfascii.txt')
  .then(res => res.text())
  .then(art => {
    console.log(`%c${art}`, "color:#000; font-family:monospace; font-size:14px;");
  })
  .catch(() => {

  });
