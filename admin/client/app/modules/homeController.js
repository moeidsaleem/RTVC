
app.controller('homeCtrl', function ($scope,$http,$routeParams,$firebaseObject){

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

 var userRef = db.child('admin');
  // download the data into a local object
  var syncObject = $firebaseObject(userRef);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "user");
  console.log($scope.user);



});