let Vimeo = require('vimeo').Vimeo;
var admin = require('firebase-admin');
let userModel = {};
let client = new Vimeo('29f16279edeff6b5cce56553bdde6bfde3fa5bae','c7tbCj5B4Vm9jKu0mnfFGAN65Ii8mTqJashZhwVdXotEFYzMn1bJWGxI3sVCYnuuzedGyFWulb+uaE1f/kTZvtoKbqfz6148+XjRJl/8vlmowKjoL2tnd4bAsI7h1ZOd','c40b58135194a632e482b22e2461d1ee');
require('dotenv').config();




userModel.getAllVideosVimeo =(callback)=>{    

    client.request(
        {
            method:'GET',
            path: '/me/videos',
            query:{
                page:1,
                per_page:100,
                fields:'uri,files,name,description,pictures.sizes'
            },
            headers:{"Access-Control-Allow-Origin":"*"}
           
          
        },function(error, body, status_code, headers){
            if(error){
                console.log('ERROR'+error)
            };
            callback(null,body.data)
            console.log(body)
        }
        )
 }

 userModel.getAlbums =(callback)=>{


    client.request(
        {
            method:'GET',
            path: '/me/albums',
            query:{
                fields:'name,metadata.connections.videos.uri'
            },
            headers:{"Access-Control-Allow-Origin":"*"}
           
          
        },function(error, body, status_code, headers){
            if(error){
                console.log('ERROR'+error)
            };
            callback(null,body.data)
            console.log(body)
        }
        )
 }   

 userModel.getVideosFromAlbum =(params, callback)=>{

    console.log("paramsUser:"+params)
    client.request(
        {
            method:'GET',
            path: `/me/albums/${params}/videos`,
            query:{
                fields:'name,metadata.connections.videos.uri'
            },
            headers:{"Access-Control-Allow-Origin":"*"}
           
          
        },function(error, body, status_code, headers){
            if(error){
                console.log('ERROR'+error)
            };
            callback(null,body.data)
            // console.log(body)
        }
        )
 } 



 module.exports = userModel;