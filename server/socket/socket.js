const {
    io
} = require('../server');

const {
    crearMensaje
} = require('../utils/utils');

const {
    Usuarios
} = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat', (data, fnCallback) => {
        if (!data.nombre) {
            return fnCallback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }
        fnCallback(usuarios.agregarPersona(client.id, data.nombre));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        client.broadcast.emit('crearMensaje', {
            usuario: 'Admin',
            mensaje: `${data.nombre} acaba de entrar al chat`
        });
        console.log(`se conecto al server ${data.nombre}`);
    });

    // Desconecciopn de usuario
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salio`));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());

    });

    // enviar mensajes a todos
    client.on('crearMensaje', (data, fnCallback) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));
        fnCallback(crearMensaje(persona.nombre, data.mensaje));
    });

    // Mensaje privados
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));
    });
});