const User = require('../models/user')

module.exports = function (app){

    app.get('/videos',(req,res)=>{
        
        User.getVideos((err,data)=>{
           res.status(200).json(data);
           
       })
    });

    app.get('/albums',(req,res)=>{        
       
        User.getAlbums((err,data)=>{
            res.status(200).json(data);
            
        })
     });
}