const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const routes = require('./api/routes');
const app = express();

const port = 3000;
const dataSize = '6mb'; 

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false, limit: dataSize }));
app.use(bodyParser.json({ limit: dataSize }));
app.use(function(req, res, next) {  
  next();
});  
routes(app);

app.listen(port, () => {
  console.log(`Authentication micro service running at port ${port}`);
});