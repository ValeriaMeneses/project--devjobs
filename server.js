const express = require('express');
const fs = require('fs-extra');

const app = express();
const pageRouter = require('./src/routes/pageRouter.js');
const apiRouter = require('./src/routes/apiRouter.js');



const PATH = `${__dirname}/src/views/home.html`;

app.use('/', pageRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
  res.send('<h1>404. Not found.</h1>')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`APP LISTENING ON PORT ${PORT}`);
})
