let Vimeo = require('vimeo').Vimeo;
var admin = require('firebase-admin');
let client = new Vimeo('f7d161d7174cd2d2a8c52f8ac278c6bc3f24b084','w/1ZvYS8JA+oD1GRvbDVx6H09Q/+3lXgl7x+lsK6y9gTNHTfStN1WqciMFcfFrDMJwvsv0W1PPMBOKhQqzUUv3Pe8DGsy+8bvzK/Qj97QAnU9rrjtVya6RH0WWLlhwEZ','bd5793a910a407ac9960e68a947d320a');
var cvivoAnalitycsKey = require("../../cvivoAnalitycsKey.json");
var cvivoMainKey = require("../../cvivoMainKey.json");
let userModel = {};
var cvivoMain;



 

  function initializeApp() {   


  
    admin.initializeApp({
        credential: admin.credential.cert(cvivoAnalitycsKey)
    });   

    cvivoMain = admin.initializeApp({credential: admin.credential.cert(cvivoMainKey)},'CvivoMain');

    
  }

  initializeApp();

userModel.createCounter = (params,callback)=>{
    
    const db = admin.firestore();
    var batch = db.batch();

    // Initialize the counter document
    batch.set(db.collection(params.collectionName).doc(params.counterName), { num_shards: 10 });

    // Initialize each shard with count=0
    for (let i = 0; i < 10; i++) {
        let shardRef = db.collection(params.collectionName).doc(params.counterName).collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }
    batch.commit()
    .then(()=>callback(null,'succes'))
   
    
}  

userModel.getCount= (params,callback)=> {

    const db = admin.firestore();
    let ref = db.collection(params.collectionName).doc(params.counterName);
    // Sum the count of each shard in the subcollection
     ref.collection('shards').get().then(snapshot => {
        let total_count = 0;
        snapshot.forEach(doc => {
            total_count += doc.data().count;
        });
        callback(null, total_count)
        
    });
}

userModel.incrementCounter =(params, callback)=> {
    // Select a shard of the counter at random
    const db = admin.firestore();
    let num_shards = 10
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    let ref = db.collection(params.collectionName).doc(params.counterName);

    const shard_ref = ref.collection('shards').doc(shard_id);
    shard_ref.update("count", admin.firestore.FieldValue.increment(1));
    callback(null, shard_ref)

}

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