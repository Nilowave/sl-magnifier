import React from 'react';

import Game from '../Game/Game';
import UI from '../UI/UI';

import './App.scss';

import { connectSocket, clickEgg, startGame, endGame } from '../api';

const AMMO = 2;

class App extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleSocketResponse = this.handleSocketResponse.bind(this);

        this.state = {
            value: 0,
            start: false,
            clicks: 0,
            players: [],
            endGame: false
        };

        connectSocket(this.handleSocketResponse);

    }

    handleSocketResponse(response) {
        switch(response.type) {
            case "update-egg":
                this.setState({
                    ...this.state,
                    ...response.data
                });
            break;

            case "update-players":
                this.setState({
                    ...this.state,
                    players: response.data
                });
                break;

            case "end-game":
                this.runEndGame(response.data);
                break;
        }

        if (response.type == "update-players" && !this.state.start) {
            this.tryReconnect();
        }
    }

    handleClick(e) {
        let count = this.state.player.clicks;
        count++;
        this.setState({
            ...this.state,
            player: {
                ...this.state.player,
                clicks: count
            }
        })

        clickEgg(AMMO);
    }

    startGame(player) {
        console.log("player", player)
        this.setState({start:true, player: player});
        startGame(player);
    }

    runEndGame(data) {
        this.setState({
            ...this.state,
            endGame: true
        })
        endGame(this.state.player);
    }

    tryReconnect() {
        let player = JSON.parse(window.localStorage.getItem("sl-magnifier"));
        let match = this.state.players.filter(p => { console.log("p",p); return p.name == player.name})[0];

        if (match) {
            this.startGame(player);
        } else {
            window.localStorage.clear();
        }
    }

    render() {
        // console.log(this.state.players)
        return (
            <div className="app">
                <div className="grad"></div>
                <Game onClick={this.handleClick} progress={this.state.value * 100} players={this.state.players} endGame={this.state.endGame} />

                {!this.state.start && (
                    <UI onComplete={this.startGame} players={this.state.players} />
                )}
            </div>
        )
    }
}

export default App