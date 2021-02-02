const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const register = (req, res) => {
    
    if(!req.body.name || !req.body.email || !req.body.password){
        return res
            .status(400)
            .json({"message": "Faltan completar los campos!"});

    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.role = req.body.role?req.body.role:'user'; 
    user.save((err) => {
        if(err){
            res
                .status(404)
                .json('Error al guardar en la BD:'+err);
        }else{
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        }
    });
}

const login = (req, res) => {
    console.log("Ingreso a login");
    if(!req.body.email || !req.body.password){
        return res
        .status(400)
        .json({"message": "Se requieren todos los campos"});
    }
    passport.authenticate('local', (err, user, info) => {
        let token;
        if(err){
            return res
                .status(404)
                .json(err);
        }
        if(user){
            token = user.generateJwt();
            res
                .status(200)
                .json({token});
        } else{
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};
module.exports = {
    register,
    login
};