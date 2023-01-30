const express = require('express');
const rootRouter = require('./routers');
const { basicHandler, tokenErrorHandler } = require('./errorHandlers');

const app = express();

app.use(express.json());
app.use(rootRouter);

app.use(async (err, req, res, next) => {
  res.status(err.status || 500).send({ error: err });
});

app.use(tokenErrorHandler);
app.use(basicHandler);

module.exports = app;
