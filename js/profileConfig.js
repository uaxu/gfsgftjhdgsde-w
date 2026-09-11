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
    polygon: 'https://cdn.simpleicons.org/polygon/000000',
    namemc: 'https://cdn.simpleicons.org/namemc/000000',
    spacehey: 'https://cdn.simpleicons.org/spacehey/000000'
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
// FUNÇÕES DE COPY — grey flash + toast with text
// ============================================
function copyText(text, btn) {
    var done = false;
    function onSuccess(){
        if(done) return; done=true;
        showCopyWarning(text);
        flashButton(btn);
    }
    // modern API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(function(){
            // fallback to execCommand
            fallbackCopy(text, onSuccess);
        });
        // safety timeout in case promise never resolves (e.g. file://)
        setTimeout(function(){ if(!done) fallbackCopy(text, onSuccess); }, 600);
        return;
    }
    fallbackCopy(text, onSuccess);
}

function fallbackCopy(text, cb){
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus(); textArea.select();
    try {
        var successful = document.execCommand('copy');
        if (successful) cb();
    } catch (err) { console.error('Erro ao copiar:', err); }
    textArea.remove();
}

var _copyTimer = null;
function showCopyWarning(text) {
    var warning = document.getElementById('copy-warning');
    if (!warning) return;
    var short = (text||'').length > 28 ? text.slice(0,28)+'…' : (text||'Copied');
    warning.textContent = 'Copied: ' + short;
    warning.style.opacity = '1';
    warning.style.transform = 'translateY(0)';
    warning.classList.add('show');
    clearTimeout(_copyTimer);
    _copyTimer = setTimeout(function() {
        warning.style.opacity = '0';
        warning.style.transform = 'translateY(-6px)';
        warning.classList.remove('show');
    }, 1700);
}

function flashButton(btn) {
    if (!btn) return;
    // grey flash — matches site palette, not red
    btn.style.boxShadow = '0 0 20px rgba(160,160,160,0.65)';
    btn.style.borderColor = 'rgba(160,160,160,0.55)';
    btn.style.transform = 'scale(0.96)';
    setTimeout(function() {
        btn.style.boxShadow = '';
        btn.style.borderColor = '';
        btn.style.transform = '';
    }, 280);
}

// ============================================
// RESTAURAR URL — now handled by router.js
// nameFromUrl() already normalizes #/name, ?user=name, /name, /repo/name
// and on file:// keeps the filesystem path valid. Keep this IIFE as a
// no-op shim so old cached 404 -> ?user redirects still work.
// ============================================
// (router.js cleanHashImmediately + nameFromUrl handles it — nothing to do here)

// ============================================
// FUNÇÃO PARA ANIMAR O TÍTULO
// ============================================
function getCurrentUser() {
    // router.js is source of truth — falls back to sessionStorage
    try {
        if (typeof nameFromUrl === "function") {
            var n = nameFromUrl();
            if (n) return n.toLowerCase();
        }
    } catch (e) {}
    return (sessionStorage.getItem('whbf_user') || 'aaa').toLowerCase();
}

function startTitleAnimation() {
    var user = getCurrentUser();
    var profile = PROFILES[user];
    if (!profile || !profile.titleAnimation) return;
    var frames = profile.titleAnimation;
    var index = 0;
    if (window.titleInterval) clearInterval(window.titleInterval);
    function tick(){ document.title = frames[index] || profile.name || 'WHBF'; index = (index + 1) % frames.length; }
    window.titleInterval = setInterval(tick, 400);
    // pause when tab hidden — saves battery
    if(!window._titleVisBound){
        window._titleVisBound = true;
        document.addEventListener('visibilitychange', function(){
            if(document.hidden){ clearInterval(window.titleInterval); window.titleInterval=null; }
            else if(!window.titleInterval){ window.titleInterval=setInterval(tick,400); }
        });
    }
}

// ============================================
// CARREGAR PERFIL — dynamic, works on file:// + GH Pages
// ============================================
function renderProfile(user) {
    var profile = PROFILES[user];
    if (!profile) {
        window.location.href = 'https://whbf.cc';
        return false;
    }
    document.title = profile.name;
    var imgEl = document.getElementById('profile-img');
    if (imgEl) { imgEl.src = (typeof assetUrl === "function" ? assetUrl(profile.image) : profile.image); imgEl.alt = profile.name; }
    var nameEl = document.getElementById('profile-name');
    if (nameEl) nameEl.textContent = profile.name;
    var groupEl = document.getElementById('profile-group');
    if (groupEl) groupEl.textContent = '- ' + profile.group + ' -';
    var musicEl = document.getElementById('bg-music');
    if (musicEl) musicEl.src = (typeof assetUrl === "function" ? assetUrl(profile.music) : profile.music);
    var container = document.getElementById('buttons-container');
    if (!container) return true;
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
                e.preventDefault(); e.stopPropagation();
                copyText(this.dataset.copy, this);
            };
        }
        element.innerHTML = '<div class="icon"><img src="' + iconUrl + '" alt="' + btn.icon + '"></div>';
        container.appendChild(element);
    });
    setTimeout(function() { startTitleAnimation(); }, 100);
    return true;
}

(function loadProfile() {
    var user = getCurrentUser();
    if (!renderProfile(user) && typeof nameFromUrl === "function") {
        // if nameFromUrl gave a bad slug, fall back to home
        window.location.href = 'https://whbf.cc';
    }
})();

// ── dynamic SPA navigation on profile.html (back/forward + in-page switches)
window.addEventListener("popstate", function (e) {
    if (typeof hashGuard !== "undefined" && hashGuard) return;
    // e.state.profile is set by pushProfileUrl/replaceState
    var n = (e.state && e.state.profile) ? String(e.state.profile).toLowerCase() : getCurrentUser();
    // re-render without full reload — makes profile switches instant
    renderProfile(n);
});
window.addEventListener("hashchange", function () {
    if (typeof hashGuard !== "undefined" && hashGuard) return;
    var n = getCurrentUser();
    if (n && PROFILES[n]) renderProfile(n);
});

// ============================================
// ENTER SCREEN + VOLUME SCROLLER (opposite leave button)
// ============================================
(function setupEnterScreen() {
    var enterScreen = document.getElementById('enter-screen');
    var music = document.getElementById('bg-music');
    var slider = document.getElementById('volume-slider');
    var valEl = document.getElementById('volume-val');

    // restore persisted volume
    var initVol = 0.1;
    try{
        var saved = localStorage.getItem('whbf_volume');
        if(saved!==null) initVol = Math.max(0,Math.min(1,parseFloat(saved)));
    }catch(e){}
    if(music) music.volume = initVol;
    function setPct(el, v){ el.style.setProperty('--pct', (v*100)+'%'); }
    if(slider){
        slider.value = initVol; setPct(slider, initVol);
        if(valEl) valEl.textContent = Math.round(initVol*100)+'%';
        // icon muted state
        var _ic = document.getElementById('vol-icon'); if(_ic) _ic.classList.toggle('muted', initVol===0);
    }

    function bindSlider(){
        if(!slider || !music) return;
        slider.addEventListener('input', function(){
            var v = parseFloat(this.value);
            music.volume = v; setPct(this, v);
            if(valEl) valEl.textContent = Math.round(v*100)+'%';
            var ic=document.getElementById('vol-icon'); if(ic) ic.classList.toggle('muted', v===0);
            try{ localStorage.setItem('whbf_volume', String(v)); }catch(e){}
        });
        var icon = document.getElementById('vol-icon');
        if(icon){
            function toggleMute(){
                if(music.volume>0){ slider.dataset.prev=String(music.volume); music.volume=0; slider.value=0; }
                else { var prev=parseFloat(slider.dataset.prev||'0.1'); music.volume=prev; slider.value=prev; }
                setPct(slider, music.volume);
                if(valEl) valEl.textContent = Math.round(music.volume*100)+'%';
                icon.classList.toggle('muted', music.volume===0);
                try{ localStorage.setItem('whbf_volume', String(music.volume)); }catch(e){}
            }
            icon.addEventListener('click', toggleMute);
            icon.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleMute(); }});
        }
    }
    bindSlider();

    if (!enterScreen) return;
    enterScreen.setAttribute('tabindex','0'); enterScreen.setAttribute('role','button'); enterScreen.setAttribute('aria-label','Enter');
    enterScreen.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); enterScreen.click(); }});
    enterScreen.addEventListener('click', function() {
        if (music) {
            // volume already set from slider/persisted
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
    var tryFetch = function (url) {
        return fetch(url).then(function(res) {
            if (!res.ok) throw new Error('Ficheiro não encontrado');
            return res.text();
        });
    };
    tryFetch('/whbfascii.txt').catch(function() { return tryFetch('whbfascii.txt'); })
        .then(function(art) {
            if (art) console.log('%c' + art, 'color:#000000; font-family:monospace; font-size:14px;');
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
