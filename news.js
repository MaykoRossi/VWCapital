$(document).ready(function() {
    // Função para alternar o texto completo
    $('.toggle-text').click(function() {
        const fullText = $(this).siblings('.full-text');
        const introText = $(this).siblings('.intro-text');
        
        // Exibe ou esconde o texto completo
        if (fullText.is(':visible')) {
            fullText.slideUp();
            $(this).text('Leia mais');
        } else {
            fullText.slideDown();
            $(this).text('Leia menos');
        }
    });
});
