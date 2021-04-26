const mongoose = require('mongoose');
const Local = mongoose.model('Local');
const Menuitem = mongoose.model('Menuitem');
const Tamano = mongoose.model('Tamano');

const menuItemsReadAll = (req, res) => {
    if(!req.params.localid || !req.params.seccionid){
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local, falta el localid/seccionid"});

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
            if(local.seccionesMenu && local.seccionesMenu.length>0)
            {
                let thisseccion = local.seccionesMenu.id(req.params.seccionid);
                if(!thisseccion){
                    return res
                            .status(400)
                            .json({"message":"No se encontró la Sección"});
                }else{
                    return res  
                            .status(200)
                            .json(thisseccion.menuitems);
                }
                
            }else{
                return res
                        .status(400)
                        .json({"message":"No se encontraron secciones para este local"});
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
    console.log('Parametro enviado:', req.params.localid, ",", req.params.seccionid, ",", req.params.menuitemid);
    if(!req.params.localid || !req.params.seccionid || !req.params.menuitemid){
        return res
                .status(404)
                .json({
                    "message": "No se pudo encontrar el Local/Categoria/MenuItem, falta el localid/categoriaid/categoriaid"
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
            console.log('Local encontrado:', local);
            if(local.seccionesMenu && local.seccionesMenu.length > 0){
                
                if(!local.seccionesMenu.id(req.params.seccionid)){
                    return res
                            .status(404)
                            .json({"message":"No se encontró la categoria"});
                }else{
                    console.log('Secciones encontradas:', local.seccionesMenu);
                    const seccion = local.seccionesMenu.id(req.params.seccionid);
                    if(!seccion.menuitems || !seccion.menuitems.id(req.params.menuitemid)){
                        return res
                            .status(404)
                            .json({"message":"No se encontró el menuitem"});
                    }else{
                        seccion.menuitems.id(req.params.menuitemid).remove();
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
    console.log('MenuItemCreate, parametro enviado:', req.params.localid, req.params.seccionid);
    
    if(!req.params.localid || !req.params.seccionid){
        
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local/Categoria, falta el localid/seccionid"});

    }
    if(!req.body.nombre || !req.body.precio ){
        
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
            if(local.seccionesMenu && local.seccionesMenu.length > 0){
                console.log('Llego aqui', local.seccionesMenu.length);
                const thisSeccion = local.seccionesMenu.id(req.params.seccionid);
                doAddMenuItem(req, res, local,thisSeccion);
                

            }
        })

}

const doAddMenuItem = (req, res, local, thisSeccion) => {
    console.log('doAddMenuItem.seccion', thisSeccion);
    if(!thisSeccion){
        res
            .status(404)
            .json({"message":"No se encontró la Sección"});
    }else{
       
        let imagenUrl;
        if(req.file){
            const url = req.protocol + '://' + req.get('host');
            imagenUrl = url + '/' + req.file.filename;
        }else{
            imagenUrl = '';
        }
        
        let menuitem = new Menuitem();
        menuitem.nombre = req.body.nombre;
        menuitem.seccion = thisSeccion._id;
        let tamano = new Tamano();
        tamano.nombre = req.body.nombreTamano;
        tamano.descripcion = req.body.descripcion;
        tamano.cantidadDeSabores = req.body.cantidadDeSabores;
        tamano.cantidadDeComensales = req.body.cantidadDeComensales;
        tamano.cantidadDePorciones = req.body.cantidadDePorciones;
        tamano.pesoEnGr = req.body.pesoEnGr;
        tamano.precio = req.body.precio;
        tamano.fotoUrl = imagenUrl;
        menuitem.tamanos.push(tamano);
        //console.log('MenuItem:', menuitem);
        thisSeccion.menuitems.push(menuitem);
        console.log('thisSeccion:', thisSeccion);
        local.save((err, local) => {
            if(err){
                res
                    .status(400)
                    .json(err);
            }else{
                const thisMenuItem = thisSeccion.menuitems.slice(-1).pop();
                res
                    .status(201)
                    .json(thisMenuItem);
            }
        });
    }
}

const addTamanoMenuItem = (req, res) => {
    console.log('MenuItemCreate, parametro enviado:', req.params.localid, req.params.seccionid, req.params.menuitemid);
    
    if(!req.params.localid || !req.params.seccionid || !req.params.menuitemid){
        
        return res
            .status(404)
            .json({"message": "No se pudo encontrar el Local/Categoria, falta el localid/seccionid/menuitemid"});

    }
    if(!req.body.nombreTamano || !req.body.precio ){
        
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
            if(local.seccionesMenu && local.seccionesMenu.length > 0){
                const thisSeccion = local.seccionesMenu.id(req.params.seccionid);
                const thisMenuItem = thisSeccion.menuitems.id(req.params.menuitemid);
                let imagenUrl;
                if(req.file){
                    const url = req.protocol + '://' + req.get('host');
                    imagenUrl = url + '/' + req.file.filename;
                }else{
                    imagenUrl = '';
                }
                let tamano = new Tamano();
                tamano.nombre = req.body.nombreTamano;
                tamano.descripcion = req.body.descripcion;
                tamano.cantidadDeSabores = req.body.cantidadDeSabores;
                tamano.cantidadDeComensales = req.body.cantidadDeComensales;
                tamano.cantidadDePorciones = req.body.cantidadDePorciones;
                tamano.pesoEnGr = req.body.pesoEnGr;
                tamano.precio = req.body.precio;
                tamano.fotoUrl = imagenUrl;
                thisMenuItem.tamanos.push(tamano);
                console.log('thisSeccion:', thisSeccion);
                local.save((err, local) => {
                    if(err){
                        res
                            .status(400)
                            .json(err);
                    }else{
                        const thisTamano = thisMenuItem.tamanos.slice(-1).pop();
                        res
                            .status(201)
                            .json(thisTamano);
                    }
                });
                
            }
        });

}


module.exports = {
    menuItemsReadAll,
    menuItemCreate,
    menuItemReadOne,
    menuitemUpdateOne,
    menuitemRemoveOne,
    addTamanoMenuItem
    
    
    
    
}