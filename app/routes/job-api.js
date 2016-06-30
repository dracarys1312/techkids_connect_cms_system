var bodyParser = require('body-parser'); 	// get body-parser
var Job = require('../models/job');

module.exports = function(app,express) {
  var job_api_Router = express.Router();
  //accessed at Get http://localhost:8080/api
  job_api_Router.get('/', function(req,res) {
    res.json({message:'hooray! welcome to our api!'});
  });
  job_api_Router.route('/jobs')
      //create a jobs
      .post(function(req,res) {
        var job = new Job();
        job.company_name = req.body.company_name;
        job.job_title = req.body.job_title;
        job.job_description = req.body.job_description;
        job.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json({message:"Job created!"});
        });
      })
      //get all the jobs
        .get(function(req,res) {
          Job.find({}, function(err,jobs) {
            if (err) res.send(err);
            res.json({message:"nice",jobs:company});
          });
        });
  job_api_Router.route('/jobs/:job_id')
      //get the job with that id
      .get(function(req,res) {
        Job.findById(req.params.job_id, function(err,job) {
          if (err) res.send(err);
          res.json(job);
        });
      })
      //update the job with this id
      .put(function(req,res) {
        Job.findById(req.params.job_id, function(err, job) {
          if(err) res.send(err);
          if  (req.body.company_name) job.company_name = req.body.company_name;
          if (req.body.job_title) job.job_title = req.body.job_title;
          if (req.body.job_description) job.job_description = req.body.job_description;
          job.save(function(err) {
            if (err) res.send(err);
            res.json({message:'Job updated'});
          });
        });
      })
      //delete the user with this id
      .delete(function(req,res) {
        Job.remove({
          _id:req.params.job_id
        }, function(err,job) {
          if(err) res.send(err);
          res.json({message:'Successfully deleted'});
        });
      });
  return job_api_Router;
};
