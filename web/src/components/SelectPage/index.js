import './styles.css';
import React, { Component } from "react";

class SelectPage extends Component {
    state = {
        options: [
            {
                disabled: true,
                text: "team 1"
            },
            {
                text: "Option 1",
                value: "1"
            },
            {
                text: "Option 2",
                value: "2"
            },
            {
                disabled: true,
                text: "team 2"
            },
            {
                checked: true,
                text: "Option 3",
                value: "3"
            },
            {
                text: "Option 4",
                value: "4"
            }
        ]
    };

    render() {
        return (
            <div>
                <select id="appearance-select">
                    <option>Selecione por ⯆</option>
                    <option>Nome: crescente</option>
                    <option>Nome: decrescente</option>
                    <option>Data de adicão crescente</option>
                    <option>Data de adicão decrescente</option>
                    <option>Favoritas</option>
                    <option>Arquivadas</option>
                </select>
            </div>
        );
    }
}

export default SelectPage;




