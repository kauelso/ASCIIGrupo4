import './styles.css';
import logo from '../../assets/logo.svg';
import { useHistory, Link } from 'react-router-dom';


import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from "mdbreact";
import { Container } from 'rbx';

class Home extends Component {
  state = {
    activeItemJustified: "1"

    }

  toggleJustified = tab => e => {
    if (this.state.activeItemJustified !== tab) {
      var antiga = this.state.activeItemJustified;
      this.setState({
        activeItemJustified: tab

      });
      document.getElementById(antiga).style.backgroundColor = "#131418";
      document.getElementById(tab).style.backgroundColor = "#32343881";
  

      
    }
  };


  render() {
    return (
      <div id="body">

        <MDBContainer>

          <header>
            <div className="container5" id="imagem">
              <img src={logo} alt="Plantfolio Ascii" />

            </div>
            <div className="container5">
              <h1>Plantfolio<br></br>Ascii</h1>

            </div>
          </header>

          <div id="topo">
            <MDBNav tabs className="nav-justified" >
              <MDBNavItem>
                <div id="1" className="menu1" link to="#" active={this.state.activeItemJustified === "1"} onClick={this.toggleJustified("1")} role="tab">
                  <p>Minhas Plantas</p>
                </div>
              </MDBNavItem>
              <MDBNavItem>
                <div id="2" className="menu" link to="#" active={this.state.activeItemJustified === "2"} onClick={this.toggleJustified("2")} role="tab" >
                  <p>Nova Planta</p>
                </div>
              </MDBNavItem>
              <MDBNavItem>
                <div id="3" className="menu" link to="#" active={this.state.activeItemJustified === "3"} onClick={this.toggleJustified("3")} role="tab" >
                  <p>Configurações</p>
                </div>
              </MDBNavItem>
              <MDBNavItem>
                <div id="4" className="menu" link to="#" active={this.state.activeItemJustified === "4"} onClick={this.toggleJustified("4")} role="tab" >
                  <p>Sair</p>
                </div>
              </MDBNavItem>
            </MDBNav>
          </div>
          <div id="baixo">
            <MDBTabContent
              className="card"
              activeItem={this.state.activeItemJustified}
            >
              <MDBTabPane tabId="1" role="tabpanel">
                <p className="mt-2">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth. Cosby sweater eu banh mi, qui irure terry richardson
                  ex squid. Aliquip placeat salvia cillum iphone. Seitan
                  aliquip quis cardigan american apparel, butcher voluptate
                  nisi qui.
              </p>
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                <form action="">
                  <input type="text" placeholder="Nome Genérico da Planta" id="nomeG" />
                  <input type="text" placeholder="Nome Científico da Planta (Opcional)" id="nomeC" />
                  <label for="msg"></label>
                  <textarea id="msg" placeholder="Descrição da planta"></textarea>
                  <button type="button">Adicionar Imagem</button>
                  <label for="msg">Ultima data em que a regou: <br/></label>
                  <input type="date" id="date" />



                  <input type="submit" value="Registrar Planta" className="input-btn" id="botão-planta"/>

                </form>
              </MDBTabPane>
              <MDBTabPane tabId="3" role="tabpanel">
                <p className="mt-2">
                  Etsy mixtape wayfarers, ethical wes anderson tofu before
                  they sold out mcsweeney's organic lomo retro fanny pack
                  lo-fi farm-to-table readymade. Messenger bag gentrify
                  pitchfork tattooed craft beer, iphone skateboard locavore
                  carles etsy salvia banksy hoodie helvetica. DIY synth PBR
                  banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
                  Williamsburg banh mi whatever gluten-free, carles pitchfork
                  biodiesel fixie etsy retro mlkshk vice blog. Scenester cred
                  you probably haven't heard of them, vinyl craft beer blog
                  stumptown. Pitchfork sustainable tofu synth chambray yr.
              </p>
              </MDBTabPane>
              <MDBTabPane tabId="4" role="tabpanel">
                <p className="mt-2">
                  Etsy mixtape wayfarers, ethical wes anderson tofu before
                  they sold out mcsweeney's organic lomo retro fanny pack
                  lo-fi farm-to-table readymade. Messenger bag gentrify
                  pitchfork tattooed craft beer, iphone skateboard locavore
                  carles etsy salvia banksy hoodie helvetica. DIY synth PBR
                  banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
                  Williamsburg banh mi whatever gluten-free, carles pitchfork
                  biodiesel fixie etsy retro mlkshk vice blog. Scenester cred
                  you probably haven't heard of them, vinyl craft beer blog
                  stumptown. Pitchfork sustainable tofu synth chambray yr.
              </p>
              </MDBTabPane>
            </MDBTabContent>
          </div>
        </MDBContainer>
      </div>

    );
  }
}

export default Home;




