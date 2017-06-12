

app.config( function ($routeProvider,$locationProvider) {
	
	$routeProvider
	.when('/home', {
		templateUrl: 'app/modules/home.html',
		controller:'homeCtrl'
	})
	.when('/home/admin', {
		templateUrl: 'app/modules/admin.html',
		controller:'loginCtrl'
	})
	.when('/home/student', {
		templateUrl: 'app/modules/student.html',
		controller:'loginCtrl'
	})
	.when('/home/teacher', {
		templateUrl: 'app/modules/teacher.html',
		controller:'loginCtrl'
	})
	//Admin
	.when('/admin/home', {
		templateUrl: 'views/dashboard.html',
		controller:'adminCtrl'
	})
	.when('/admin/profile',{
		controller: 'adminCtrl',
		templateUrl: 'views/user.html'
	})	

	.when('/admin/teachers',{
		controller: 'adminCtrl',
		templateUrl: 'views/teachers.html'
	})	
	.when('/admin/teachers/:uid',{
		controller: 'adminCtrl',
		templateUrl: 'views/teacher_detail.html'
	})
	.when('/admin/students',{
		controller: 'adminCtrl',
		templateUrl: 'views/students.html'
	})
		.when('/admin/students/:uid',{
		controller: 'adminCtrl',
		templateUrl: 'views/student_detail.html'
	})
		.when('/admin/help',{
		controller: 'adminCtrl',
		templateUrl: 'views/help.html'
	})	
		.when('/admin/test_teacher',{
		controller: 'adminCtrl',
		templateUrl: 'views/test_teacher.html'
	})	
		.when('/admin/test_student',{
		controller: 'adminCtrl',
		templateUrl: 'views/test_student.html'
	})	
//------------------------------------------
		//Teacher
	.when('/teacher/home', {
		templateUrl: 'app/modules/teacher/dashboard.html',
		controller:'teacherCtrl'
	})
	.when('/teacher/profile',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/user.html'
	})	
	.when('/teacher/teachers',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/teachers.html'
	})	
	.when('/teacher/teachers/:uid',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/teacher_detail.html'
	})
	.when('/teacher/students',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/students.html'
	})
		.when('/teacher/students/:uid',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/student_detail.html'
	})
		.when('/teacher/invites',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/invites.html'
	})	
		.when('/teacher/test_teacher',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/test_teacher.html'
	})	
		.when('/teacher/test_teacher/:roomid',{
		controller: 'teacherCtrl',
		templateUrl: 'app/modules/teacher/test_teacher.html'
	})	
		//------------------------------------------
		//STudent
	.when('/student/home', {
		templateUrl: 'app/modules/student/dashboard.html',
		controller:'studentCtrl'
	})
	.when('/student/profile',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/user.html'
	})	
	.when('/student/teachers',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/teachers.html'
	})	
	.when('/student/teachers/:uid',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/teacher_detail.html'
	})
	.when('/student/students',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/students.html'
	})
		.when('/student/students/:uid',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/student_detail.html'
	})
		.when('/student/invites',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/invites.html'
	})	
		.when('/student/test_teacher',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/teacher/test_teacher.html'
	})	
		.when('/student/test_student',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/test_student.html'
	})	
		.when('/student/test_student/:roomid',{
		controller: 'studentCtrl',
		templateUrl: 'app/modules/student/test_student.html'
	})	
	.otherwise({ redirectTo: '/home' });

    $locationProvider.hashPrefix(''); 
})