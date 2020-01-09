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

     
     // Counters CVIVO Analitycs ////

     app.get("/analitycs/counters",(req,res)=>{
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'PATCH,POST, GET, PUT, DELETE, OPTIONS'
        User.getAllCounter((err,data)=>{
            res.status(200).json(data);
        })
     })

     app.patch('/analitycs/counters',(req,res)=>{
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'PATCH,POST, GET, PUT, DELETE, OPTIONS'
        var _counter = req.body;
        User.updateCounter(_counter,(err,data)=>{
            res.status(200).json(data)
        })
     })

     app.post('/analitycs/videos',(req,res)=>{
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
       var _data = req.body;
       User.addVideoCounter(_data,(err,data)=>{
           res.status(200).json(data)
       })
    
     })
     app.get('/analitycs/videos',(req,res)=>{
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
       var _data = {uid:req.query.uid, videoId: req.query.videoId};
       User.getVideoCounter(_data,(err,data)=>{
           res.status(200).json(data)
       })
    
     })

     app.get('/analitycs/channel/createCounter',(req,res)=>{
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
        let params = {collectionName: req.query.collectionName, counterName: req.query.counterName }
        User.createCounter(params,(err,data)=>{
            res.status(200).json(data);
            res.status(500).json(err)
        })
     })


     app.get('/analitycs/channel/getCounter',(req,res)=>{
        
        res.header = 'Access-Control-Allow-Origin', '*'
        res.header ='Access-Control-Allow-Credentials', true
        res.header ='Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'
        let params = {collectionName: req.query.collectionName, counterName: req.query.counterName }
        User.getCount(params,(err,data)=>{
            res.status(200).json(data);
        })
     })
     
     app.get('/analitycs/channel/incrementCounter',(req,res)=>{
        let params = {collectionName: req.query.collectionName, counterName: req.query.counterName }
        User.incrementCounter(params,(err,data)=>{
            if(data){
                res.status(200).json("Succes")
            } else{
                res.status(500).json(err)
            }           
            
        })
     })

     
}