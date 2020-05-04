class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre) {
        this.personas.push({
            id,
            nombre
        });

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala() {

    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
};