
app.controller('loginCtrl', function ($scope,$firebaseAuth,$http,$rootScope,sessionService,$location,$routeParams,$document,$firebaseObject){

var vm = this;
const db = firebase.database().ref();
 var auth = $firebaseAuth();
 let date = new Date();


console.log('login');


$scope.signupStudent = function(){
  // $location.path('/student/home');
auth.$createUserWithEmailAndPassword($scope.signup.email, $scope.signup.password).then(
        function(firebaseUser){
            // logic after sign up 
                console.log(firebaseUser.uid);
            //adding to database
         db.child('students').child(firebaseUser.uid).set({  /*create new user*/
                password:$scope.signup.password,
                email:$scope.signup.email,
                uniqueId:firebaseUser.uid,
                type:'student'
               });
               $rootScope.Email = $scope.signup.email
               $rootScope.Password = $scope.signup.password
               $rootScope.Uid = firebaseUser.uid
               $location.path('/student/home');
              // / now go to teacher admin

      }).catch(function(error){
        // error handling
            console.log(error);
        $rootScope.authErr = "Error : "+error;
          $scope.signup.email = '';
        $scope.signup.password = '';
        
      });
              
}

$scope.loginStudent = function(){
    auth.$signInWithEmailAndPassword($scope.login.email, $scope.login.password).then(function(firebaseUser){
             //check if user type is teacher
            var teacherRef = db.child('students').child(firebaseUser.uid).once('value', function(snap){
              var exists = (snap.val() !== null);
              if(!exists){
                 $scope.loginError = 'Error: This is not a Student Account or invalid account!'

              }else{

          $rootScope.Uid = firebaseUser.uid;
          $rootScope.Email = $scope.login.email;
          $rootScope.Password = $scope.login.password;

          let lastLoginRef = db.child('students').child(firebaseUser.uid).child('last_login');
          lastLoginRef.push().set({
          timing: date.toLocaleTimeString(),
          CurrentDate:date.toLocaleDateString()
          });
          // Now making a session with localStorage - When login run a session
          sessionService.startSession('email', $rootScope.Email);
          sessionService.startSession('password', $rootScope.Password );
          sessionService.startSession('uid', $rootScope.Uid);

console.log(sessionService.getSession('uid') + ' email is:'+sessionService.getSession('email'));
          //go to Student Dashboard 
           $location.path("/student/home"); 
}
            })

            
                }).catch(function(error) {
                    console.error("Authentication failed:"+ error);
                    $scope.loginError = "Error : "+error;
                      $scope.login.email = '';
                      $scope.login.password = '';
 
               });

}
$scope.loginTeacher = function(){
    auth.$signInWithEmailAndPassword($scope.login.email, $scope.login.password).then(function(firebaseUser){
             //check if user type is teacher
            var teacherRef = db.child('teachers').child(firebaseUser.uid);
            var checkType = $firebaseObject(teacherRef.type);
            if(checkType !== 'teacher'){
            	console.log('not a teacher');
            	$location.path('/home');
            }else if(checkType === 'teacher'){
					$rootScope.User.uid = firebaseUser.uid;
					$rootScope.User.email = $scope.login.email;
					$rootScope.User.password = $scope.login.password;

					let lastLoginRef = users.child(firebaseUser.uid).child('last_login');
					lastLoginRef.push().set({
					timing: date.toLocaleTimeString(),
					CurrentDate:date.toLocaleDateString()
					});
					// Now making a session with localStorage - When login run a session
					sessionService.startSession('email', email);
					sessionService.startSession('password', pass );
					sessionService.startSession('uid', firebaseUser.uid);

					//go to Teacher Dashboard 
					 $location.path("/teacher/home");

            }
	            	}).catch(function(error) {
	                	console.error("Authentication failed:"+ error);
	                	$location.path('/');
               });

}

//Signup Teacher
		$scope.signupTeacher = function(){
            console.log($scope.signup.email + ' error'+$scope.signup.password);
			 auth.$createUserWithEmailAndPassword($scope.signup.email, $scope.signup.password).then(
    		function(firebaseUser){
            // logic after sign up 
                console.log(firebaseUser.uid);
              
              
				// Now making a session with localStorage - When login run a session
				// sessionService.startSession('email', $scope.signup.email);
				// sessionService.startSession('password', $scope.signup.password);
				// sessionService.startSession('uid', $rootScope.firebaseUser.uniqueId);
    //             console.log(sessionService.getSession('uid'));

				// //adding to database
			   db.child('teachers').child(firebaseUser.uid).set({  /*create new user*/
                password:$scope.signup.password,
                email:$scope.signup.email,
                uniqueId:firebaseUser.uid,
                type:'teacher'
               });
               $rootScope.Email = $scope.signup.email
               $rootScope.Email = $scope.signup.password
               $rootScope.Email = firebaseUser.uid
               $location.path('/teacher/home');


              // / now go to teacher admin


    	}).catch(function(error){
    		// error handling
            console.log(error);
    		$scope.signupError = "Error : "+error;
        $scope.signup.email = '';
        $scope.signup.password = '';

    	});


			}






});
