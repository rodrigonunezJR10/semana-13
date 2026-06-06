const links = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.dataset.page;

    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  });
});
// Animación básica para las tarjetas al pasar el mouse (Paso 11)
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('destacada');
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('destacada');
    });
});
