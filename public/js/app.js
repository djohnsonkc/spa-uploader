// create the module and name it app
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngCookies', 'ngResource', 'ui.bootstrap']);

// configure our routes
app.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'html/pages/home.html',
			controller  : 'homeController',
			title: 'DFS PoC'
		})

		// route for the about page
		.when('/sports', {
			templateUrl : 'html/pages/sports.html',
			controller  : 'sportsController',
			title: 'DFS - Sports'
		})


		// route for the about page
		.when('/teams', {
			templateUrl : 'html/pages/teams.html',
			controller  : 'teamsController',
			title: 'DFS - Teams'
		})

		// route for the contact page
		.when('/players', {
			templateUrl : 'html/pages/players.html',
			controller  : 'playersController',
			title: 'DFS- Players'
		})

		.when('/games', {
			templateUrl : 'html/pages/games.html',
			controller  : 'gamesController',
			title: 'DFS - Games'
		})

		.when('/upload', {
			templateUrl : 'html/pages/upload.html',
			controller  : 'uploadController',
			title: 'DFS - Upload'
		})

		;//keep the final semi-colon here 
});


app.run(['$location', '$rootScope', function($location, $rootScope) {

	//this is how you can enforce login on the entire site, or just for portions of it such as account features (e.g. /account)
	//make sure and set $rootScope.loggedInUser=true on the signin page. Set to null as default and on signout
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
    
      // if (!$rootScope.loggedInUser) {
        
      //   //if not a signin or signup page
      //   if (next.templateUrl == "html/pages/signin.html" ||
      //   	next.templateUrl == "html/pages/signup.html") {
      //   	//dont redirect to signin
      //   } 
      //   else {
      //     $location.path("/signin");
      //   }
      // }

    });

	//IMPORTANT: This is what changes the page title
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        window.scrollTo(0,0); //this will refresh the scroll bar and show/hide it as necessary
    });
}]);