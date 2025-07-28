function showVideo(videoId) {
  const videoFrame = document.getElementById('video-frame');
  if (videoId === 'video1') {
    videoFrame.src = 'https://www.youtube.com/embed/WZIGwN-5Ioo?si=XplQDHsoO0GLmbme'; // Substitua com o link do vídeo do Lucas
  } else if (videoId === 'video2') {
    videoFrame.src = 'https://www.youtube.com/embed/lTwessnK0hQ?si=_sZIacLFot1q46Yd'; // Substitua com o link do vídeo do Giovanni
  } else if (videoId === 'video3') {
    videoFrame.src = 'https://www.youtube.com/embed/zgezo5I3waM?si=Q4dnmRzIBDZCEXuf'; // Substitua com o link do vídeo do Matheus
  }
  document.getElementById('video-modal').style.display = 'flex'; // Usa flex para centralizar
}

function closeVideo(event) {
  if (event.target === document.getElementById('video-modal') || event.target.className === 'close') {
    document.getElementById('video-modal').style.display = 'none';
    document.getElementById('video-frame').src = ''; // Limpa o vídeo
  }
}

document.addEventListener('click', function (event) {
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Verifica se o clique foi fora de um item FAQ
  if (!event.target.closest('.faq-item') && !event.target.classList.contains('faq-question')) {
    faqItems.forEach(item => {
      const answer = item.querySelector('.faq-answer');
      if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        answer.style.maxHeight = "0"; // Esconde a resposta
      }
    });
  }
});

function toggleAnswer(questionElement) {
  const answer = questionElement.nextElementSibling;
  
  // Verifica se a resposta já está visível
  const isVisible = answer.classList.contains('show');
  
  // Alterna a classe 'show'
  answer.classList.toggle('show', !isVisible);
  
  // Se a resposta estava visível, aguarde a animação terminar antes de ocultar
  if (isVisible) {
    answer.style.maxHeight = "0"; // Define max-height para esconder
    setTimeout(() => {
      answer.classList.remove('show'); // Remove a classe após a animação
    }, 500); // Tempo deve ser igual ao da transição
  } else {
    answer.style.maxHeight = "200px"; // Ajuste para altura máxima
  }
}
