import React from "react";
import {AiFillHeart} from "react-icons/ai";


const MyPlants = () => {
  return (
    <div>
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

    </div>
  );
}

export default MyPlants;