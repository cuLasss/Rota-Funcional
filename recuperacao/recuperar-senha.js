// script.js

// Função para carregar os usuários do localStorage
function loadUsers() {
  const usersData = localStorage.getItem('users');
  return usersData ? JSON.parse(usersData) : [
    {
      username: 'admin',
      password: '1234' // Senha simples para teste
    }
  ];
}

// Evento para o formulário de recuperação
document.getElementById('recover-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('recover-email').value.trim();
  const users = loadUsers();
  const user = users.find(user => user.email === email); // Verifica se o e-mail está registrado
  
  if (user) {
    // Simular envio de e-mail
    alert('Instruções de recuperação de senha enviadas para ' + email);
    
    // Aqui você pode redirecionar para a página de redefinição de senha
    document.getElementById('recover-form').classList.add('hidden');
    document.getElementById('reset-password-form').classList.remove('hidden');
  } else {
    alert('E-mail não encontrado.');
  }
});

// Evento para o formulário de redefinição de senha
document.getElementById('reset-password-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newPassword = document.getElementById('new-password').value.trim();
  const confirmPassword = document.getElementById('confirm-new-password').value.trim();
  
  if (newPassword !== confirmPassword) {
    alert('As senhas não coincidem.');
    return;
  }
  
  // Atualizando a senha do usuário
  const users = loadUsers();
  const email = document.getElementById('recover-email').value.trim();
  const userIndex = users.findIndex(user => user.email === email);
  
  if (userIndex > -1) {
    users[userIndex].password = newPassword; // Atualiza a senha
    localStorage.setItem('users', JSON.stringify(users)); // Salva as alterações
    alert('Senha redefinida com sucesso!');
    window.location.href = '../login/login.html'; // Redireciona para a página de login
  }
});