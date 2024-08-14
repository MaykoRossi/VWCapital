document.addEventListener('DOMContentLoaded', function () {
    var scrollTopBtn = document.getElementById('scrollTopBtn');

    // Mostrar ou esconder o botão de rolar para o topo com base na rolagem da página
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) { // Mostrar o botão quando rolar mais de 300 pixels
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Rolagem suave para o topo quando o botão é clicado
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
