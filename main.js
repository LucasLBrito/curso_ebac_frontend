

$(document).ready(function(){
    $('.slider_header').slick({
        autoplay: true, // Passar os slides automaticamente
        autoplaySpeed: 1000, // Tempo entre slides (2 segundos)
        dots: false, // Adicionar os indicadores (bolinhas)
        infinite: true, // Loop infinito
        speed: 500, // Velocidade da transição
        slidesToShow: 1, // Mostrar 1 slide por vez (obrigatório para fade)
        slidesToScroll: 1, // Quantos slides avançam por vez
        arrows: false, // Exibir setas de navegação
        fade: true, // Ativa a transição em fade
        cssEase: 'linear' // Garante uma transição mais suave
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let imagens = ["/img/loja_1.jpg", "/img/loja_2.jpg"];
    let imgElement = document.getElementById("imgLoja");
    let index = 0;

    setInterval(() => {
        index = (index + 1) % imagens.length; // Alterna entre 0 e 1
        imgElement.src = imagens[index];
    }, 2000); // Troca a cada 2 segundos
});
