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
            if(local.categorias && local.categorias.length>0)
            {
                let thiscategoria = local.categorias.id(req.params.categoriaid);
                if(!thiscategoria){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    return res  
                            .status(200)
                            .json(thiscategoria.menuitems);
                }
                
            }else{
                return res
                        .status(400)
                        .json({"message":"No se encontraron categorias para este local"});
            }
        })
}

const menuItemReadOne = (req, res) => {
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
                const thiscategoria = local.categorias.id(req.params.categoriaid);
                if(!thiscategoria){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    const thisMenuItem = thiscategoria.menuitems.id(req.params.menuitemid);
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
    console.log('Parametro enviado:', req.params.localid, ",", req.params.categoriaid, ",", req.params.menuitemid);
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
            console.log('Local encontrado:', local);
            if(local.categorias && local.categorias.length > 0){
                
                if(!local.categorias.id(req.params.categoriaid)){
                    return res
                            .status(404)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    console.log('Categorias encontradas:', local.categorias);
                    const categoria = local.categorias.id(req.params.categoriaid);
                    if(!categoria.menuitems || !categoria.menuitems.id(req.params.menuitemid)){
                        return res
                            .status(404)
                            .json({"message":"No se encontró el menuitem"});
                    }else{
                        categoria.menuitems.id(req.params.menuitemid).remove();
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
                    .json({"message":"No se encontró la categoria enviada"});
            }
        });

           

       
}



const menuItemCreate = (req, res) => {
    console.log('MenuItemCreate, parametro enviado:', req.params.localid, req.params.categoriaid);
    if(!req.params.localid || !req.params.categoriaid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local/Categoria, falta el localid/categoriaid"});

    }
    if(!req.body.nombre || !req.body.precio || !req.body.categoria){
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
                doAddMenuItem(req, res, local,thisCategoria);
                

            }
        })

}

const doAddMenuItem = (req, res, local, thiscategoria) => {
    console.log('doAddMenuItem.categoria', thiscategoria);
    if(!thiscategoria){
        res
            .status(404)
            .json({"message":"No se encontró la Categoria"});
    }else{
        const {nombre, descripcion, precio, tamano, categoria} = req.body;
        let imagenUrl;
        if(req.file){
            const url = req.protocol + '://' + req.get('host');
            imagenUrl = url + '/' + req.file.filename;
        }else{
            imagenUrl = '';
        }

        thiscategoria.menuitems.push({
            nombre, descripcion, tamano, precio, categoria,imagenUrl
        });
        local.save((err, local) => {
            if(err){
                res
                    .status(400)
                    .json(err);
            }else{
                const thisMenuItem = thiscategoria.menuitems.slice(-1).pop();
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
    menuItemReadOne,
    menuitemUpdateOne,
    menuitemRemoveOne,
    
    
    
    
}