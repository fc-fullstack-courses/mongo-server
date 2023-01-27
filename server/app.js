const express = require('express');
const rootRouter = require('./routers');

const app = express();

app.use(express.json());
app.use(rootRouter);

app.use(async (err, req, res, next) => {
  res.status(err.status || 500).send({ error: err });
});

module.exports = app;
