require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require("morgan");

//variaveis ambiente
const port = process.env.PORT || 3003;
const frontURL = process.env.FRONT_ROOT_URL;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: 'http://localhost:3000'}));// em producao colocar  a frontURL
app.use(morgan('dev'));

require('./app/controllers/index')(app);

app.listen(port, ()=>{
  console.log(`API running on port ${port}`);
});