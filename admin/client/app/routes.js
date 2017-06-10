

app.config( function ($routeProvider,$locationProvider) {
	
	$routeProvider
	.when('/home', {
		templateUrl: 'views/dashboard.html',
		controller:'homeCtrl'
	})
	.when('/profile',{
		controller: 'homeCtrl',
		templateUrl: 'views/user.html'
	})	
	.when('/teachers',{
		controller: 'homeCtrl',
		templateUrl: 'views/teachers.html'
	})	
	
	.when('/teachers',{
		controller: 'homeCtrl',
		templateUrl: 'views/teachers.html'
	})	
	.when('/teachers/:uid',{
		controller: 'homeCtrl',
		templateUrl: 'views/teacher_detail.html'
	})
	.when('/students',{
		controller: 'homeCtrl',
		templateUrl: 'views/students.html'
	})

		.when('/students/:uid',{
		controller: 'homeCtrl',
		templateUrl: 'views/student_detail.html'
	})

		.when('/help',{
		controller: 'homeCtrl',
		templateUrl: 'views/help.html'
	})	
	.otherwise({ redirectTo: '/home' });

    $locationProvider.hashPrefix(''); 
})