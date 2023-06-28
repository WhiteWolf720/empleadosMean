const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

//conexion con la base de datos de mongo
mongoose
    //.connect('mongodb://127.0.0.1:27017/empleadosds01sv22')
    .connect('mongodb+srv://diegooyti20:1234@ds01.b3xpkxh.mongodb.net/empleadosds01sv22?retryWrites=true&w=majority')
    .then((x) => {
        console.log(`conexion establecida con la BD: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.log('Error al establacer conexion con BD', err.reason)
    })

//configuracion del servidor web
const empleadoRuta = require('./routes/empleado.route')
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors())
app.use(express.static(path.join(__dirname,'dist/empleados-mean')))
app.use('/', express.static(path.join(__dirname,'dist/empleados-mean')))
app.use('/api', empleadoRuta)

//habilitar puerto
const port = process.env.port || 4000
const server = app.listen(port,() => {
    console.log('Conectado exitosamente al puerto'+port)
})

//manejador de error 404
app.use((req,res,next) =>{
    next(createError(404))
})

//manejador de errores general 
app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
    
})