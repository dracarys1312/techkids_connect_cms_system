var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobCompany = new Schema({
    company_name: String,
    job_title: String,
    job_description: String
});
module.exports = mongoose.model('Job', JobCompany);
