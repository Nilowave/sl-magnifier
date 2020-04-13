import React from 'react';

import Game from '../Game/Game';
import UI from '../UI/UI';

import './App.scss';

import { connectSocket, clickEgg } from '../api';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.startGame = this.startGame.bind(this);

        this.state = {
            value: 0,
            start: false
        };

        connectSocket((err, eggState) => this.setState({
            ...eggState
        }));

    }

    handleClick(e) {
        clickEgg(10);
    }

    startGame(e) {
        console.log(e)
        this.setState({start:true});
    }

    render() {
        return (
            <div className="app">
                <Game onClick={this.handleClick} progress={this.state.value * 100} />

                {!this.state.start && (
                    <UI onComplete={this.startGame} />
                )}
                <div className="grad"></div>
            </div>
        )
    }
}

export default App