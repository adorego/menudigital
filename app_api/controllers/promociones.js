const mongoose = require('mongoose');
const Local = mongoose.model('Local');

const promocionCreate = (req, res) =>{
    if(!req.params.localid || !req.params.categoriaid || !req.params.menuitemid){
        return res
            .status(400)
            .json({"message": "No se envio el parametro localid/categoriaid/menuitemid"});

    }
    console.log('req.body:', req.body);
    if(!req.body.precioAnterior || !req.body.precioActual || !req.body.descuento){
        return res
            .status(400)
            .json({"message": "No se envio el parametro precioActual/precioAnterior/descuento"});
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
                if(!thisCategoria){
                    return res
                            .status(404)
                            .json({"message":"No se encontró la categoria"});
                }
                let thisMenuItem = thisCategoria.menuitems.id(req.params.menuitemid);
                if(!thisMenuItem){
                    return res
                            .status(404)
                            .json({"message":"No se encontró el MenuItem"});
                }
                const {precioActual, precioAnterior, descuento} = req.body;
                const promocion = {precioActual, precioAnterior, descuento};
                thisMenuItem.promocion = promocion;

                local.save((err, local) => {
                    if(err){
                        res
                            .status(400)
                            .json(err);
                    }else{
                        res
                            .status(201)
                            .json(thisMenuItem.promocion);
                    }
                });


            }
        });
}

module.exports = {
    promocionCreate
   
}