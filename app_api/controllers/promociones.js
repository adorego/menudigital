const mongoose = require('mongoose');
const Local = mongoose.model('Local');


const promocionesReadAll = (req, res) =>{
    if(!req.params.localid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local, falta el localId"});

    }
    Local
        .findById(req.params.localid)
        .exec((err, local) => {
            if(!local){
                return res
                .status(404)
                .json({
                    "message": "No se encontró el Local"
                });
            }else if (err){
                return res
                .status(404)
                .json(err);
            }
            return res
                .status(200)
                .json(local.promociones);
        })
}
const promocionCreate = (req, res) =>{
    if(!req.params.localid){
        return res
            .status(404)
            .json({"message": "No se envio el localid en los parametros"});

    }
    console.log('Esto se envio en req.file:', req.file);
    if(!req.body.descripcion || !req.body.precioAnterior || !req.body.precioActual || !req.body.descuento){
        return res
            .status(400)
            .json({"message": "Falta completar los campos obligatorios!"});

    }
    if(!req.file){
        return res
            .status(400)
            .json({"message": "No se envio la imagen de la promo obligatoria!"});
    }
    Local
        .findById(req.params.localid)
        .exec((err, local) => {
            if(!local){
                return res
                        .status(404)
                        .json({"message":"No se encontro el local"});
            }
            else if(err){
                return res
                        .status(404)
                        .json(err);
            }else{
                doAddPromocion(req, res, local);
            }
        })
            
    
}

const doAddPromocion = (req, res, local) =>{
    const{descripcion, precioActual, precioAnterior, descuento} = req.body;
    const url = req.protocol + '://' + req.get('host');
    const iconPath = url + '/public/uploads/' + req.file.filename;
    const iconUrl = url + '/' + req.file.filename;
    let nombre = '';
    if(req.body.nombre){
        nombre = req.body.nombre;
    }
    const promocionIconUrl = url + '/promotion-icon.png'; 
    local.promociones.push({
        iconPath,
        iconUrl,
        nombre,
        descripcion,
        precioActual,
        precioAnterior,
        descuento,
        promocionIconUrl

    })

    local.save((err, local) => {
        if(err){
            res
                .status(400)
                .json(err);
        }else{
            const thisPromocion = local.promociones.slice(-1).pop();
            res
                .status(201)
                .json(thisPromocion);
        }
    });
}

const promocionDeleteOne = (req, res) =>{
    if(!req.params.localid || !req.params.promocionid){
        return res
                .status(404)
                .json({
                    "message": "No se envio el localid/promocionid"
                });
    }
    Local
        .findById(req.params.localid)
        .select('nombreDelLocal promociones') //Agregar parametros al query
        .exec((err, local) => {
            if(!local){
                return res
                .status(404)
                .json({
                    "message": "No se encontró el Local"
                });
            }else if (err){
                return res
                .status(404)
                .json(err);
            }
            if(local.promociones && local.promociones.length > 0){
                
                if(!local.promociones.id(req.params.promocionid)){
                    return res
                            .status(404)
                            .json({"message":"No se encontró la promocion"});
                }else{

                }
            }
            local.promociones.id(req.params.promocionid).remove();
            local.save((err) =>{
                if(err){
                    res
                       .status(404)
                       .json(err);
                }else{
                    res
                        .status(204)
                        .json(null);
                    }
                })
        });
}

const promocionPrueba = (req, res) => {
    console.log('Req.file', req.file);
    res
        .status(200)
        .json({"message":"Adelante cambio"});
}
module.exports = {
    promocionesReadAll,
    promocionCreate,
    promocionDeleteOne,
    promocionPrueba
}