const buttonsOpen = document.querySelectorAll('.openButton');
const buttonsClose = document.querySelectorAll('.closeButton');
const buttonAccept = document.querySelectorAll('.acceptButton');
const card = document.getElementById('card');
const table = document.getElementById('information');


Array.from(buttonsOpen).forEach(button => {
    button.addEventListener('click', () => {
        card.style.display = "flex";
    });
});

Array.from(buttonsClose).forEach(button => {
    button.addEventListener('click', () => {
        card.style.display = "none";
    });
});

Array.from(buttonAccept).forEach(button => {
    button.addEventListener('click', () => {
        card.style.display = "none";
    });
});

