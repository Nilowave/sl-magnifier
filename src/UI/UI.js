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
            weapon: weapon,
            clicks: 0
        }
        this.props.onComplete(data);
    }

    render() {
        let names = ["Troy", "Alison", "Junior", "Sombra", "Yusaku", "Kit", "Sean", "Akiko", "Michael", "Kelvin", "Pete", "Tyler", "Noëlle", "Kristina", "Kayla", "James", "Vinny"];

        this.props.players.map(p => {
            names.remove(p.name)
            return p
        })

        // names.sort(function (a, b) { return 0.5 - Math.random() });

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
                                        return <p key={n} onClick={(e) => this.handleNameClick(n)} value={n}>{n}</p>
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
                            <h1 className="halt">Splendid!</h1>
                            <h1>Welcome {this.state.name}.</h1>
                        </div>
                        <div className="line"></div>
                        <div className="input">
                            <h1 className="answer">Please, choose your weapon of choice...</h1>
                            <div className="weapons">
                                {
                                    weapons.map(w=>{
                                        return <div key={w} className={`weapon ${w}`} onClick={ e =>{this.handleWeaponClick(w)}}></div>
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

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

export default UI