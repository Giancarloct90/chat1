// VAR
const divUsuarios = document.getElementById('divUsuarios');
const divChatbox = document.getElementById('divChatbox');


// FUNCTIONS
const renderizarUsuarios = (personas) => {
    // console.log(personas);
    let html = '';
    html += '<li>';
    html += '<span> Usuarios Online </span>';
    html += '</li>';
    personas.map(persona => {
        html += '<li>';
        html += `<a href="javascript:void(0)"><img src="img/1.jpg" alt="user-img" class="img-circle"> <span>${persona.nombre} <small class="text-success">online</small></span></a>`;
        html += '</li>';
    });
    divUsuarios.innerHTML = html;
    // console.log(resp);
};

const renderizarMensajes = (msj) => {
    var li = document.createElement("li");
    let html = '';
    fecha = new Date(msj.fecha);
    hora = `${fecha.getHours()}:${fecha.getMinutes()}`
    html += `<li>`;
    html += `<div class="chat-img"><img src="img/1.jpg" alt="user" /> </div>`;
    html += `<div class="chat-content"> <h5>${msj.nombre}</h5> <div class="box bg-light-info">${msj.mensaje}</div></div>`;
    html += `<div class="chat-time">${hora}</div>`;
    html += `</li>`;
    li.innerHTML = html;
    divChatbox.appendChild(li);
};