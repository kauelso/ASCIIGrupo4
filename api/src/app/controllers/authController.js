const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');


//variavel de ambiente
const authSecret = process.env.AUTH_SECRET;
const resetURL = process.env.FRONT_RESET_URL;
const frontRootUrl = process.env.FRONT_ROOT_URL;


const User = require('../models/User');
const router = express.Router();

function generateToken(params = {}){
  return jwt.sign(params , authSecret, {
    expiresIn: '3d',// expires in 3 days
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try{
    if( await User.findOne({email})){
      return res.status(401).json({
        error: "falha ao registrar novo usuario"
      });
    }

    const user = await User.create(req.body);

    //apenas para n retornar a senha pro frontend
    user.password = undefined;    
    
    //enviar email de boas vindas
    await mailer.sendMail({
      html: `
      <html>
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap" rel="stylesheet"> 
      <style>
        * {
          font-family: 'Comfortaa', Arial, Helvetica, sans-serif;
          margin: 5px;
          padding: 0;
          outline: none;
          box-sizing: border-box;
        }
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        a {
          text-decoration: none;
          text-align: center;
          background: #07d;
          color: #fff;
          margin: 10px;
          padding: 5px;
          border-radius: 8px;
        }
        p{
          margin: 10px;
        }
        strong {
          color: #07d;
        }
      </style>
      <body>
        <h1>Olá ${req.body.name}, seja bem-vindo(a) ao Plantfolio Ascii</h1>
        <h2>A partir de agora voce pode gerenciar melhor</br>
          suas plantas!
        </h2>
        <h3><a href=${frontRootUrl}>Acessar sua conta</a></h3>
        <p>Equipe Plantfolio Ascii</p>
      </body>
    </html>
      `,
      subject: 'Plantfolio Ascii - Boas Vindas',
      from: 'No-reply Plantfolio <plantfolio.ascii@gmail.com>',
      to: email
    },(err) => {
      console.log(err);
      if(err)
        return res.status(401).json({
          error: "falha ao registrar novo usuario"
        });
    });
    return res.status(201).json({
      message: "Bem-vindo(a) ao Plantfolio Ascii",
      token: generateToken({id: user.id})
    });
  }catch(err){
    console.log(err);
    return res.status(401).json({
      error: "falha ao registrar novo usuario"
    });
  }
});

router.post('/authenticate', async (req, res) => {
  const {email, password} = req.body;
  
  //tentar encontrar usuario que corresponda o email informado
  const user = await User.findOne({ email }).select('+password');
  if(!user){
    return res.status(401).json({
      error: "falha na autenticacao"
    });
  }

  if(!await bcrypt.compare(password, user.password)){
    return res.status(401).json({
      error: "falha na autenticacao"
    });
  }

  //apenas para n retornar a senha pro frontend
  user.password = undefined;

  const token = 

  res.status(200).json({
    user, 
    token: generateToken({ id: user.id }),
  });
});

router.post('/forgot_password',  async(req, res) => {
  const { email } = req.body;
  try{
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({
        error: "falha na recuperaçao de senha, tente novamente"
      });
    }

    const token = crypto.randomBytes(20).toString('hex');
    
    const expirationDate = new Date(); 
    expirationDate.setMinutes(expirationDate.getMinutes()+15);//15 minutos de validade
    // expirationDate.setHours(expirationDate.getHours()+1);

    await User.findByIdAndUpdate(user.id, {
      '$set':{
        passwordResetToken:token,
        passwordResetExpires:expirationDate,
      }
    });

    await mailer.sendMail({
      html: `
      <html>
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap" rel="stylesheet"> 
      <style>
        * {
          font-family: 'Comfortaa', Arial, Helvetica, sans-serif;
          margin: 5px;
          padding: 0;
          outline: none;
          box-sizing: border-box;
        }
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        a {
          text-decoration: none;
          text-align: center;
          background: #07d;
          color: #fff;
          margin: 10px;
          padding: 5px;
          border-radius: 8px;
        }
        p{
          margin: 10px;
        }
        strong {
          color: #07d;
        }
      </style>
      <body>
        <h1>Recuperação de senha Plantfolio Ascii</h1>
        <p>Esqueceu sua senha?<br/>
          clique no link a seguir nos proximos 15 minutos para recuperar
          o acesso a sua conta:<br/>
        </p>
        <a href="${resetURL}/${token}">
          Criar nova senha
        </a>
        <p>Ou copie e cole no seu navegador:<br/>
        <strong>${resetURL}/${token}</strong>
        </p>
      </body>
    </html>
      `,
      subject: 'Plantfolio Ascii - Recuperação de senha',
      from: 'No-reply Plantfolio <plantfolio.ascii@gmail.com>',
      to: email
    },(err) => {
      // console.log(err);
      if(err)
        return res.status(401).json({
          error: "falha na recuperaçao de senha, tente novamente"
        });
      return res.status(200).json({
        message: 'um token de recuperação de senha foi enviado ao email cadastrado na conta'
      });
    });
  }catch(err){
    // console.log(err);
    res.status(401).json({
      error: "falha na recuperaçao de senha, tente novamente"
    })
  }
});

router.put('/reset_password', async(req, res) => {
  const { email, token, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');

    if(!user)
      return res.status(401).json({
        error: "falha na alteração da senha, tente novamente"
      });  
    
    if(token !== user.passwordResetToken)
      return res.status(401).json({
        error: "falha na alteração da senha, tente novamente"
      });
    
    const now = new Date();
    if(now > user.passwordResetExpires)
      return res.status(401).json({
        error: "falha na alteração da senha, tente novamente"
      });  
    user.passwordResetExpires = now;
    user.password = password;
    await user.save();
    return res.json({
      ok:true
    });
  }catch(err){
    res.status(401).json({
      error: "falha na alteração da senha, tente novamente"
    });
  }
});

module.exports = (app) => app.use('/api/auth', router);