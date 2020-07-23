import './styles.css';
import logo from '../../assets/logo.svg';
// import { useHistory, Link } from 'react-router-dom';

import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from "mdbreact";
// import { Container } from 'rbx';

import NewPlant from '../../components/NewPlant';
import MyPlants from '../../components/MyPlants';
import Logout from '../../components/Logout';
import UserSettings from '../../components/UserSettings';

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
              activeItem={this.state.activeItemJustified}>
              <MDBTabPane tabId="1" role="tabpanel">
                <MyPlants/>
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                <NewPlant/>
              </MDBTabPane>
              <MDBTabPane tabId="3" role="tabpanel">
                <UserSettings/>
              </MDBTabPane>
              <MDBTabPane tabId="4" role="tabpanel">
                <Logout/>
              </MDBTabPane>
            </MDBTabContent>
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default Home;




