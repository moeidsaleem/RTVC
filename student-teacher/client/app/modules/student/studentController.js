
app.controller('studentCtrl', function ($scope,$http,$routeParams,$document,$firebaseObject){

const db = firebase.database().ref();
console.log('dashboard');
$http.get('/api/students', function(res){
	console.log(res.data);
})



$scope.loadStudents = function(){
	$http.get('/api/students').then(function(res){
	$scope.students = res.data;
})
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

 var userRef = db.child('students').child('213123asdasd12');
  // download the data into a local object
  var syncObject = $firebaseObject(userRef);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "user");
  console.log($scope.user);



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


            $scope.roomId = connection.token();
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
