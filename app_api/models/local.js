const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const propiedadTamanosSchema = new mongoose.Schema({
    titulo:{type:String, required:true},
    fotoUrl: String,
    descripcion:String,
    precio:Number
});

const extraToppingSchema = new mongoose.Schema({
    titulo:{type:String, required:true},
    constoAdicional:Number
});



const menuitemSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    seccion:{type:Schema.Types.ObjectId, ref:'Seccion'},
    tamanos:[]
});

const seccionSchema = new mongoose.Schema({
    titulo: {type: String, required: true, unique: true},
    descripcion:String,
    puesto: {type:Number, unique: true},
    iconUrl: String,
    menuitems:[menuitemSchema]
});



const promocionSchema = new mongoose.Schema({
    iconPath: String,
    iconUrl: {type:String, required: true, unique: true},
    nombre: String,
    descripcion: {type:String, required: true, unique: true},
    precioAnterior:{type:Number, required: true, unique: true},
    precioActual: {type:Number, required: true, unique: true},
    descuento: {type:Number, required: true, unique: true},
    promocionIconUrl:String
});

const localSchema = new mongoose.Schema({
    
    nombreDelLocal: {
        type: String,
        required: true,
        unique: true
    },
    ruc: {
        type: String,
        required: true,
        unique: true
    },
    direccionDelLocal: {
        type: String,
        required: true
    },
    nombreDelContacto: {
        type: String,
        required: true
    },
    emailDelContacto: {
        type: String,
        required: true,
        unique: true
    },
    celularDelContacto: {
        type: String,
        required: true
    },
    urlMenuDigital:{
        type: String,
        required: true,
        unique: true
    },
    localNameUrl:{
        type: String,
        required: true,
        unique: true
    },
    estatus:{
        type:Number,
        required:true,
        default:0
    },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    seccionesMenu:[seccionSchema]
     
    
});

mongoose.model('Local', localSchema, 'locales');
mongoose.model('Seccion', seccionSchema, 'secciones');
