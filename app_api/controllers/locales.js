const mongoose = require('mongoose');
const Local = mongoose.model('Local');


const localCreate = (req, res) => {
    console.log('req.body.nombreDelLocal', req.body.nombreDelLocal);
    
    if(!req.body.nombreDelLocal || !req.body.ruc || !req.body.direccionDelLocal || !req.body.nombreDelContacto || 
        !req.body.emailDelContacto || !req.body.celularDelContacto || !req.body.urlMenuDigital  || !req.body.localNameUrl){
        console.log('Faltan datos en el request');
        return res
            .status(400)
            .json({"message": "No se enviaron todos los parametros para el alta"});

    }
    Local.create({
        nombreDelLocal: req.body.nombreDelLocal,
        ruc: req.body.ruc,
        direccionDelLocal: req.body.direccionDelLocal,
        nombreDelContacto: req.body.nombreDelContacto,
        emailDelContacto: req.body.emailDelContacto,
        celularDelContacto: req.body.celularDelContacto,
        urlMenuDigital: req.body.urlMenuDigital,
        localNameUrl: req.body.localNameUrl,
        user: req.payload._id
    }, (err, local) => {
        if(err){
            console.log('Error:',err);
            res
                .status(400)
                .json(err);

        }else{
            res
                .status(201)
                .json(local);
        }
    });
};

const localReadOne = (req, res) => {
    if(!req.params.localid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el localId"
                });
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
            res.status(200).json(local);
        });
}

const localReadByUserId = (req, res) => {
    //console.log('Ingreso a localReadByUserId:', req.params.userid);
    if(!req.params.userid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el userId"
                });
    }
    Local
        .find({user:req.params.userid})
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
            //console.log('Se encontró el Local:',JSON.stringify(local));
            res.status(200).json(local);
        })

   // return res.status(200).json({message:'Hola'});
}
const localReadOneByEmail = (req, res) => {
    console.log('Ingreso a localReadOneByEmail, email:', req.params.email );
    if(!req.params.email){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el email"
                });
    }
    Local
        .find({emailDelContacto:req.params.email})
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
            console.log('Se encontró el Local:',JSON.stringify(local));
            res.status(200).json(local);
        })
}

const localReadAllByUrlMenu = (req, res) => {
    console.log('Parametro enviado a localUrlMenuSugerido:', req.params.urlmenu);
    if(!req.params.urlmenu){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el parametro urlmenu"
                });
    }
    Local
        .find({urlMenuDigital:req.params.urlmenu})
        //.select() Agregar parametros al query
        .exec((err, locales) => {
            if (err){
                return res
                .status(404)
                .json(err);
            }
            console.log('Se encontró el Local:',JSON.stringify(locales));
            res.status(200).json(locales);
        });
        
    
}
const localUpdateOne = (req, res) => {
    console.log('Update, Parametro localid enviado:', req.params.localid);
    if(!req.params.localid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el localId"
                });
    }
    if(!req.body.nombreDelLocal || !req.body.ruc || !req.body.direccionDelLocal || !req.body.nombreDelContacto || 
        !req.body.emailDelContacto || !req.body.celularDelContacto || !req.body.urlMenuDigital  || !req.body.localNameUrl){
        return res
                .status(404)
                .json({
                    "message": "No se enviaron todos los parametros de actualización"
                });
    }

    Local
        .findById(req.params.localid)
        //.select() Agregar parametros al query
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
            console.log('Local encontrado:', local);
            local.nombreDelLocal = req.body.nombreDelLocal;
            local.ruc = req.body.ruc;
            local.direccionDelLocal = req.body.direccionDelLocal;
            local.nombreDelContacto = req.body.nombreDelContacto;
            local.emailDelContacto = req.body.emailDelContacto;
            local.celularDelContacto = req.body.celularDelContacto;
            local.urlMenuDigital = req.body.urlMenuDigital;
            local.localNameUrl = req.body.localNameUrl;
            local.save((err, localUpdated) =>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                } else{
                    console.log('Local actualizado con exito!');
                    res
                        .status(200)
                        .json(localUpdated);
                }
            });

        });
}


module.exports = {
    localCreate,
    localReadOne,
    localUpdateOne,
    localReadByUserId,
    localReadAllByUrlMenu
    
}