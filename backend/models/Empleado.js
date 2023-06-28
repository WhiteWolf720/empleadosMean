const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Empleado = new Schema({
    nombre: {
        type: String
    },
    departamento: {
        type: String
    },
    email: {
        type: String
    },
    telefono: {
        type: Number
    }
}, {
    collection: 'empleados'
})

module.exports = mongoose.model('Empleado', Empleado)

