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

function getJobById(req, res) {
  Job
    .query()
    .findById(req.params.id)
    .then(job => {
      return res.json(job).status(200)
    })
    .catch(error => {
      return res.send(error).status(500)
    });
}

function createJob(req, res) {
  Job
    .query()
    .insert(req.body)
    .then(newJob => {
      return res.json(newJob).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function updateJob(req, res) {
  Job
    .query()
    .updateAndFetchById(req.params.id, req.body)
    .then(jobUpdated => {
      return res.json(jobUpdated).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function deleteJobById(req, res) {
  Job
    .query()
    .deleteById(req.params.id)
    .then(jobDeleted => {
      return res.json({
        rowsDeleted: jobDeleted
      }).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}


function getCompanys(req, res) {
  Company
    .query()
    .eager('job')
    .then(data => res.json(data));
}

function getCompanyById(req, res) {
  Company
    .query()
    .findById(req.params.id)
    .then(company => {
      return res.json(company).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function createCompany(req, res) {
  Company
    .query()
    .insert(req.body)
    .then(newCompany => {
      return res.json(newCompany).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function updateCompany(req, res) {
  Company
    .query()
    .updateAndFetchById(req.params.id, req.body)
    .then(companyUpdated => {
      return res.json(companyUpdated).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

function deleteCompanyAndRelatedJobsById(req, res) {
  Company
    .query()
    .where('id', req.params.id)
    .first()
    .returning('*')
    .then(companyToDelete => {
      return companyToDelete
        .$relatedQuery('job')
        .delete()
        .where('companyId', companyToDelete.id)
        .returning('*')
        .then(jobsDeleted => {
          return companyToDelete
        })
        .catch(error => {
          return res.send(error).status(500);
        });
    })
    .then(company => {
      return Company
        .query()
        .deleteById(company.id)
        .then(() => {
          return company;
        })
    })
    .then(companyDeleted => {
      res.json(companyDeleted).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

apiRouter
  .get('/jobs', getJobs)
  .get('/jobs/:id', getJobById)
  .post('/jobs', createJob)
  .put('/jobs/:id', updateJob)
  .delete('/jobs/:id', deleteJobById);

apiRouter
    .get('/companies', getCompanys)
    .get('/companies/:id', getCompanyById)
    .post('/companies', createCompany)
    .put('/companies/:id', updateCompany)
    .delete('/companies/:id', deleteCompanyAndRelatedJobsById);

module.exports = apiRouter;
