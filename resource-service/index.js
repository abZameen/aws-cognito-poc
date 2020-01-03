const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const app = express();

const port = 3001;
const dataSize = '6mb'; 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: dataSize }));
app.use(bodyParser.json({ limit: dataSize }));

routes(app);

app.listen(port, () => {
  console.log(`Resource service running at port ${port}`);
});