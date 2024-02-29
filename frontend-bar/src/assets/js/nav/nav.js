const menu_hamburguer = document.getElementById('p_h');
const options_ = document.querySelector('.options_dropdown');

menu_hamburguer.addEventListener('click', () => {
    options_.classList.toggle('show'); // Toggle the 'show' class
});
