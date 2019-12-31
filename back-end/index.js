const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cognitoService = require('./services/cognito');
const app = express();

const port = 3000;
const namespace = '/api';
const dataSize = '6mb'; 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: dataSize }));
app.use(bodyParser.json({ limit: dataSize }));

app.post(`${namespace}/register`, async (req, res) => {
  try {
    const result = await cognitoService.registerUser(req.body);
    console.log({result});
    res.json({
      user: {
        email: result.getUsername()
      }
    });
  } catch (error) {
    console.log({error});
    return error;
  }
});

app.post(`${namespace}/login`, async (req, res) => {
  try {
    const result = await cognitoService.loginUser(req.body);
    console.log({result});
    res.json({
      user: {
        email: result.getUsername()
      }
    });
  } catch (error) {
    console.log({error});
    return error;
  }
});

app.listen(port, () => {
  console.log(`Backend running at port ${port}`);
});