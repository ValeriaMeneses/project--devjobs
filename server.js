
const express = require('express');
const fs = require('fs-extra');
const ejs = require('ejs');

const connectToDb = require('./src/databases/dbConnect.js');
const dbConfigObj = require('./knexfile.js');

const app = express();

const appDb = connectToDb(dbConfigObj.development);

app.locals.db = appDb;

// Configure EJS template engine
app.engine('ejs', ejs.renderFile);
app.set('views engine', 'ejs');
app.set('views', `${__dirname}/src/views`);

const pageRouter = require('./src/routers/pageRouter.js');
const apiRouter = require('./src/routers/apiRouter.js');

app.use('/', pageRouter);
app.use('/api', apiRouter);
app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
  res.render('404.ejs')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`APP LISTENING ON PORT ${PORT}`);
})
