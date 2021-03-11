const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const opcionCantidadDeSaboresSchema = new mongoose.Schema({
    titulo:{type:String, required:true},
    constoAdicional:Number
});
const opcionSaboresSchema = new mongoose.Schema({
    titulo:{type:String, required:true},
    costoAdicional:Number
});
const opcionTamanosSchema = new mongoose.Schema({
    titulo:{type:String, required:true},
    iconPath: String,
    iconUrl: String,
    precio:Number
});

const extraToppingSchema = new mongoose.Schema({
    titulo:{type:String, required:true},
    constoAdicional:Number
});

const opcionPromocion = new mongoose.Schema({
    precioActual:{type:Number, required:true},
    precioAnterior:{type:Number, required:true},
    descuento:{type:Number, required:true},
   
})

const menuitemSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    categoria:{type:Schema.Types.ObjectId, ref:'Category'},
    descripcion: String,
    tamano:String,
    precio:{type:Number, required:true},
    imagenUrl:String,
    promocion: opcionPromocion
});

const categoriaSchema = new mongoose.Schema({
    titulo: {type: String, required: true, unique: true},
    descripcion:String,
    puesto: {type:Number, unique: true},
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
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    categorias:[categoriaSchema]
     
    
});

mongoose.model('Local', localSchema, 'locales');
mongoose.model('Category', categoriaSchema, 'categorias');
