const { response } = require('express');
const mongoose = require('mongoose');
const Local = mongoose.model('Local');

const categoriasAll = (req, res) => {
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
                .json(local.categorias);
        })
}

const categoriaReadOne = (req, res) => {
    if(!req.params.localid || !req.params.categoriaid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local, falta el localId/categoriaid"});

    }
    Local
        .findById(req.params.localid)
        .select('nombreDelLocal categorias')
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
            if(local.categorias && local.categorias.length > 0){
                const categoria = local.categorias.id(req.params.categoriaid);
                if(!categoria){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    response = {
                        local:{
                            nombreDelLocal: local.nombreDelLocal,
                            id: req.params.localid
                        },
                        categoria
                    };
                    return res
                            .status(200)
                            .json(response);
                }
            }else{
                return res
                        .status(400)
                        .json({"message":"No se encontraron categorias para este local"});
            }
            
         
        })
}

const categoriaUpdateOne = (req, res) => {
    console.log('Parametros enviados:', req.params.localid, req.params.categoriaid);
    if(!req.params.localid || !req.params.categoriaid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el localid/categoriaid"
                });
    }
    Local
        .findById(req.params.localid)
        .select('nombreDelLocal categorias') //Agregar parametros al query
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
            if(local.categorias && local.categorias.length > 0){
                const thisCategoria = local.categorias.id(req.params.categoriaid);
                if(!thisCategoria){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    if(req.file){
                        const url = req.protocol + '://' + req.get('host');
                        const iconPath = url + '/public/uploads/' + req.file.filename;
                        const iconUrl = url + '/' + req.file.filename;
                        console.log('iconUrl:', iconUrl);
                        thisCategoria.label = req.body.label;
                        thisCategoria.puesto = req.body.puesto;
                        thisCategoria.iconPath = iconPath;
                        thisCategoria.iconUrl = iconUrl
                        
                
                    }else{
                        const url = '';
                        const iconPath = '';
                        const iconUrl = '';
                        console.log('iconUrl:', iconUrl);
                        thisCategoria.label = req.body.label;
                        thisCategoria.puesto = req.body.puesto;
                        thisCategoria.iconPath = iconPath;
                        thisCategoria.iconUrl = iconUrl
                    }
                    
                    local.save((err, local) =>{
                        if(err){
                            res
                                .status(404)
                                .json(err);
                        }else{
                            res
                                .status(200)
                                .json(thisCategoria);
                        }
                    })
                }
            }
        });

           

       
}

const categoriaRemoveOne = (req, res) => {
    console.log('Parametro enviado:', req.params.localid);
    if(!req.params.localid || !req.params.categoriaid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local, falta el localid/categoriaid"
                });
    }
    Local
        .findById(req.params.localid)
        .select('nombreDelLocal categorias') //Agregar parametros al query
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
            if(local.categorias && local.categorias.length > 0){
                
                if(!local.categorias.id(req.params.categoriaid)){
                    return res
                            .status(404)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    let puesto =local.categorias.id(req.params.categoriaid).puesto;
                    local.categorias.forEach((categoria) =>{
                        if(categoria.puesto>puesto){
                            categoria.puesto--;
                        }
                    });
                    local.categorias.id(req.params.categoriaid).remove();
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
                    .json({"message":"No se encontró la categoria para eliminar"});
            }
        });

           

       
}

const pruebaDelete = (req, res) =>{
    console.log('PruebaDelete,localid y categoriaid', req.params.localid, req.params.categoriaid);
    return res
        .status(200)
        .json({"message": "Delete recibido"});
}


const categoriaCreate = (req, res) => {
    //console.log('Ingreso a categoriaCreate, parametros: req.params.localid, req.body.label ', req.params.localid, req.body.label);
    //console.log('categoriaCreate,file:', req.file);
    if(!req.params.localid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local, falta el localId"});

    }
    if(!req.body.label || !req.body.puesto){
        return res
            .status(400)
            .json({"message": "Falta completar los campos obligatorios label/puesto de la Categoria!"});

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
            doAddCategory(req, res, local);
        })

}

const doAddCategory = (req, res, local) => {
    const {label, puesto} = req.body;
    local.categorias.forEach((categoria) =>{
        if(categoria.puesto>=puesto){
            categoria.puesto++;
        }
    });
    if(req.file){
        const url = req.protocol + '://' + req.get('host');
        const iconPath = url + '/public/uploads/' + req.file.filename;
        const iconUrl = url + '/' + req.file.filename;
        console.log('iconUrl:', iconUrl);
        local.categorias.push({
                iconPath,
                iconUrl,
                label,
                puesto
        });

    }else{
        local.categorias.push({
            label,
            puesto
        });
    }
    
    local.save((err, local) => {
            if(err){
                res
                    .status(400)
                    .json(err);
            }else{
                const thisLocal = local.categorias.slice(-1).pop();
                res
                    .status(201)
                    .json(thisLocal);
            }
        });
}



module.exports = {
    categoriaCreate,
    categoriasAll,
    categoriaReadOne,
    categoriaUpdateOne,
    categoriaRemoveOne,
    pruebaDelete
    
    
}