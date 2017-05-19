  // script.js

    var scotchApp = angular.module('scotchApp', ['ngRoute']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'pages/home/index.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about/index.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact-us/index.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController',['$scope','$http' , function($scope,$http) {
        // create a message to display in our view
        $scope.message = 'Everyone1 come and see how good I look!';
		  $scope.data = [];
		  $scope.user = {};
           console.log($http);
    var request = $http.get('http://localhost:8088/data');    
    request.success(function(data) {
        $scope.data = data;
		console.log($scope.data);
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
	 $scope.reversedMessage = function(name) {
		  var postData = new FormData();
			postData.append("Name", name);
	  // var createrow = $http.post('http://localhost:8088/data',$scope.firstname);
	  console.log($scope.user);
	    $http({
	    method: 'POST', 
        url: 'http://localhost:8088/data', 
        data: $scope.user,
        headers: {"Content-Type": 'application/json; charset=utf-8'},
		}).then(function successCallback(response) {
    console.log("hi"+response);
	$scope.resp = response;
  }, function errorCallback(response) {
    console.log(response);
  });
		/*	createrow.success(function(data) {
			console.log("success");
		});
		createrow.error(function(data){
			console.log('Error: ' + data);
		}); */
	  };
    }]);

    scotchApp.controller('aboutController', ['$scope','$http' ,function($scope,$http) {
        $scope.message = 'Look! I am an about page.';
		 $scope.data = [];
		 $scope.firstname = '';
         console.log($http);
    var request = $http.get('http://localhost:8088/data');    
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
	 
	
    }]);

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });