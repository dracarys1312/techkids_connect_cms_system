angular.module('jobService', []) // ten duoc dat trong app.routes.js
.factory('Job', function($http){
    var jobFactory = {};
    //get all question packs:
    jobFactory.all = function(){
        return $http.get('http://125.212.233.51:2407/api/connect/company');
    };

    // create a question pack
    jobFactory.create = function(jobData) {
      return $http.post('/api/jobs/', jobData);
    } ;

    // get single question pack
    jobFactory.get = function(id) {
      return $http.get('/api/jobs/' + id );
    };

    // update a question pack
    jobFactory.update = function(id,jobData) {
      return $http.put('/api/jobs/' + id,jobData);
    };

    // delete a question pack
    jobFactory.delete = function(id) {
      return $http.delete('/api/jobs/' + id);
    };

     //return our entire jobFactory object
    return jobFactory;
})
