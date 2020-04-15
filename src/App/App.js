import React from 'react';

import Game from '../Game/Game';
import UI from '../UI/UI';

import soundFile from '../../static/sing.mp3';

import './App.scss';

import { socketOnConnect, socketOnEggClick, socketOnStartGame, socketOnEndGame } from '../api';

const AMMO = 10;

class App extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleSocketResponse = this.handleSocketResponse.bind(this);
        this.hideUI = this.hideUI.bind(this);
        this.playSound = this.playSound.bind(this);

        this.state = {
            value: 0,
            clicks: 0,
            players: [],
            endGame: false
        };

        socketOnConnect(this.handleSocketResponse);

        this.game = React.createRef();

    }

    handleSocketResponse(response) {
        console.log("handleSocketResponse", response.type)
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

        if (response.type == "update-players" && !this.state.player) {
            console.log("is plaer ready???",this.state.player)
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

        socketOnEggClick(AMMO);
    }

    startGame(player) {
        console.log("START GAME")
        // console.log("player", player)
        this.setState({player: player});
        socketOnStartGame(player);
    }

    hideUI() {
        this.setState({start:true});
    }

    runEndGame(data) {
        this.setState({
            ...this.state,
            endGame: true
        });

        socketOnEndGame(this.state.player);

        this.game.current.runEndGame();
    }

    tryReconnect() {
        console.log("try reconnect")
        let player = JSON.parse(window.localStorage.getItem("sl-magnifier"));
        let match = this.state.players.filter(p => { console.log("p",p); return p.name == player.name})[0];

        if (match) {
            this.setState({start:true});
            this.startGame(player);
        } else {
            console.log("no player match in mage");
            window.localStorage.clear();
        }
    }

    playSound() {
        let sound = createjs.Sound.play("sing");
        sound.volume = .3;
        this.setState({sound: false});

        let text = new SplitText(".loading h1", { type: "chars" });

        gsap.to(text.chars, {duration: .6, y:"100vh", ease:Back.easeIn, stagger:.1, onComplete:(e) => {
            this.setState({start: false});
        }});
    }

    componentDidMount() {
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.on("fileload", (e) => {
            this.setState({sound:true});
        }, this);
        createjs.Sound.registerSound(soundFile, "sing");
    }

    render() {
        console.log(this.state.player)
        return (
            <div className="app">
                
                <div className="grad"></div>
                <Game onClick={this.handleClick} progress={this.state.value * 100} players={this.state.players} player={this.state.player} endGame={this.state.endGame} ref={this.game} />
                
                {this.state.start === undefined && (
                    <div className="loading">
                        <h1>Are you ready?</h1>
                        {this.state.sound && (
                            <p onClick={this.playSound}>Yes!</p>
                        )}
                    </div>
                )}

                {this.state.start === false && (
                    <UI startGame={this.startGame} players={this.state.players} hideUI={this.hideUI} />
                )}
            </div>
        )
    }
}

export default App