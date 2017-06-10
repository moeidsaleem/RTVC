var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var sentimentAnalysis = require('sentiment-analysis')

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


var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'))
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


app.listen(3000);
console.log('runnin on 3000 yeah')