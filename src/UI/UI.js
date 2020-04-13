import React from 'react';

import './UI.scss';


class UI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            name: ""
        }

        this.handleNameClick = this.handleNameClick.bind(this);
    }

    handleNameClick(name) {
        this.setState({
            page: 2,
            name: name
        })
    }

    handleWeaponClick(weapon) {
        let data = {
            name: this.state.name,
            weapon: weapon
        }
        this.props.onComplete(data);
    }

    render() {
        let names = ["Troy", "Alison", "Junior", "Sombra", "Yusaku", "Kit", "Sean", "Akiko", "Michael", "Kelvin", "Pete", "Tyler", "Noëlle", "Krystin", "Kayla"];

        let weapons = ["cottoncandy", "spoon", "hammer"];

        let page;
        switch (this.state.page) {
            case 1:
                page = (
                    <div className="page1">
                        <div className="title">
                            <h1 className="halt">Halt!</h1>
                            <h1>Who goes there?</h1>
                        </div>
                        <div className="line"></div>
                        <div className="input">
                            <h1 className="answer">It is I...</h1>
                            <div className="names">
                                {
                                    names.map(n => {
                                        return <p onClick={(e) => this.handleNameClick(n)} value={n}>{n}</p>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
                break;
            case 2:
                page = (
                    <div className="page2">
                        <div className="title">
                            <h1 className="halt">Aha!</h1>
                            <h1>Welcome {this.state.name}.</h1>
                        </div>
                        <div className="line"></div>
                        <div className="input">
                            <h1 className="answer">Please, choose your method...</h1>
                            <div className="weapons">
                                {
                                    weapons.map(w=>{
                                        return <div className={`weapon ${w}`} onClick={ e =>{this.handleWeaponClick(w)}}></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
                break;
        }

        return (
            <div className="ui">
                {page}
            </div>
        )
    }
}

export default UI