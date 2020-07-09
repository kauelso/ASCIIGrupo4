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
    expiresIn: 86400,
  });
}

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
          text-align: center;
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
        return res.status(400).json({
          error: 'não foi possivel enviar o email boas vindas'
        });
    });
    return res.status(201).json({
      message: "Bem-vindo(a) ao Plantfolio Ascii",
      token: generateToken({id: user.id})
    });
  }catch(err){
    console.log(err);
    return res.status(400).json({
      error: true,
      message: 'erro ao criar novo usuario',
    });
  }
});

router.post('/authenticate', async (req, res) => {
  const {email, password} = req.body;
  
  //tentar encontrar usuario que corresponda o email informado
  const user = await User.findOne({ email }).select('+password');
  if(!user){
    return res.status(400).json({
      error: true,
      message: "usuario nao encontrado"
    });
  }

  if(!await bcrypt.compare(password, user.password)){
    return res.status(400).json({
      error:true,
      message: "senha invalida"
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
      return res.status(400).json({
        error: true,
        message: "usuario nao encontrado"
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
          text-align: center;
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
          clique no link a seguir para recuperar
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
        return res.status(400).json({
          error: 'não foi possivel enviar o email de recuperacao de senha'
        });
      return res.status(200).json({
        message: 'um token de recuperação de senha foi enviado ao email cadastrado na conta'
      });
    });

    /*mailer.sendMail({
      to:email,
      from: 'developer.adiel@gmail.com',
      template: 'auth/forgot_password',
      context:{token},
    },(err) => {
      console.log(err);
      if(err){
        return res.status(400).json({
          error: true,
          token,
          message: 'Nao foi possivel enviar o email de recuperacao de senha'
        });
        res.status(200).json({
          ok:true
        });
      }
    });*/
  }catch(err){
    // console.log(err);
    res.status(400).json({
      error: true,
      message: "falha ao recuperar a senha, tente novamente"
    })
  }
});

router.put('/reset_password', async(req, res) => {
  const { email, token, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');

    if(!user)
      return res.status(400).json({
        error:true,
        message: 'Usuario nao encontrado'
      });  
    
    if(token !== user.passwordResetToken)
      return res.status(400).json({
        error:true,
        message: 'token invalido'
      });
    
    const now = new Date();
    if(now > user.passwordResetExpires)
      return res.status(400).json({
        error: true,
        message:'token expirado'
      });  
    user.password = password;
    await user.save();
    return res.json({
      ok:true
    })
  }catch(err){
    res.status(400).json({
      error: true,
      message: "Nao foi possivel alterar a senha, tente novamente"
    });
  }
});

module.exports = (app) => app.use('/api/auth', router);