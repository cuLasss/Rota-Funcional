let currentStep = 1;

function nextStep() {
  if (currentStep < 3) {
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    currentStep++;
    document.getElementById(`step-${currentStep}`).style.display = 'block';
    updateStepIndicator();
  }
}

function updateStepIndicator() {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    step.classList.remove('active'); // Remove a classe 'active' de todas as etapas
  });
  steps[currentStep - 1].classList.add('active'); // Adiciona a classe 'active' apenas à etapa atual
}

// Processar o pagamento
document.getElementById('payment-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio do formulário

  const cardNumber = document.getElementById('card-number').value;
  const expiry = document.getElementById('expiry').value;
  const cvv = document.getElementById('cvv').value;

  // Simulação de pagamento
  if (cardNumber && expiry && cvv) {
    document.getElementById('success-message').textContent = 'Pagamento realizado com sucesso!';
    document.getElementById('error-message').textContent = '';
    this.reset();
  } else {
    document.getElementById('error-message').textContent = 'Por favor, preencha todos os campos.';
    document.getElementById('success-message').textContent = '';
  }
});
document.getElementById('registration-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio do formulário

  // Coleta dos valores dos campos
  const fullName = document.getElementById('full-name').value;
  const cpf = document.getElementById('cpf').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validação de CPF
  if (!validateCPF(cpf)) {
    document.getElementById('error-message').textContent = 'CPF inválido.';
    return;
  }

  // Validação de E-mail
  if (!validateEmail(email)) {
    document.getElementById('error-message').textContent = 'E-mail inválido.';
    return;
  }

  // Validação de Senha
  if (password !== confirmPassword) {
    document.getElementById('error-message').textContent = 'As senhas não coincidem.';
    return;
  }

  // Se tudo estiver correto, exibe mensagem de sucesso e avança
  document.getElementById('success-message').textContent = 'Cadastro realizado com sucesso!';
  document.getElementById('error-message').textContent = '';

  // Espera 1.5 segundos e avança para a próxima etapa
  setTimeout(() => {
    nextStep();
  }, 1500);
});

// Função para validar CPF
function validateCPF(cpf) {
  // Lógica de validação do CPF
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica tamanho e se todos os dígitos são iguais

  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  return remainder === parseInt(cpf.charAt(10));
}

// Função para validar E-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
