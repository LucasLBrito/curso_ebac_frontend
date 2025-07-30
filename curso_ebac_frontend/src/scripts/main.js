const meuCarrossel = document.getElementById('carousel_img');
const linkDownload = document.getElementById('linkDownload');

function atualizarLinkDownload() {
    const itemAtivo = meuCarrossel.querySelector('.carousel-item.active');
    if (itemAtivo) {
        const imagemAtiva = itemAtivo.querySelector('img');
        if (imagemAtiva) {
            const urlDaImagem = imagemAtiva.src;
            console.log('URL da imagem ativa:', urlDaImagem);
            const nomeDoArquivo = urlDaImagem.substring(urlDaImagem.lastIndexOf('/') + 1);
            linkDownload.href = urlDaImagem;
            linkDownload.setAttribute('download', nomeDoArquivo);
        }
    }
}

// Atualiza o link quando o carrossel termina a transição de slide
meuCarrossel.addEventListener('slid.bs.carousel', atualizarLinkDownload);

// Atualiza o link para a primeira imagem ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarLinkDownload);