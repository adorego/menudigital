const mongoose = require('mongoose');
const Local = mongoose.model('Local');

const seccionesAll = (req, res) => {
    console.log('SeccionesAll, parametro:', req.params.localid);
    if(!req.params.localid){
        return res
            .status(404)
            .json({"message": "Se debe incluir el localId como parametro"});

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
                .json(local.seccionesMenu);
        })
}

const seccionReadOne = (req, res) => {
    if(!req.params.localid || !req.params.seccionid){
        return res
            .status(404)
            .json({"message": "No se ennviaron los parametros de localid/seccionid"});

    }
    Local
        .findById(req.params.localid)
        .select('nombreDelLocal seccionesMenu')
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
            if(local.seccionesMenu && local.seccionesMenu.length > 0){
                let seccion = local.seccionesMenu.id(req.params.seccionid);
                if(!seccion){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la sección"});
                }else{
                    let response = {
                        local:{
                            nombreDelLocal: local.nombreDelLocal,
                            id: req.params.localid
                        },
                        seccion
                    };
                    return res
                            .status(200)
                            .json(response);
                }
            }else{
                return res
                        .status(400)
                        .json({"message":"No se encontraron secciones para este local"});
            }
            
         
        })
}

const seccionUpdateOne = (req, res) => {
    console.log('Parametros enviados:', req.params.localid, req.params.seccionid);
    if(!req.params.localid || !req.params.seccionid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el localid/seccionid"
                });
    }
    Local
        .findById(req.params.localid)
        .select('nombreDelLocal seccionesMenu') //Agregar parametros al query
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
            if(local.seccionesMenu && local.seccionesMenu.length > 0){
                const thisSeccion = local.seccionesMenu.id(req.params.seccionid);
                if(!thisSeccion){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la sección"});
                }else{
                    if(req.file){
                        const url = req.protocol + '://' + req.get('host');
                        const iconPath = url + '/public/uploads/' + req.file.filename;
                        const iconUrl = url + '/' + req.file.filename;
                        thisSeccion.titulo = req.body.titulo;
                        thisSeccion.descripcion = req.body.descripcion;
                        thisSeccion.puesto = req.body.puesto;
                        thisSeccion.iconUrl = iconUrl;
                        
                
                    }else{
                        const url = '';
                        const iconPath = '';
                        const iconUrl = '';
                        console.log('iconUrl:', iconUrl);
                        thisSeccion.titulo = req.body.titulo;
                        thisSeccion.descripcion = req.body.descripcion;
                        thisSeccion.puesto = req.body.puesto;
                        thisSeccion.iconUrl = iconUrl;
                    }
                    
                    local.save((err, local) =>{
                        if(err){
                            res
                                .status(404)
                                .json(err);
                        }else{
                            res
                                .status(200)
                                .json(thisSeccion);
                        }
                    })
                }
            }
        });

           

       
}

const seccionRemoveOne = (req, res) => {
    console.log('Parametro enviado:', req.params.localid);
    if(!req.params.localid || !req.params.seccionid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el localid/seccionid"
                });
    }
    Local
        .findById(req.params.localid)
        .select('nombreDelLocal seccionesMenu') //Agregar parametros al query
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
            if(local.seccionesMenu && local.seccionesMenu.length > 0){
                
                if(!local.seccionesMenu.id(req.params.seccionid)){
                    return res
                            .status(404)
                            .json({"message":"No se encontró la sección"});
                }else{
                    let puesto =local.seccionesMenu.id(req.params.seccionid).puesto;
                    local.seccionesMenu.forEach((seccion) =>{
                        if(seccion.puesto>puesto){
                            seccion.puesto--;
                        }
                    });
                    local.seccionesMenu.id(req.params.seccionid).remove();
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
                }
            }else{
                res
                    .status(404)
                    .json({"message":"No se encontró la sección para eliminar"});
            }
        });

           

       
}

const seccionCreate = (req, res) => {
    
    if(!req.params.localid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local, falta el localId"});

    }
    if(!req.body.titulo || !req.body.puesto){
        return res
            .status(400)
            .json({"message": "Falta completar los campos obligatorios de titulo/puesto de la Sección!"});

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
            doAddSeccion(req, res, local);
        })

}

const doAddSeccion = (req, res, local) => {
    const {titulo, puesto, descripcion} = req.body;
    local.seccionesMenu.forEach((seccion) =>{
        if(seccion.puesto>=puesto){
            seccion.puesto++;
        }
    });
    local.seccionesMenu.push({
            titulo,
            puesto,
            descripcion
    });
    
    
    local.save((err, local) => {
            if(err){
                res
                    .status(400)
                    .json(err);
            }else{
                const newSeccion = local.seccionesMenu.slice(-1).pop();
                res
                    .status(201)
                    .json(newSeccion);
            }
        });
}



module.exports = {
    seccionesAll,
    seccionReadOne,
    seccionUpdateOne,
    seccionRemoveOne,
    seccionCreate
    
    
    
}