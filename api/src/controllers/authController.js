const express = require('express');
const bcrypt = require('bcryptjs');

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

router.post('/authenticate',async (req,res)=>{
  const {email , password} = req.body;
  const user = await (await User.findOne({email})).isSelected('+password');

  if(!user){
    return res.status(400).send({error: "user not found"});}

  if(!await bcrypt.compare(password,user.password)){
    return res.status(400).send({error: "Invalid password"});}

  res.send({user});

})

module.exports = (app) => app.use('/api/auth', router);