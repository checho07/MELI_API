const User = require('../models/user')

module.exports = function (app){  


     app.get('/moodle',(req, res) => {

        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'

        User.getMoodleUrl((err,data)=>{
            res.status(200).json(data);
        })
     })

 

     
   
     
}