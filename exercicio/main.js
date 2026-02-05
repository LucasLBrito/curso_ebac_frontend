// Seleciona os elementos do perfil
const profileAvatar = document.querySelector('.profile-avatar');
const profileName = document.querySelector('.profile-name');
const profileUsername = document.querySelector('.profile-username');
const numRepositorios = document.getElementById('Repositorios');
const numSeguidores = document.getElementById('Seguidores');
const numSeguindo = document.getElementById('Seguindo');
const profileLink = document.querySelector('.profile-link');


// Função para buscar dados do GitHub e atualizar o perfil
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');
    fetch('https://api.github.com/users/LucasLBrito')
    
        .then(response => response.json())
        .then(function(data) {
            // Atualiza os elementos do perfil com os dados obtidos
            profileAvatar.src = data.avatar_url;
            profileName.textContent = data.name;
            profileUsername.textContent = data.login;
            numRepositorios.textContent = data.public_repos;
            numSeguidores.textContent = data.followers;
            numSeguindo.textContent = data.following;
            profileLink.href = data.html_url;
            console.log(data);
        })
        .catch(function(error) {
            console.error('Erro ao buscar dados do GitHub:', error);
        })
});