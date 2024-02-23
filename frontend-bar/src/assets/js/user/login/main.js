document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input-container input');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.nextElementSibling.classList.add('active');
        });

        input.addEventListener('blur', function () {
            if (this.value === '') {
                this.nextElementSibling.classList.remove('active');
            }
        });

        // Comprueba si el input tiene algún valor al cargar la página
        if (input.value !== '') {
            input.nextElementSibling.classList.add('active');
        }
    });
});


function myFunction() {
    let x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}