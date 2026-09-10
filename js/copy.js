// ============================================
// COPY FUNCTION - WHBF
// ============================================

//  FUNÇÃO PARA COPIAR TEXTO (GARANTIDA) 
function copyText(text, btn) {
    // Método 1: Fallback usando textarea (funciona em 100% dos browsers)
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
            // Método 2: API moderna como fallback
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    showCopyWarning();
                    flashButton(btn);
                }).catch(function() {
                    console.error('Falha ao copiar com clipboard API');
                });
            } else {
                console.error('Nenhum método de copy disponível');
            }
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
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

//  ADICIONAR EVENT LISTENERS AOS BOTÕES DE COPY 
function setupCopyListeners() {
    var copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(function(btn) {
        // Remover listeners antigos para evitar duplicação
        btn.removeEventListener('click', handleCopy);
        btn.addEventListener('click', handleCopy);
    });
}

//  HANDLER DO CLICK 
function handleCopy(e) {
    e.preventDefault();
    e.stopPropagation();
    var btn = e.currentTarget;
    var text = btn.dataset.copy;
    copyText(text, btn);
}

//  INICIAR QUANDO O DOM ESTIVER PRONTO 
document.addEventListener('DOMContentLoaded', function() {
    setupCopyListeners();
});

//  TAMBÉM CORRE QUANDO OS BOTÕES SÃO CRIADOS DINAMICAMENTE 
// Esta função deve ser chamada DEPOIS de criar novos botões
window.setupCopyListeners = setupCopyListeners;
