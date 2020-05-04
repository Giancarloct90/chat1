// VAR
const btnIngresar = document.getElementById('btnIngresar');
const txtNombre = document.getElementById('txtNombre');
const lblMsj = document.getElementById('lblMsj');

// EVENTS LISTENERS
btnIngresar.addEventListener('click', function () {
    if (txtNombre.value) {
        lblMsj.style.display = 'none';
        window.location.replace(`/chat?nombre=${txtNombre.value}`);
    } else {
        lblMsj.style.display = '';
        lblMsj.style.color = 'red';
        lblMsj.innerHTML = 'Favor ingrese el nombre de usuario';
    }
});

// FUNCTIONS