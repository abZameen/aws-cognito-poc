const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
const namespace = '/api';
const dataSize = '6mb'; 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: dataSize }));
app.use(bodyParser.json({ limit: dataSize }));

app.post(`${namespace}/register`, (req, res) => {
  return res.send("User created");
});

app.post(`${namespace}/login`, (req, res) => {
  return res.send("User loggedIn");
});

app.listen(port, () => {
  console.log(`Backend running at port ${port}`);
});