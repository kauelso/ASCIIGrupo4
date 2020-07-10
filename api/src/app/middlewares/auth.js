const jwt = require('jsonwebtoken');
const authSecret = process.env.AUTH_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //verificar se token foi informado
  if(!authHeader) return res.status(401).json({
    error: true,
    message: "token de autenticação nao informado"
  });

  // verificar se token esta no padrao aceito
  // Bearer afjahsfuoshfahofuauhfausfhauhufiahf
  const parts = authHeader.split(' ');
  if(!parts.length===2) return res.status(401).json({
    error: true,
    message: "token error"
  });

  const [scheme, token] = parts;

  // regex
  if(!/^Bearer$/i.test(scheme)) return res.status(401).json({
    error: true,
    message: "token mal estruturado"
  });

  jwt.verify(token, authSecret, (err, decoded) => {
    if(err) {
      return res.status(401).json({
        error:true,
        message: 'token expirado'
      });
    }

    req.userId = decoded.id;
    return next();
  });
};