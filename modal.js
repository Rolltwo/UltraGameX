// Script para controlar o modal de detalhes da notícia

document.querySelectorAll('.news-link').forEach((link) => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Pega o artigo correspondente
        const article = link.closest('.news-card');
        const title = article.querySelector('h3').innerText;
        const date = article.querySelector('.news-date').innerText;
        const img = article.querySelector('img').src;
        const detalhes = link.getAttribute('data-detalhes') || 'Mais detalhes da notícia podem ser exibidos aqui...';
        const details = `
            <img src="${img}" alt="" style="width:100%;border-radius:8px;">
            <h2>${title}</h2>
            <p><b>${date}</b></p>
            <p>${detalhes}</p>
        `;
        document.getElementById('news-modal-details').innerHTML = details;
        document.getElementById('news-modal').style.display = 'flex';
    });
});

// Fechar o modal
const closeBtn = document.querySelector('.news-modal-close');
if (closeBtn) {
    closeBtn.onclick = function() {
        document.getElementById('news-modal').style.display = 'none';
    };
}
// Fechar ao clicar fora do conteúdo
document.getElementById('news-modal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
}; 