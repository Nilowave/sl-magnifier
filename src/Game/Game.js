import React from 'react';
import Player from './Player';
import End from './End';

import './Game.scss';


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClick = this.onClick.bind(this);
        this.runEndGame = this.runEndGame.bind(this);

        this.egg = React.createRef();
        this.crack = React.createRef();

        this.state = {
            end: false
        }
        
    }

    onMouseOver() {
        document.querySelector(".game .egg-wrapper .hover").style.display = "block";
    }

    onMouseOut() {
        document.querySelector(".game .egg-wrapper .hover").style.display = "none";
    }

    onClick(e) {
        if (this.props.endGame) return;

        this.props.onClick(e);
        
        if (this.props.progress >= 60) {
            clearTimeout(this.eggTabDelay);
            this.egg.current.classList.remove("idle");
            this.egg.current.classList.remove("wiggle");
            this.egg.current.classList.add("boil");
            return
        }

        this.egg.current.classList.remove("idle");
        this.egg.current.classList.add("wiggle");

        if (this.eggTabDelay) clearTimeout(this.eggTabDelay);
        this.eggTabDelay = setTimeout(this.stopEggWiggle.bind(this), 500)
    }

    stopEggWiggle() {
        this.egg.current.classList.remove("wiggle");
        this.egg.current.classList.add("idle");
    }

    runEndGame(data) {
        this.egg.current.classList.remove("idle");
        this.egg.current.classList.remove("wiggle");
        this.egg.current.classList.remove("boil");
        this.egg.current.classList.add("cracked");

        this.setState({end:true});

        let endGameTL = gsap.timeline();

        endGameTL.set(".flash", {opacity: 1})
        endGameTL.to(".flash", {duration:.6, opacity:0, ease: Expo.easeOut}, "start")
        endGameTL.to(this.egg.current, {duration:.8, y:"10%", ease: Bounce.easeOut}, "start")
        endGameTL.to(".players", {duration: 1, y: "200%", scale:1.2, ease: Expo.easeIn}, "start+=.5");
        endGameTL.to([".floor",".egg-container"], {duration: 1, y: "200%", scale:1.2, ease: Expo.easeIn}, "start+=.7");
        
    }

    render() {
        let p = 100 / 7;
        let crack = Math.floor(this.props.progress / p);
        let crackClass = crack > 0 ? "c"+crack : "";
        crackClass = crack < 7 ? crackClass : "c6";

        let weapon = this.props.player ? this.props.player.weapon : "";
        
        return (
            <div className="game">

                <div className="floor">
                    <div className="shadow"></div>
                </div>

                {this.state.end && (
                    <End music={this.props.music} winner={this.props.winner || {}}/>
                )}
                
                <div className="egg-container">
                    <div className="egg-wrapper idle" onClick={this.onClick}  ref={this.egg}>
                        <div className="egg" ></div>
                        <div className="colored-wrapper" style={{height: this.props.progress + "%"}}>
                            <div className="egg colored"></div>
                        </div>
                        <div className={"egg crack "+crackClass} ref={this.crack}></div>
                        <div className="egg hover"></div>
                        <div className={"tap " + weapon} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}></div>
                    </div>
                </div>


                <div className="grad"></div>

                <div className="players">
                    {
                        this.props.players.map(p => {
                            return(
                                <div key={p.name} className={"sprite idle " + p.side} style={{marginTop:p.offset+"vh"}}>
                                <div className={"head "+p.name}></div>
                            </div>
                            )
                        })
                    }
                </div>

                <div className="flash"></div>

            </div>
        )
    }
}

export default Game