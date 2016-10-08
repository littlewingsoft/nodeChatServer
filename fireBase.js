

var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: "project-s-86ce141a54ad.json",
  databaseURL: "https://project-s-d2158.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("/");
/*
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
*/
ref.on("value", function(snapshot){
 console.log( snapshot.val() );
});

var users = ref.child("users");

for( var i=0; i<10; i++ ){
var user = users.push();
var key = user.key;
user.set(
  { 
    name:+i, age:10+i  
  }
);

}

users.set( {
  "hey" :{ 
    a:"a",
    b:"b"
   }
} );

  console.log("started") ;