

app.service('notificationService', function ($rootScope,$firebaseArray) {

var db = firebase.database().ref().child('users').child($rootScope.uid);
var users = firebase.database().ref().child('users');
var nRef = db.child('notifications');
 var data = $firebaseArray(nRef);


function getNotifications(){
                 return data ;
				
			}
function totalNotifications(){
	    return data.length;
}

function deleteNotification(notification){

}

function onUpdateNotify(){
    
    let f = db.child('following'); 

   
f.on('value', function(snap){
   
   snap.forEach( function(s){
 users.child(s.val().uniqueId).child('notifications').push().set({
   	notify:$rootScope.user.firstName+ '('+$rootScope.user.username+')'+' updated Profile.',
   	userId:$rootScope.uid
   });
   } );
  
   
});

var date = new Date();

   

  data.$add({
  	notify:'Profile updated at: '+ date.getDate() +'/'+date.getMonth()+'/'+date.getYear(),
  	userId:$rootScope.uid
  });

console.log('profile updated');

}

function removeNotification(x){
  userRef.child('notification').child(x).remove();
}
			return {
				get:getNotifications,
				total:totalNotifications,
				update:onUpdateNotify
				
			}
 

	
});




