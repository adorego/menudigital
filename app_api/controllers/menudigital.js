const mongoose = require('mongoose');
const Local = mongoose.model('Local');

const menuDigitalRead = (req, res) => {
    //console.log('Nombre del local:', req.params.localname);
    if(!req.params.localname){
        return res
            .status(404)
            .json({"message": "No se envió el nombre del local"});

    }
    Local
        .find({localNameUrl:req.params.localname})
        .exec((err, local) => {
            if(!local){
                return res
                .status(404)
                .json({
                    "message": "No se encontró el Local con ese nombre URL"
                });
            }else if (err){
                return res
                .status(404)
                .json(err);
            }
            if(local.categorias && local.categorias.length ==0){
                return res
                .status(404)
                .json({
                    "message": "El local no tiene MenuDigital"
                });
            }
            return res
                .status(200)
                .json(local[0]);
        });
}

module.exports = {
    menuDigitalRead
}