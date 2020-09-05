const User = require('../models/user')

module.exports = function (app){


    app.get('/allvideos',(req,res)=>{
        
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
    
        
        User.getAllVideosVimeo((err,data)=>{
           res.status(200).json(data);
           
       })
    });

    app.get('/albums',(req,res)=>{        
       
        
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
    
        User.getAlbums((err,data)=>{
            res.status(200).json(data);
            
        })
     });

     app.get('/videos/:presentacion',(req,res)=>{        
       
        
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
        var _config = req.params.presentacion;
        User.getAlbums(_config,(err,data)=>{
            res.status(200).json(data);
            
        })
     });

 

     
   
     
}