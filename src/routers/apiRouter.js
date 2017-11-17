const Router = require('express').Router;
const fs = require('fs-extra');
const Job = require('../models/Job.js');
const Company = require('../models/Companies.js');

const apiRouter = Router();

function getJobs(req, res){
  Job
    .query()
    .then(data => res.json(data));
}

function getCompanys(req, res) {
  Company
    .query()
    .eager('job')
    .then(data => res.json(data));
}

apiRouter
  .get('/jobs', getJobs);

apiRouter
    .get('/companies', getCompanys);

module.exports = apiRouter;
