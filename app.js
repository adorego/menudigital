require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');


require('./app_api/models/db');
require('./app_api/config/passport');

//const usersRouter = require('./app_api/routes/users');

const app = express();
const apiRouter = require('./app_api/routes/index');



//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_public')));
app.use(express.static(path.join(__dirname, 'public/uploads')));

app.use(passport.initialize());
app.use(cors());
//app.use('/api', (req, res, next) => { 
//    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//    next();
//  });


app.use('/api', apiRouter);
//app.use('/users', usersRouter);

//Error Handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
  res.status(err.status || 500);
  res.render('error');
});
  
app.use((err, req, res, next) =>{
    if(err.name === 'UnauthorizedError'){
      console.log('Error en la autorizacion');
      res
        .status(401)
        .json({"message": err.name + ":" + err.message});
    }
});
module.exports = app;
