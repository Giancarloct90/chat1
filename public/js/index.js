// inicializamos una variable con la funcion io que se encuentra en el archivo socket.io.js
// var
const btnSend = document.getElementById('btnSend');
const txtMsj = document.getElementById('txtMsj');

btnSend.addEventListener('click', sendMsj);

var socket = io();
// para conectarnos al servidor ejecutamos la funcion io, con dos parametros uno es string connect y cuando se ejecute,
// ejecutara el callback que en este caso es un console.log

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre')
}
socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function (resp) {
        // console.log(resp);
        renderizarUsuarios(resp);
    });
});

// para saber si se desconecto el server
// on es para escuchar, emmit es para emitir
socket.on('disconnect', function () {
    console.log('Perdimos conexion con el servidor');
});

socket.on('crearMensaje', function (resp) {
    console.log(resp);
});

socket.on('listaPersonas', function (resp) {
    // console.log('aquivamos');
    renderizarUsuarios(resp);
});

// Mensaje Privado
// socket.on('mensajePrivado', function (mensaje) {
//     console.log('Mensaje Privado: ', mensaje);
// });

// enviar mensaje a todos
// socket.emit('crearMensaje', {
//     usuario: 'Jack',
//     mensaje: 'Hola a todos'
// }, function (resp) {
//     console.log('respuesta del server:', resp);
// });

socket.on('crearMensaje', function (msj) {
    renderizarMensajes(msj);
});

function sendMsj() {
    //enviar mensaje a todos
    if (txtMsj.value) {
        socket.emit('crearMensaje', {
            mensaje: txtMsj.value
        }, function (msj) {
            renderizarMensajes(msj);
        });
        txtMsj.value = '';
    } else {
        alert('El campo de text no puedo estar vacio');
    }

}