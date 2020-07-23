import React from 'react';

const NewPlant = () => {
  return (
    <div className="form">
      <form action="">
        <h1>ADICIONAR PLANTA</h1>
        <label id="nomeG" for="nomeG">Adicione um nome à Planta</label>
        <input type="text" placeholder="Nome Genérico da Planta" id="nomeG" />
        <label for="nomeG">Adicione o nome científico da planta</label>
        <input type="text" placeholder="Nome Científico da Planta (Opcional)" id="nomeC" />
        <label for="msg">Adicione uma descrição</label>
        <textarea id="msg" placeholder="Descrição da planta"></textarea>
        <label for="msg">Ultima data em que a regou: <br /></label>
        <input type="date" id="date" />
        <button type="button">Adicionar Imagem</button>
        <input type="submit" value="Registrar Planta" className="botão-submit" id="botão-planta" />
      </form>
    </div>
  );
}

export default NewPlant;