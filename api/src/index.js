require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//variaveis ambiente
const port = process.env.PORT || 3003;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

require('./app/controllers/index')(app);

app.listen(port, ()=>{
  console.log(`API running on port ${port}`);
});