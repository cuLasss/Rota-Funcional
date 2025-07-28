// Função para carregar os usuários do localStorage ou inicializar com um usuário padrão
function loadUsers() {
  const usersData = localStorage.getItem('users');
  return usersData ? JSON.parse(usersData) : [
    {
      username: 'admin',
      password: '1234', // Senha simples para teste
      email: 'lucas141martin@hotmail.com'
    }
  ];
}

// Armazenar os dados de usuários no localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Carrega os usuários
let users = loadUsers();

// Função para alternar entre login e cadastro
function toggleForm(showLogin) {
  document.getElementById('login-form').classList.toggle('hidden', !showLogin);
  document.getElementById('register-form').classList.toggle('hidden', showLogin);
  clearMessages();
}

// Evento para redirecionar para a página principal ao clicar em "Cadastre-se"
document.getElementById('show-register').addEventListener('click', () => {
  window.location.href = '../main/main.html'; // Altere para o caminho correto da sua página principal
});

// Evento para alternar para o formulário de login
document.getElementById('show-login').addEventListener('click', () => toggleForm(true));

// Função de login
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
      showErrorMessage('login-form', 'Todos os campos são obrigatórios!');
      return;
  }

  // Verificação do usuário
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
      showSuccessMessage('login-form', 'Login realizado com sucesso!');

      // Armazena o nome do usuário no localStorage
      localStorage.setItem('username', user.username); // Armazena o nome do usuário

      // Atraso antes de redirecionar para a página do aluno
      setTimeout(() => {
        window.location.href = '../aluno/aluno.html'; // Redireciona para a página do aluno
      }, 800); // 0.8 segundos
  } else {
      showErrorMessage('login-form', 'Usuário ou senha incorretos!');
  }
});

// Função para mostrar mensagens de erro
function showErrorMessage(formId, message) {
  clearMessages(); // Limpa mensagens anteriores
  const form = document.getElementById(formId);
  let errorMessage = form.querySelector('.error-message');
  if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.classList.add('error-message');
      form.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
}

// Função para mostrar mensagens de sucesso
function showSuccessMessage(formId, message) {
  clearMessages(); // Limpa mensagens anteriores
  const form = document.getElementById(formId);
  let successMessage = form.querySelector('.success-message');
  if (!successMessage) {
      successMessage = document.createElement('p');
      successMessage.classList.add('success-message');
      form.appendChild(successMessage);
  }
  successMessage.textContent = message;
}

// Função para limpar mensagens
function clearMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());

  const successMessages = document.querySelectorAll('.success-message');
  successMessages.forEach(msg => msg.remove());
}

// Função para limpar os campos do formulário
function clearForm(formId) {
  const form = document.getElementById(formId);
  form.reset();
}
document.getElementById('forgot-password').addEventListener('click', function() {
  // Redirecione para a página de recuperação de senha
  window.location.href = '../recuperacao/recuperar-senha.html'; // Altere para o caminho correto
});