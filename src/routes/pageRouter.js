const Router = require('express').Router;
const fs = require('fs-extra');

const pageRouter = Router();

const PATH = `${__dirname}/src/views/home.html`;

pageRouter
.get('/', (req, res) => {
  res.send('<h1>Home view</h1>');
});

module.exports = pageRouter;
