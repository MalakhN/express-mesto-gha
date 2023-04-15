const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '643aba0b5fe7544d385f3dd4',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
