import React from "react";
import { useHistory } from 'react-router-dom';

import './styles.css';

const Logout = () => {
  const history = useHistory();
  function handleLogout(){
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionEmail');
    localStorage.removeItem('sessionName');
    localStorage.removeItem('sessionUID');
    history.push('/login');
  }
  
  return (
    <div className="logout-container">
      <p> Clique no botao abaixo para fazer logout</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;