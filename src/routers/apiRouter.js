const Router = require('express').Router;
const fs = require('fs-extra');

const apiRouter = Router();

function getJobs(req, res){
  const db = req.app.locals.db;
  db
    .select()
    .table('job')
    .then(data => res.json(data));
}

function getCompanys(req, res) {
  const { db } = req.app.locals;
  db
    .select()
    .table('company')
    .then(data => res.json(data));
}

apiRouter
  .get('/jobs', getJobs);

apiRouter
    .get('/companies', getCompanys);

module.exports = apiRouter;
