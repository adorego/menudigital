const mongoose = require('mongoose');
const Local = mongoose.model('Local');


const menuItemsReadAll = (req, res) => {
    if(!req.params.localid || !req.params.categoriaid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local, falta el localid/categoriaid"});

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
            if(!local.categorias && !local.categorias.length >0){
                const thisCategoria = local.categorias.id(req.params.categoriaid); 
                if(!thisCategoria){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    res
                        .status(200)
                        .json(thisCategoria.menuitems);
                }
            }
        })
}

const menuitemReadOne = (req, res) => {
    if(!req.params.localid || !req.params.categoriaid || !req.params.menuitemid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local/Categoria/MenuItem, falta el localId/categoriaid/menuitemid"});

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
                    const thisMenuItem = categoria.menuitems.id(req.params.menuitemid)
                    if(!thisMenuItem){
                        return res
                            .status(400)
                            .json({"message":"No se encontró el MenuItem"});
                    }else{
                        return res
                                    .status(200)
                                    .json(thisMenuItem);
                    }
                    
                }
            }else{
                return res
                        .status(400)
                        .json({"message":"No se encontraron categorias para este local"});
            }
            
         
        })
}

const menuitemUpdateOne = (req, res) => {
    console.log('Parametros enviados:', req.params.localid, req.params.categoriaid, req.params.menuitemid);
    if(!req.params.localid || !req.params.categoriaid || !req.params.menuitemid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local/Categoria/MenuItem, falta el localid/categoriaid/menuitemid"
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
                if(!categoria){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    const thisMenuItem = categoria.menuitems.id(req.params.menuitemid)
                    if(!thisMenuItem){
                        return res
                            .status(400)
                            .json({"message":"No se encontró el MenuItem"});
                    }else{
                        const {nombre, imagenes, descripcion, precioAnterior, precioActual} = req.body;
                        thisMenuItem.nombre = nombre;
                        thisMenuItem.imagenes = imagenes;
                        thisMenuItem.descripcion = descripcion;
                        thisMenuItem.precioAnterior = precioAnterior;
                        thisMenuItem.precioActual = precioActual;
                        local.save((err, local) =>{
                            if (err){
                                return res
                                .status(404)
                                .json(err);
                            }else{
                                res
                                    .status(200)
                                    .json(thisMenuItem);
                            }
                        })
                    }
                }
            }else{
                res
                    .status(404)
                    .json({
                        "message":"No hay categorias para el Local"
                    });
            }
        });

           

       
}

const menuitemRemoveOne = (req, res) => {
    console.log('Parametro enviado:', req.params.localid);
    if(!req.params.localid || !req.params.categoriaid || !req.params.menuitemid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local/Categoria/MenuItem, falta el localid/categoriaid/categoriaid"
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

                    if(!local.categorias.menuitems.id(req.params.menuitemid)){
                        return res
                            .status(404)
                            .json({"message":"No se encontró el menuitem"});
                    }else{
                        local.categorias.menuitems.id(req.params.menuitemid).remove();
                        local.save((err, local) =>{
                            if (err){
                                return res
                                .status(404)
                                .json(err);
                            }else{
                                res
                                    .status(204)
                                    .json(null);
                            }
                        });
                    }
                }
            }else{
                res
                    .status(404)
                    .json({"message":"No se encontró la categoria para eliminar"});
            }
        });

           

       
}
const menuItemCreate = (req, res) => {

    if(!req.params.localid || !req.params.categoriaid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local/Categoria, falta el localid/categoriaid"});

    }
    if(!req.body.nombre){
        return res
            .status(400)
            .json({"message": "Falta completar los campos obligatorios!"});

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
            if(local.categorias && local.categorias.length > 0){
                const thisCategoria = local.categorias.id(req.params.categoriaid);
                this.doAddMenuItem(req, res, local,thisCategoria);
                

            }
        })

}

const doAddMenuItem = (req, res, local,categoria) => {
    if(!categoria){
        res
            .status(404)
            .json({"message":"No se encontró la Categoria"});
    }else{
        const {nombre, imagenes, descripcion, precioAnterior, precioActual} = req.body;
        categoria.menuitems.push({
            nombre, imagenes, descripcion, precioAnterior, precioActual
        });
        local.save((err, local) => {
            if(err){
                res
                    .status(400)
                    .json(err);
            }else{
                const thisMenuItem = categoria.menuitems.slice(-1).pop();
                res
                    .status(201)
                    .json(thisMenuItem);
            }
        });
    }
}

module.exports = {
    menuItemsReadAll,
    menuItemCreate,
    menuitemReadOne,
    menuitemUpdateOne,
    menuitemRemoveOne
    
    
    
}