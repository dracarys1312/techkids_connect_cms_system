angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'app/views/pages/home.html'
    })

    // login page
    .when('/login', {
        templateUrl: 'app/views/pages/login.html',
        controller: 'mainController',
        controllerAs: 'login'
    })

    // show all users
    .when('/users', {
        templateUrl: 'app/views/pages/users/all.html',
        controller: 'userController',
        controllerAs: 'user'
    })

    // form to create a new user
    // same view as edit page
    .when('/users/create', {
        templateUrl: 'app/views/pages/users/single.html',
        controller: 'userCreateController',
        controllerAs: 'user'
    })

    // page to edit a user
    .when('/users/:user_id', {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userEditController',
            controllerAs: 'user'
        })
        .when('/jobs', {
            templateUrl: 'app/components/views/all.html',
            controller: 'jobController',
            controllerAs: 'job'
        })
        .when('/jobs/create', {
            templateUrl: 'app/components/views/single.html',
            controller: 'jobCreateController',
            controllerAs: 'job'
        })
        .when('/jobs/:job_id', {
            templateUrl: 'app/components/views/single.html',
            controller: 'jobEditController',
            controllerAs: 'job'
        })
        ;
    $locationProvider.html5Mode(true);

});
