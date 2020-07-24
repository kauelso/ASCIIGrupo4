import React from "react";
import './styles.css';


const Logout = () => {
  return (
    <div className="form">
      <form action="" >
        <h1>PARA FAZER O LOGOUT CLIQUE NO BOTÃO ABAIXO</h1>
        
        <input type="submit" value="SAIR" 
          className="botão-submit" id="botao-sair"  
        />
      </form>
    </div>
  );
}

export default Logout;