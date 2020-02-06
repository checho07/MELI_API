let Vimeo = require('vimeo').Vimeo;
var admin = require('firebase-admin');
let client = new Vimeo('f7d161d7174cd2d2a8c52f8ac278c6bc3f24b084','w/1ZvYS8JA+oD1GRvbDVx6H09Q/+3lXgl7x+lsK6y9gTNHTfStN1WqciMFcfFrDMJwvsv0W1PPMBOKhQqzUUv3Pe8DGsy+8bvzK/Qj97QAnU9rrjtVya6RH0WWLlhwEZ','bd5793a910a407ac9960e68a947d320a');
var cvivoAnalitycsKey = require("../../cvivoAnalitycsKey.json");
var cvivoMainKey = require("../../cvivoMainKey.json");
var cvivoAdminKey = require("../../cvivo-admin-2020-Key.json")
let userModel = {};
var cvivoMain;
var cvivoAdmin;
const nodemailer = require("nodemailer");
require('dotenv').config();



let transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

function sendNewCouponMail(_userInfo){
    let mailOptions  = transporter.sendMail({
        from: "C-VIVO <cebiac@cun.edu.co>",
        to: ["oscar_moreno@cun.edu.co","sergio_velandia@cun.edu.co"],
        subject: "Cupon registrado",
        text: 
        `Cupon registrado: \n
         Fecha de registro: ${_userInfo.registerTime.toLocaleString()} \n
         Correo: ${_userInfo.email} \n
         Nombre: ${_userInfo.name} \n
         phone: ${_userInfo.phone}\n
        ` 
    })
}
function sendWorkerNotificationMail(_workerInfo){
     transporter.sendMail({
        from: "Horario <cebiac@cun.edu.co>",
        to: _workerInfo.email,
        subject: "Registro de llegada",       
        html: "<img src='https://bit.ly/2uV8MZj'>",
        icalEvent :{
            method :'publish',
            content:'evento de prueba'
        }
    
    },(err,response) =>{
      console.log(response)
    })


}
 
 function initializeApp() {

    admin.initializeApp({
        credential: admin.credential.cert(cvivoAnalitycsKey)
    }); 
    cvivoMain = admin.initializeApp({credential: admin.credential.cert(cvivoMainKey)},'CvivoMain');    
    cvivoAdmin = admin.initializeApp({credential: admin.credential.cert(cvivoAdminKey)},'CvivoAdmin');  
  }

  initializeApp();

  function videosViewResume(_videoId){
    
    const db = admin.firestore();
    let dbref = db.collection("videosViewResume").doc(_videoId);

    dbref.get().then(doc =>{

        if(doc.exists)
        {
            const shard_id = Math.floor(Math.random() * 10).toString();
            const shard_ref = dbref.collection('shards').doc(shard_id);
            shard_ref.update("count", admin.firestore.FieldValue.increment(1));
        }else
        {                  

        }
    })
  }


  

  //------ End functions ------//


  /// UserModel Methods

userModel.updateCounter = (params,callback)=>{
    const db = admin.firestore();
    var dbref1 = db.collection("counters").doc(params.counter);
    dbref1.update("count",admin.firestore.FieldValue.increment(1)).then(()=>{
        if(params.counter == "cupones"){            
            sendNewCouponMail(params)
            console.log(params)
        }
        callback(null,"counter updated");
    });

}  

userModel.getAllCounter = (callback)=>{
    const db = admin.firestore();
    var dbref = db.collection("counters").get().then(snapshot=>{  
        let _data = []
        snapshot.forEach(doc=>{          
            _data.push({id:doc.id,data:{...doc.data()}}); 
        })
        callback(null,_data);
    })
} 

userModel.addVideoCounter = (params,callback)=>{
    const db = admin.firestore();
    var batch = db.batch();
    var dbref1 = db.collection("videosCounter").doc(params.uid);
    var dbRef = db.collection("videosCounter").doc(params.uid).collection("videos").doc(params.videoId.toString())

    db.collection("videosCounter").doc(params.uid).collection("videos").doc(params.videoId.toString())
    .create({ num_shards: 10,videoId: params.videoId, channelVideo: params.channelVideo, videoName: params.videoName }).then(()=>{     
       
     
            batch.set(dbref1,{uid:params.uid, email: params.email })
            for(let i = 0; i < 10; i++){
                let shardRef = dbRef.collection("shards").doc(i.toString());
                batch.set(shardRef,{count:0});
            }
            batch.commit().then(()=>{
                callback(null,"created")
            }) 
        
    }).catch(()=>{
        const shard_id = Math.floor(Math.random() * 10).toString();  
        const shard_ref = dbRef.collection('shards').doc(shard_id);
        shard_ref.update("count", admin.firestore.FieldValue.increment(1));
        callback(null,"incremented");
    })
  
   
}  

userModel.getVideoCounter = (params,callback)=>{
    const db = admin.firestore();
    var dbRef = db.collection("videosCounter").doc(params.uid).collection("videos").doc(params.videoId.toString())
    
    // Sum the count of each shard in the subcollection
    dbRef.collection('shards').get().then(snapshot => {
        let total_count = 0;
        snapshot.forEach(doc => {
            total_count += doc.data().count;
        });
        callback(null, total_count)
        
    });

}


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
    .then(()=>{
        // this.incrementCounter(params)
        callback(null,'succes')})
   
    
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
            path: '/me/projects/1073180/videos',
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

 userModel.sendWorkerEmail = (params,callback)=>{
    sendWorkerNotificationMail(params)
    callback(null,'ok') 
 }

 /////////////////  CVIVO ADMIN ////////////
 userModel.getActiveSchedule = (callback)=>{
    const db = cvivoAdmin.firestore();
    //  db.collection('parrilla').orderBy('date',"asc").onSnapshot(doc=>{
    //     let docsAray = []
    //     doc.docs.forEach(element => {
    //         docsAray.push(element.data())
    //     });
    //     callback(null,docsAray)
    //  })
   db.collection('parrilla',ref => ref.or).orderBy('date',"asc").get().then(res=>{
       
        let docsAray = []
        res.docs.forEach(element => {
            if(element.data().active){
                docsAray.push(element.data())
            }
          
        });
        callback(null,docsAray)
    
    })
}

userModel.goLive = (params,callback)=>{
    console.log(params.channel)
//     const db = cvivoMain.firestore();
//     var _data = {Idvivo:params.ID_video,Vivo:params.isOnLive,chatEvent:params.topic}
//     var dbref1 = db.collection("Config").doc(params.channel);
    
//    dbref1.update(_data).then(()=>{
//     callback(null,"En vivo");
//    })
  

}  
   

 module.exports = userModel;