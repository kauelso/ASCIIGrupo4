const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth');
router.use(authMiddleware);//as rotas abaixo estao protegidas por autenticacao

const User = require('../models/User');

//variavel de ambiente
const authSecret = process.env.AUTH_SECRET;

router.get('/user', async(req, res) => { // listar usuario
  // console.log(req.params.id);
  const user = await User.findById(req.userId);
  if(!user) 
    return res.status(401).json({
      error: "nao foi possivel listar o usuario"
    });
  
  return res.status(200).json({
    user
  });
});

router.put('/user/change_password/:id', async(req, res) => { // atualizar senha
  let {email, oldPassword, newPassword } = req.body;
  try {

    console.log(oldPassword, newPassword);
    if(!oldPassword || !newPassword) // verificar se foi passado as senhas
      return res.status(401).json({
        error: "falha na alteração da senha, tente novamente"
      });
    oldPassword = oldPassword.toString();
    newPassword = newPassword.toString();

    if(req.userId !== req.params.id) // verificar se o usuario esta tentando a alterar senha de outro usuario
      return res.status(401).json({
        error: "falha na alteração da senha, tente novamente"
      });

    const user = await User.findById(req.params.id)
      .select('+password');

    if(!user)
      return res.status(401).json({
        error: "falha na alteração da senha, tente novamente"
      });  

    // conferir se a senha antiga esta correta  
    if(!await bcrypt.compare(oldPassword, user.password)){
      return res.status(401).json({
        error: "falha na alteração da senha, tente novamente"
      });
    }

    user.password = newPassword;
    await user.save();
    user.password = undefined; // para n retornar a senha pro frontend
    return res.json({ user });
  }catch(err){
    console.log(err)
    res.status(401).json({
      error: "falha na alteração da senha, tente novamente"
    });
  }
});

router.put('/user/:id', async(req, res) => { // atualizar usuario
  //verificar se o usuario esta tentando acessar dados de outro usuario
  if(req.params.id && req.params.id !== req.userId)
    return res.status(401).json({
      error: "nao foi possivel atualizar esse usuario"
    });

  
  const { email, name } = req.body;
  try {
    const user = await User.findOne({ email });

    if(!user)
      return res.status(401).json({
        error: "nao foi possivel atualizar esse usuario"
      });

    user.name = name;
    user.save();  
    return res.status(200).json({
      user
    });
  }catch(err){
    // console.log(err)
    return res.status(401).json({
      error: "nao foi possivel atualizar esse usuario"
    });
  }
});


module.exports = (app) => app.use('/api/auth', router);