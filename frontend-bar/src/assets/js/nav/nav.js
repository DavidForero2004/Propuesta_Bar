const menu_hamburguer = document.getElementById('manu_hamb');
const options_ = document.querySelector('.option_container_menu');

menu_hamburguer.addEventListener('click', () => {
    options_.classList.toggle('show'); // Alternar la clase 'show'
});
