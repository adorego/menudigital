const mongoose = require('mongoose');
const Local = mongoose.model('Local');


const localCreate = (req, res) => {
    console.log('req.body.nombreDelLocal', req.body.nombreDelLocal);
    
    if(!req.body.nombreDelLocal || !req.body.ruc || !req.body.direccionDelLocal || !req.body.nombreDelContacto || !req.body.emailDelContacto || !req.body.celularDelContacto){
        console.log('Faltan datos en el request');
        return res
            .status(400)
            .json({"message": "Faltan completar los campos!"});

    }
    Local.create({
        nombreDelLocal: req.body.nombreDelLocal,
        ruc: req.body.ruc,
        direccionDelLocal: req.body.direccionDelLocal,
        nombreDelContacto: req.body.nombreDelContacto,
        emailDelContacto: req.body.emailDelContacto,
        celularDelContacto: req.body.celularDelContacto,
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
const localUpdateOne = (req, res) => {
    console.log('Parametro enviado:', req.params.localid);
    if(!req.params.localid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el localId"
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
            local.nombreDelLocal = req.body.nombreDelLocal;
            local.ruc = req.body.ruc;
            local.direccionDelLocal = req.body.direccionDelLocal;
            local.nombreDelContacto = req.body.nombreDelContacto;
            local.emailDelContacto = req.body.emailDelContacto;
            local.celularDelContacto = req.body.celularDelContacto;
            local.save((err, localUpdated) =>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                } else{
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
    localReadByUserId
    
}