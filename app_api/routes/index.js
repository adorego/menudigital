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
const ctrlCategorias = require('../controllers/categorias');
const ctrlMenuItems = require('../controllers/menuitems');
const ctrlPromociones = require('../controllers/promociones');


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

//Categorias

router
    .route('/locales/:localid/categorias')
    .get(auth, ctrlCategorias.categoriasAll)
    .post(auth, upload.single('icono'), ctrlCategorias.categoriaCreate);

router 
    .route('/locales/:localid/categorias/:categoriaid')
    .get(auth, ctrlCategorias.categoriaReadOne)
    .put(auth, upload.single('icono'), ctrlCategorias.categoriaUpdateOne)
    //.delete(ctrlCategorias.categoriaRemoveOne);
    .delete(ctrlCategorias.categoriaRemoveOne);

//MenuItems

router
    .route('/locales/:localid/categorias/:categoriaid/menuitems')
    .get(auth, ctrlMenuItems.menuItemsReadAll)
    .post(auth, ctrlMenuItems.menuItemCreate);

router 
    .route('locales/:localid/categorias/:categoriaid/menuitems/:menuitemid')
    .get(auth, ctrlMenuItems.menuitemReadOne)
    .put(auth, ctrlMenuItems.menuitemUpdateOne)
    .delete(auth, ctrlMenuItems.menuitemRemoveOne);


//Promociones
router
    .route('/prueba/promociones')
    .post(upload.single('imagen'), ctrlPromociones.promocionPrueba);

router
    .route('/locales/:localid/promociones')
    .get(auth, ctrlPromociones.promocionesReadAll)
    .post(auth, upload.single('imagen'), ctrlPromociones.promocionCreate);

router
    .route('/locales/:localid/promociones/:promocionid')
    .delete(auth, ctrlPromociones.promocionDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);



module.exports = router;
