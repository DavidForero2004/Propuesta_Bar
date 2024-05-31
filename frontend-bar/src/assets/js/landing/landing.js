// // const menu_hamburguer = document.getElementById("menu_hamb");
// // const options_ = document.querySelector(".option_container_menu");

// // menu_hamburguer.addEventListener('click', () => {
// //     options_.classList.toggle('show'); // Alternar la clase 'show'
// // });


// const products = document.querySelectorAll(".slider .product_");
// let counter = 0;

// function left() {
//     if (counter > 0) {
//         counter--;
//         scroll();
//     }
// }



// function right() {
//     if (counter < products.length - 3) {
//         console.log(counter, products.length - 1 )
//         counter++;
//         scroll();
//     } else {
//         // Aquí puedes decidir qué hacer cuando llegas al final de los slides
//         // Por ejemplo, reiniciar el contador a cero
//          counter = 1;
//     }
// }

// function scroll() {
//     products.forEach(function (item) {
//         item.style.transform = `translateX(${counter * -250}px)`;
//     });
// }


