const User = require('../models/user')

module.exports = function (app){

    app.get('/videos',(req,res)=>{
        
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
    
        
        User.getVideos((err,data)=>{
           res.status(200).json(data);
           
       })
    });

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

     app.get('/analitycs/createCounter',(req,res)=>{
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
        let params = {collectionName: req.query.collectionName, counterName: req.query.counterName }
        User.createCounter(params,(err,data)=>{
            res.status(200).json(data);
            res.status(500).json(err)
        })
     })

     // Counters CVIVO Analitycs ////

     app.get('/analitycs/getCounter',(req,res)=>{
        
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
        let params = {collectionName: req.query.collectionName, counterName: req.query.counterName }
        User.getCount(params,(err,data)=>{
            res.status(200).json(data);
        })
     })
     
     app.get('/analitycs/incrementCounter',(req,res)=>{
        let params = {collectionName: req.query.collectionName, counterName: req.query.counterName }
        User.incrementCounter(params,(err,data)=>{
            if(data){
                res.status(200).json(data)
            } else{
                res.status(500).json(err)
            }           
            
        })
     })
}