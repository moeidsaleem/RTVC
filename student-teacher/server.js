var fs = require('fs');

var options = {
    key: fs.readFileSync('fake-keys/privatekey.pem'),
    cert: fs.readFileSync('fake-keys/certificate.pem')
};

var express = require("express"),
    http = require("https"), // Use HTTPs here -------------
    app = express(),
    firebase= require('firebase'),
    bodyParser = require('body-parser'),
    sentimentAnalysis = require('sentiment-analysis'),
    server = http.createServer(options, app);

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyBGmfVmifV69sr_mGhOh7LbKqKm7mkVNCg",
    authDomain: "firechat-99aff.firebaseapp.com",
    databaseURL: "https://firechat-99aff.firebaseio.com",
    projectId: "firechat-99aff",
    storageBucket: "firechat-99aff.appspot.com",
    messagingSenderId: "67692431371"
  };
  firebase.initializeApp(config);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})
)
app.use(express.static(__dirname + '/client'));
//on Error:  Can't set headers after they are sent.
app.use(function(req,res,next){
    var _send = res.send;
    var sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});


//delcaring Global database variable 
let db = firebase.database().ref();
let students = {};
let teachers = {};


//Get All students.
app.get('/api/students', function(req,res){
  db.child('students').on('value', function(snap){
         students = snap.val();   
         res.json(students);
  });
});

//get single students
app.get('/api/students/:uid', function(req,res){
  db.child('students').child(req.params.uid).on('value', function(snap){
    let data = snap.val();
    res.json(data);
  })
})
//get single student analysis
app.get('/api/analysis/students/:uid', function(req,res){
  let data = {};
  let convo = db.child('students').child(req.params.uid).child('conversations');
   convo.orderByChild('uid').equalTo(req.params.uid).once('value', function(snap){
    var msg = [];
    var res = '';
    snap.forEach(function(childSnap){
      msg.push(childSnap.val().msg);
        });
    console.log(msg);
    for(var i = 0;i<msg.length;i++){
      res += msg[i];
    } 
    console.log(res);
    var score =sentimentAnalysis(res);
    console.log(score);
    data = {
      msg:res,
      score:score,
      msgLength:res.length
    };
   }).then(function(){
       JSON.stringify(data);
   console.log(data);
   res.json(data)
   })


});


//Get all teachers.
app.get('/api/teachers', function(req,res){
  db.child('teachers').on('value', function(snap){
         teachers = snap.val();   
         res.json(teachers);
  });
});

//get single teacher
app.get('/api/teachers/:uid', function(req,res){
  console.log('bulawa aiya');
  db.child('teachers').child(req.params.uid).on('value', function(snap){
    let data = snap.val();
    res.json(data);
  });
});

app.post('/api/teacher/invite', function(req,res,next){
  var data = req.body;
  console.log(data.roomid + ' from :'+data.from);
  console.log(req.body.roomid);
  db.child('students').child(data.uniqueId).child('invites').push().set({
    from:data.from,
    roomid:data.roomid
  });
  res.end();
  next();
})

//get single teacher analysis
app.get('/api/analysis/teachers/:uid', function(req,res){
  let data = {};
  let convo = db.child('teachers').child(req.params.uid).child('conversations');
   convo.orderByChild('uid').equalTo(req.params.uid).once('value', function(snap){
    var msg = [];
    var res = '';
    snap.forEach(function(childSnap){
      msg.push(childSnap.val().msg);
        });
    console.log(msg);
    for(var i = 0;i<msg.length;i++){
      res += msg[i];
    } 
    console.log(res);
    var score =sentimentAnalysis(res);
    console.log(score);
    data = {
      msg:res,
      score:score,
      msgLength:res.length
    };
   }).then(function(){
       JSON.stringify(data);
   console.log(data);
   res.json(data)
   })


});



server.listen(8081, function(){
  console.log('runnin on 8081')
});

require('./Signaling-Server.js')(server);


