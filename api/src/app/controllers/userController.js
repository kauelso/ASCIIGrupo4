const express = require('express');
const router = express.Router();
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