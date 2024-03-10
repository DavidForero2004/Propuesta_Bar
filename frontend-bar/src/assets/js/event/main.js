const buttonsOpen = document.querySelectorAll('.openButton');
const buttonsClose = document.querySelectorAll('.closeButton');
const buttonAccept = document.querySelectorAll('.acceptButton');
const card = document.getElementById('card');

buttonsOpen.forEach(button => {
    button.addEventListener('click', () => {
        card.style.display = "block";
    });
});

buttonsClose.forEach(button => {
    button.addEventListener('click', () => {
        card.style.display = "none";
    });
});

buttonAccept.forEach(button =>{
    button.addEventListener('click',()=>{
        card.style.display = "none"
    })
})




