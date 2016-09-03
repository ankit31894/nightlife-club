angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

   $routeProvider

       // home page
       .when('/', {
           templateUrl: 'views/barSearch.html',
           controller: 'MainController'
       })

       .when('/mybars', {
           templateUrl: 'views/going.html',
           controller: 'GoingController',
       })
       .when('/login/google', {
            controller : function(){
                window.location.replace('/login/google');
            },
            template : "<div></div>"
        })
        .when('/logout', {
             controller : function(){
                 window.location.replace('/logout');
             },
             template : "<div></div>"
         });

   $locationProvider.html5Mode(true);

}]);
