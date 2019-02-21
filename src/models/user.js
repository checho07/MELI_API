let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo('f7d161d7174cd2d2a8c52f8ac278c6bc3f24b084','w/1ZvYS8JA+oD1GRvbDVx6H09Q/+3lXgl7x+lsK6y9gTNHTfStN1WqciMFcfFrDMJwvsv0W1PPMBOKhQqzUUv3Pe8DGsy+8bvzK/Qj97QAnU9rrjtVya6RH0WWLlhwEZ','bd5793a910a407ac9960e68a947d320a');

let userModel = {};

 userModel.getVideos =(callback)=>{

    client.request(
        {
            method:'GET',
            path: '/me/albums/5781646/videos',
            query:{
                
                fields:'uri,'
            }
        },function(error, body, status_code, headers){
            if(error){
                console.log('ERROR'+error)
            };
            callback(null,body)
            console.log(headers)
        }
        )
 }

 module.exports = userModel;