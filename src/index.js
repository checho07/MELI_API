const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {PORT=3000, LOCAL_ADDRESS='0.0.0.0'} = process.env

//settings
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });



// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data

app.use(express.static('public'));

// routes
require('./routes/userRoutes')(app);



app.listen(PORT, LOCAL_ADDRESS, () =>{
    // const address = app.address();
    console.log('server listening at:')
})



