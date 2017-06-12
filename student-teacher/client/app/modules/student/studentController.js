
app.controller('studentCtrl', function ($scope,$rootScope,sessionService,$http,$location,$firebaseArray,$routeParams,$document,$firebaseObject){


var vm =this;
vm.sessionService = sessionService;
if(!$rootScope.Uid){
  $rootScope.Uid = vm.sessionService.getSession('uid');
  $rootScope.Email = vm.sessionService.getSession('email');
  $rootScope.Password = vm.sessionService.getSession('password');
}
if(!vm.sessionService.getSession('uid')){
  $location.path= '/home/student';
  console.log('Session expired! please login')
}


const db = firebase.database().ref();
console.log('dashboard');
$scope.chatEnabled = false;
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


 var userRef = db.child('students').child($rootScope.Uid);
  // download the data into a local object
  var syncObject = $firebaseObject(userRef);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "user");
  console.log($scope.user);



  var invitesRef = db.child('students').child($rootScope.Uid).child('invites');
$scope.invites = $firebaseArray(invitesRef);

$scope.acceptInvite = function(x){
    var roomid = x.roomid;
    $location.path('/student/test_student/'+roomid);
}








//cHAT CODE

var me = {};
me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

var you = {};
you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            
console.log(formatAMPM(new Date()));
//-- No use time. It is a javaScript effect.
$scope.insertChat = function(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());

  
    if (who == $scope.user.firstName){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ $scope.user.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+ 'test'+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            angular.element(document.getElementById('ul')).append(control);
        }, time);
    
}


function resetChat(){
    angular.element(document.getElementById("ul")).empty();
}

$scope.onKeyup = function(e){
    if (e.which == 13){
        var text = $scope.mytext;
        var date = formatAMPM(new Date());
        date.toString();
        console.log(text +date);
        if (text !== ""){
            $scope.insertChat($scope.user.firstName,text);              
           var data ={
            from:$scope.user.firstName,
            senderId:$scope.user.uniqueId,
            text:text,
            date:date,
            room:$scope.roomId,
            avatar:$scope.user.avatar
           };
           //adding to rooms convo
            var msgRef =db.child('rooms').child($scope.roomId).child('messages');
            msgRef.push().set(data);
           // //adding own messages in profile converasations>messages
           var msgOwn = db.child('students').child($rootScope.Uid).child('conversations').child('messages');
            msgOwn.push().set(data);
            $scope.mytext= '';

        }
    }
}

//-- Clear Chat
resetChat();

//-- Print Messages
// db.child($scope.roomId).child('messages').on('value', function(){


// })
// insertChat("me", "Hello Tom...", 0);  
// insertChat("you", "Hi, Pablo", 1500);
// insertChat("me", "What would you like to talk about today?", 3500);
// insertChat("you", "Tell me a joke",7000);
// insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
// insertChat("you", "LOL", 12000);


//-- NOTE: No use time on insertChat.
//CHAT CODE ends



  //web RTC Shit      
            var connection = new RTCMultiConnection();
          $scope.roomUrls = '';

          if(!$scope.roomId){
  console.log('no room id found');
  $scope.roomId = vm.sessionService.getSession('roomid');
  console.log($scope.roomId);
}
if(!vm.sessionService.getSession('roomid')){
    console.log('no room id session found. setting it to token');
    $scope.roomId = connection.token();
    console.log($scope.roomId);
}
if($routeParams.roomid){
  $scope.roomId = $routeParams.roomid;
  vm.sessionService.startSession('roomid',$routeParams.roomid);
  console.log($scope.roomId + ' == '+vm.sessionService.getSession('roomid'));

  console.log('setting to routeParams')
}


console.log($scope.roomId);
var chatRef= db.child('rooms').child($scope.roomId).child('messages');
$scope.messages = $firebaseArray(chatRef);

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



           //once stream has started and connection is estalbished.
       

            var afterJoining = function(){
                   $scope.chatEnabler = true;
                   $scope.joinRoomBtn = true;


            }
             $scope.joinRoom = function(){

            connection.checkPresence($scope.roomId, function(isRoomExist, roomid) {
             if (isRoomExist === true) {
                 connection.join($scope.roomId);
                  afterJoining();


                } else {
                  $scope.connError = 'Error! Room Id not found!'
                }
            });

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
