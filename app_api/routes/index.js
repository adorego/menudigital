const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});
var multer  = require('multer');
/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype)
    }
  })
  */
var upload = multer({ dest: './public/uploads/' });
//var upload = multer({ storage:storage})

//Controller
const ctrlAuth = require('../controllers/authentication');
const ctrlLocales = require('../controllers/locales');
const ctrlSecciones = require('../controllers/secciones');
const ctrlMenuitems = require('../controllers/menuitems');
const ctrlMenuDigital = require('../controllers/menudigital');


//Delete prueba
//router.delete('/locales/:localid/categorias/:categoriaid', ctrlCategorias.pruebaDelete);
  

//CRUD locales
router
    .route('/locales')
    .post(auth, ctrlLocales.localCreate);
    

router
    .route('/locales/:localid')
    .get(ctrlLocales.localReadOne)
    //.get(auth, ctrlAdmin.localReadOne)
    .put(auth, ctrlLocales.localUpdateOne);
    //.delete(ctrlAdmin.localDeleteOne);
    
router
    .route('/locales/byuser/:userid')
    .get(auth, ctrlLocales.localReadByUserId);

router  
    .route('/locales/byurlmenu/:urlmenu') 
    .get(auth, ctrlLocales.localReadAllByUrlMenu);   

//Secciones

router
    .route('/locales/:localid/secciones')
    .get(auth, ctrlSecciones.seccionesAll)
    .post(auth, upload.single('icono'), ctrlSecciones.seccionCreate);

router 
    .route('/locales/:localid/secciones/:seccionid')
    .get(auth, ctrlSecciones.seccionReadOne)
    .put(auth, upload.single('icono'), ctrlSecciones.seccionUpdateOne)
    .delete(ctrlSecciones.seccionRemoveOne);

//MenuItems

router
    .route('/locales/:localid/secciones/:seccionid/menuitems')
    .get(auth, ctrlMenuitems.menuItemsReadAll)
    .post(auth, upload.single('foto'), ctrlMenuitems.menuItemCreate);



router 
    .route('/locales/:localid/secciones/:seccionid/menuitems/:menuitemid')
    .get(auth, ctrlMenuitems.menuItemReadOne)
    .put(auth, ctrlMenuitems.menuitemUpdateOne)
    .delete(auth, ctrlMenuitems.menuitemRemoveOne);

//MenuItems tamanos
router  
    .route('/locales/:localid/secciones/:seccionid/menuitems/:menuitemid/tamanos')
    .post(auth, upload.single('foto'), ctrlMenuitems.addTamanoMenuItem);

//MenuDigital
router
    .route('/menudigital/:localname')
    .get(ctrlMenuDigital.menuDigitalRead);



router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);



module.exports = router;
