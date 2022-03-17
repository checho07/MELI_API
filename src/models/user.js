
var fAdmin = require('firebase-admin');
var telecampusFirebase;
const firebaseAccount = require('../../telecampus_firebase_key.json');
let userModel = {};


function initializeApp() {    
    telecampusFirebase = fAdmin.initializeApp({credential: fAdmin.credential.cert(firebaseAccount)},'Telecampus');     
  }
initializeApp();

 userModel.getMoodleUrl = (callback)=> {

    let collectionRef; 
  
   
  try {
    collectionRef = telecampusFirebase.firestore().collection('telecampusMoodle').doc('urlConfig');
    collectionRef.get().then((res)=> {
        var url = res.data().url;
        console.log(url)
        callback(null, url);
    },err => {
        console.log(err);
        callback(200,err);

    }).catch(er=> {
        console.log(er)
        callback(500,er)
    })
  } catch (error) {
    callback(200,error);
  }
   
   
 }



 module.exports = userModel;