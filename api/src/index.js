const express = require('express');
const bodyParser = require('body-parser');

// variaveis de ambiente
require('dotenv/config');
const port = process.env.PORT || 3003;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./controllers/authController')(app);

app.listen(port, () =>{
  console.log(`API running on port ${port}`);
});