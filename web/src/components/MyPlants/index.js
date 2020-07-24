import React, { Component } from "react";
import { AiFillHeart } from "react-icons/ai";
import heart from '../../assets/heart.svg';
import heart2 from '../../assets/heart2.svg';
import post from '../../assets/post.svg';
import post1 from '../../assets/post1.svg';
import post2 from '../../assets/post2.svg';
import post3 from '../../assets/post3.svg';
import regador from '../../assets/regador.svg';




class MyPlants extends Component {
  state = {
    controle: 0,
    controle2: 0,
    icon2: post,
    icon: heart
  }

  mudarCorFav = valor => e => {
    if (valor === 0) {
      this.setState({
        controle: 1,
        icon: heart2

      });
    }
    if (valor === 1) {
      this.setState({
        controle: 0,
        icon: heart

      });
    }
  };

  mudarCorArq = valor => e => {
    if (valor === 0) {
      this.setState({
        controle2: 1,
        icon2: post3

      });
    }
    if (valor === 1) {
      this.setState({
        controle2: 0,
        icon2: post

      });
    }
  };


  render() {
    return (
      <div>
        <div class="tg-wrap">

          <table class="tg">
            <thead>
              <tr>
                <th className="tg-var1" rowspan="2">foto panta</th>
                <th className="tg-var2" colspan="2">nome planta</th>
                <th className="tg-var2" rowspan="2"></th>
                <th className="tg-var3" rowspan="2"><img onClick={this.mudarCorArq(this.state.controle2)} src={regador} alt="post" width="60" /></th>
                <th className="tg-var3" rowspan="2">ultima regada</th>
                <th className="tg-var2" rowspan="2"></th>
                <th className="tg-var2"><img onClick={this.mudarCorArq(this.state.controle2)} src={this.state.icon2} alt="post" width="40" /></th>
                <th className="tg-var2"><img onClick={this.mudarCorFav(this.state.controle)} src={this.state.icon} alt="heart" width="40" /></th>
              </tr>
              <tr>
                <td className="tg-var2">tipo planta</td>
                <td className="tg-var2">data adesao</td>
                <td className="tg-var2">"arquivar"</td>
                <td className="tg-var2">Favoritar</td>
              </tr>
            </thead>
          </table>
        </div>

      </div>
    );
  }
}


export default MyPlants;