let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo('f7d161d7174cd2d2a8c52f8ac278c6bc3f24b084','w/1ZvYS8JA+oD1GRvbDVx6H09Q/+3lXgl7x+lsK6y9gTNHTfStN1WqciMFcfFrDMJwvsv0W1PPMBOKhQqzUUv3Pe8DGsy+8bvzK/Qj97QAnU9rrjtVya6RH0WWLlhwEZ','bd5793a910a407ac9960e68a947d320a');

let userModel = {};

userModel.getVideos =(callback)=>{

    

    client.request(
        {
            method:'GET',
            path: '/me/projects/1073180/videos',
            query:{
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


userModel.getAllVideosVimeo =(callback)=>{

    

    client.request(
        {
            method:'GET',
            path: '/me/videos',
            query:{
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

 module.exports = userModel;