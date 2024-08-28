const form = document.querySelector("#formulario");
const mensagem = document.querySelector("#mensagem");

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    validacao();
    console.log("mandou")
});

function validacao() {
    const CampoA = parseFloat(document.querySelector("#campoA").value);
    const CampoB = parseFloat(document.querySelector("#campoB").value);

    if (CampoA > CampoB) {
        mensagem.innerHTML = "Campo A não pode ser maior que Campo B";
        mensagem.style.color = "red";
    } else {
        mensagem.innerHTML = "Valor está válido";
        mensagem.style.color = "green";
    }
}


