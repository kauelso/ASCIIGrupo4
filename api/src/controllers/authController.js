const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try{
    if( await User.findOne({email})){
      return res.status(409).json({
        error: true,
        message: "Erro: email ja registrado em outra conta",
      });
    }

    const user = await User.create(req.body);
    user.password = undefined;    
    return res.status(201).json(user);
  }catch(err){
    return res.status(400).json({
      error: true,
      message: 'erro ao criar novo usuario',
    });
  }
});

module.exports = (app) => app.use('/api/auth', router);