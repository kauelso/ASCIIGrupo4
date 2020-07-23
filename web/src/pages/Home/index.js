import './styles.css';
import logo from '../../assets/logo.svg';
import { useHistory, Link } from 'react-router-dom';


import React, { Component } from "react";
import { AiFillHeart } from "react-icons/ai";
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
      document.getElementById(tab).style.backgroundColor = "#323438";



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
              <div class="tg-wrap">
                
                <table class="tg">
                  <thead>
                    <tr>
                      <th className="tg-var1" rowspan="2">foto panta</th>
                      <th className="tg-var2" colspan="2">nome planta</th>
                      <th className="tg-var2" rowspan="2"></th>
                      <th className="tg-var3" rowspan="2">icone regador</th>
                      <th className="tg-var3" rowspan="2">ultima regada</th>
                      <th className="tg-var2" rowspan="2"></th>
                      <th className="tg-var2">arquivar</th>
                      <th className="tg-var2"> Favoritar</th>
                    </tr>
                    <tr>
                      <td className="tg-var2">tipo planta</td>
                      <td className="tg-var2">data adesao</td>
                      <td className="tg-var2">"arquivar"</td>
                      <td className="tg-var2"><AiFillHeart/></td>
                    </tr>
                  </thead>
                </table>
              </div>


              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
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
              </MDBTabPane>
              <MDBTabPane tabId="3" role="tabpanel">
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

                    




                    <input type="submit" value="Alterar Dados" className="botão-submit" id="botão-planta" />

                  </form>
                </div>
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





