import React from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';

import {Container, Column, Tab, Icon, Navbar} from 'rbx';


const Home = () => {
  return (
    <Container>
      <header>
     <div class="container5" id="imagem">
        <img src={logo} alt="Plantfolio Ascii" />
        
        </div>
        <div class="container5">
        <h1>Plantfolio<br></br>Ascii</h1>
        
        </div>
   </header>
   
   <Tab.Group kind="boxed">
  <Tab active>
    <Icon size="small">
    </Icon>
    <span>Pictures</span>
  </Tab>
  <Tab>
    <Icon size="small">
    </Icon>
    <span>Music</span>
  </Tab>
  <Tab>
    <Icon size="small">
    </Icon>
    <span>Videos</span>
  </Tab>
  <Tab>
    <Icon size="small">
    </Icon>
    <span>Documents</span>
  </Tab>
</Tab.Group>

</Container>

  );
}

export default Home;