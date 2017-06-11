
app.service('sessionService', function ($rootScope,localStorageService) {

this.startSession = function(key,val){
    return localStorageService.set(key,val);
}
this.getSession = function(key) {
   return localStorageService.get(key);
  }
  //..
this.endSession = function(key){
   return localStorageService.remove(key);
  }
this.endAllSessions = function(){
	   return localStorageService.clearAll();
}

this.checkSession = function(){
			if(this.getSession('uid') && this.getSession('email') && this.getSession('password')){
				$rootScope.email = this.getSession('email');
				$rootScope.password = this.getSession('password');
				$rootScope.uid = this.getSession('uid'); 
				$state.go('dashboard');
				return true;
            }else{
                   return false;
            }


            // console.log(endAllSessions());
	console.log(this.getSession('email'));
	console.log(this.getSession('password'));
	console.log(this.getSession('uid'));

	}
	// $rootScope.checkSession();


	
});