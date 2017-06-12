
app.controller('teacherCtrl', function ($scope,$firebaseArray,$location,$rootScope,$http,sessionService,$routeParams,$document,$firebaseObject){
var vm = this;
// vm.sessionService = sessionService;
const db = firebase.database().ref();
$http.get('/api/students', function(res){
	console.log(res.data);
})


var invitesRef = db.child('teachers').child('DodjFBUHJmWxSQmS6oOJiVifDb32').child('invites');
$scope.invites = $firebaseArray(invitesRef);

$scope.loadStudents = function(){
	$http.get('/api/students').then(function(res){
	$scope.students = res.data;
});
}
//single student
	$scope.loadStudent = function(){
		var uid = $routeParams.uid;
		$http.get('/api/students/'+uid).then(function(res){
			$scope.student = res.data;
		});
	}

	//student analysis
	$scope.studentAnalysis = function(){
        var uid = $routeParams.uid;
	    $http.get('/api/analysis/students/'+uid).then(function(res){
	    	$scope.analysis = res.data;
	    });
	}

//all teachers
$scope.loadTeachers = function(){
	$http.get('/api/teachers').then(function(res){
	$scope.teachers = res.data;
})
}
//single teacher
$scope.loadTeacher = function(){
		var uid = $routeParams.uid;
		$http.get('/api/teachers/'+uid).then(function(res){
			$scope.teacher = res.data;
		});
	}
$scope.teacherAnalysis = function(){
		var uid = $routeParams.uid;
	    $http.get('/api/analysis/teachers/'+uid).then(function(res){
	    	$scope.analysis = res.data;
	    });
}

//load admin

 var userRef = db.child('teachers').child('DodjFBUHJmWxSQmS6oOJiVifDb32');
  // download the data into a local object
  var syncObject = $firebaseObject(userRef);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "user");



$scope.inviteStudent = function(x,room){ 
console.log(x.uniqueId);
     $location.path('/teacher/test_teacher/'+room);

      var std =db.child('students').child(x.uniqueId).child('invites');
   
   $http({
    method: 'POST',
    url: '/api/teacher/invite',
    data: 'from=' + $scope.user.firstName + '&roomid=' + room + '&uniqueId=' + x.uniqueId,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Login-Ajax-call": 'true'
    }
}).then(function(response) {
    if (response == 'OK') {
        // success
        console.log(response.data);
    } else {
        // failed
    }
});


}

          // // GET MESSAGES AS AN ARRAY
          // var mRef = db.child('atrix').child('messages');
          // var sRef = db.child('atrix').child('status');

          // $scope.messages = $firebaseArray(mRef);
          // $scope.chatstatus = $firebaseArray(sRef);
          //     //ADD MESSAGE METHOD
          // $scope.addMessage = function(e) {
          //   //LISTEN FOR RETURN KEY
          //   if (e.keyCode === 13 && $scope.msg) {
          //     //ALLOW CUSTOM OR ANONYMOUS USER NAMES
          //     var name = 'ali';
          //     //FILTER DATE TO TIME & DATE FORMAT
          //    var displaydate = $filter('date')(new Date(),'dd-MM-yyyy hh:mm a');
          //     //ADD TO FIREBASE
          //     $scope.messages.$add({
          //       from: name,
          //       body: $scope.msg,
          //       date: displaydate
          //     });
                            
          //     //RESET MESSAGE
          //     $scope.msg = "";
          //   }
    
          // };
        



  //web RTC Shit
      
            var connection = new RTCMultiConnection();
          $scope.roomUrls = '';
            // by default, socket.io server is assumed to be deployed on your own URL
           // connection.socketURL = 'https://localhost:8080/';

            // comment-out below line if you do not have your own socket.io server
            connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

            connection.socketMessageEvent = 'audio-plus-screen-sharing-demo';
            connection.session = {
                audio: 'two-way', // merely audio will be two-way, rest of the streams will be oneway
                video: true,
                oneway: true
                 };
            connection.sdpConstraints.mandotory = {
            	OfferToReceiveAudio:true,
            	OfferToReceiveVideo:true
            };
                 var local = angular.element(document.getElementById('local-container'));
                var remote = angular.element(document.getElementById('remote-container'));
                  
                    // Using getScreenId.js to capture screen from any domain
            // You do NOT need to deploy Chrome Extension YOUR-Self!!
            connection.getScreenConstraints = function(callback) {
                getScreenConstraints(function(error, screen_constraints) {
                    if (!error) {
                        screen_constraints = connection.modifyScreenConstraints(screen_constraints);
                        callback(error, screen_constraints);
                        return;
                    }
                    throw error;
                });
            };
            connection.onstream = function(event){
            	if(event.type === 'remote'){
            		remote.append(event.mediaElement);
            	}
            	if(event.type === 'local'){
            		local.append(event.mediaElement);
            	}
            
             }


            $scope.roomId =  $routeParams.roomid ||connection.token();
            $scope.openRoom = function(){
            	$scope.openRoomBtn = true;
            		connection.open($scope.roomId || 'test-room');
            }
             $scope.joinRoom = function(){
            	$scope.openRoomBtn = true;
            		connection.join($scope.roomId || 'test-room');
            }
$scope.leaveRoom = function(){
	connection.disconnectWith($scope.roomId);
	//connection.streams.stop('remote');
	$scope.openRoomBtn = !$scope.openRoomBtn;

}
$scope.replaceScreen = function(){
	 connection.replaceTrack({
                    screen: true,
                    oneway: true
                });
}


});
