// FAQ interativo
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    question.addEventListener('click', () => {
        const isOpen = answer.style.display === 'block';
        
        // Fechar todos
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        document.querySelectorAll('.faq-icon').forEach(ic => {
            ic.textContent = '+';
        });
        document.querySelectorAll('.faq-item').forEach(it => {
            it.classList.remove('active');
        });
        
        // Abrir o selecionado se não estiver aberto
        if (!isOpen) {
            answer.style.display = 'block';
            if (icon) icon.textContent = '−';
            item.classList.add('active');
        }
    });
});

// Carrossel simplificado só para imagens
function initImageCarousel(carouselId, slideId, dotsId) {
    const carousel = document.getElementById(carouselId);
    const slide = document.getElementById(slideId);
    const dotsContainer = document.getElementById(dotsId);
    const items = slide.children;
    const totalItems = items.length;
    
    // Definir altura baseada no container
    carousel.style.height = window.innerWidth > 768 ? '450px' : '350px';
    
    // Configurar dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
        let currentIndex = 0;
    let autoSlideInterval;
    let slideWidth = carousel.offsetWidth;
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        slide.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Atualizar dots
        document.querySelectorAll(`#${dotsId} .carousel-dot`).forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        goToSlide(currentIndex);
    }
    
    // Iniciar rotação automática
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 2000);
    }
    
    // Pausar rotação
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Eventos de interação
    carousel.addEventListener('mouseenter', pauseAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Toque para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoSlide();
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) nextSlide(); // Swipe left
        if (touchEndX - touchStartX > 50) {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            goToSlide(currentIndex);
        }
    }
    
    // Responsividade
    window.addEventListener('resize', () => {
        slideWidth = carousel.offsetWidth;
        carousel.style.height = window.innerWidth > 768 ? '450px' : '350px';
        slide.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    });
    
    // Iniciar
    startAutoSlide();
}

// Inicializar carrosséis quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initImageCarousel('productCarousel', 'productSlide', 'productDots');
    initImageCarousel('testimonyCarousel', 'testimonySlide', 'testimonyDots');
});