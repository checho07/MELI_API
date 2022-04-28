const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const {PORT=3000, LOCAL_ADDRESS='0.0.0.0'} = process.env

//settings
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

// app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// routes
require('./routes/userRoutes')(app);

// app.listen(app.get('port'),()=>{
//     console.log('server on port'+ app.PORT);
//     /*if (err) { 
//         throw err; 
//     } else { 
//         console.log ('server on port'+ app.PORT) 
//          process.env.NODE_ENV 
//     } */

// })

app.listen(PORT, LOCAL_ADDRESS, () =>{
    // const address = app.address();
    console.log('server listening at:')
})



