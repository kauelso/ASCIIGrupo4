import React from "react";

const UserSettings = () => {
  return (
    <div className="form">
      <form action="">
        <h1>ALTERAR DADOS</h1>
        <label className="nomeG" for="Altnome">Altere seu nome</label>
        <input type="text" placeholder="Seu Nome" id="Altnome" />
        <label for="Altemail">Altere seu e-mail</label>
        <input type="email" placeholder="Seu E-mail" id="Altemail" />
        <label for="Altsenha1">Altere sua senha</label>
        <input type="password" placeholder="Sua nova senha" id="Altsenha2" />
        <label for="Altsenha2">Confirme sua nova senha</label>
        <input type="password" placeholder="Confirme sua nova senha" id="Altsenha2" />
        <input type="submit" value="Registrar Planta" className="botão-submit" id="botão-planta" />
      </form>
    </div>
  );
}

export default UserSettings;