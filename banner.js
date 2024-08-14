$(document).ready(function() {
    let currentSlide = 0;
    const totalSlides = $('.slider .slide').length;
    const slideInterval = 4000; // Tempo de exibição em milissegundos (4 segundos)

    // Função para atualizar a posição do slider
    function updateSliderPosition() {
        const offset = -currentSlide * 100 + '%';
        $('.slider').css('transform', 'translateX(' + offset + ')');
    }

    // Função para ir para o próximo slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0; // Volta para o primeiro slide
        }
        updateSliderPosition();
    }

    // Configura o intervalo para mudar automaticamente os slides a cada 4 segundos
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Evento para o botão "Próximo"
    $('.next').click(function() {
        clearInterval(autoSlide); // Pausa o ciclo automático
        nextSlide();
        autoSlide = setInterval(nextSlide, slideInterval); // Reinicia o ciclo automático
    });

    // Evento para o botão "Anterior"
    $('.prev').click(function() {
        clearInterval(autoSlide); // Pausa o ciclo automático
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1; // Vai para o último slide
        }
        updateSliderPosition();
        autoSlide = setInterval(nextSlide, slideInterval); // Reinicia o ciclo automático
    });
});
