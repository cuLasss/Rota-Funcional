// Função para atualizar o nome do usuário no header e no corpo
function updateUserGreeting() {
  const username = localStorage.getItem('username'); // Obtém o nome do usuário do localStorage
  if (username) {
    document.getElementById('user-greeting').textContent = `Olá, ${username}!`;
    document.getElementById('welcome-message').textContent = `Bem-vindo, ${username}!`;
  } else {
    // Se não houver usuário, redireciona para a página de login
    window.location.href = '../main/main.html';
  }
}

// Chama a função ao carregar a página
window.onload = updateUserGreeting;

document.getElementById('logout').addEventListener('click', function() {
  // Limpa o localStorage e redireciona para a página de login
  localStorage.removeItem('username');
  window.location.href = '../main/main.html';
});

function toggleDropdown() {
  const dropdown = document.getElementById('dropdown-content');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Adiciona o evento de clique se for em um dispositivo móvel
if (window.matchMedia("(max-width: 768px)").matches) {
  document.getElementById('user-greeting').onclick = toggleDropdown;
}

// Fecha o menu se clicar fora dele
window.onclick = function(event) {
  if (!event.target.matches('.user-greeting')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
};