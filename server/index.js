const express = require('express');
const chalk = require('chalk');
const path = require('path');
const log = console.log;

const app = express();

const mongoose = require('mongoose');

const api = require('./api');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use('/api', api);

const { port, dbUrl } = require('./config');

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    log(chalk.green.bold('Database connection successful'));

    app.listen(port, async () => {
      log(chalk.cyan.bold('App running on port:', port));
    });
  });
