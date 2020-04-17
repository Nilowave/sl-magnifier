import React from 'react';
import CircleType from 'circletype';

import './End.scss';


class End extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let volume = {val:1};

        let endTL = gsap.timeline();

        let circels = Array.from(document.querySelectorAll(".end .cc")).reverse();

        let freeText = new SplitText(".end .text_1", {type:"words"});

        const thankYou = new CircleType(document.querySelector('.end .text_2'));
        thankYou.radius(380);

        const everyone = new CircleType(document.querySelector('.end .text_3'));
        everyone.radius(340);

        const keeper = new CircleType(document.querySelector('.end .text_6'));
        keeper.dir(-1).radius(340);

        endTL.from(".mg-container", {duration: 2, scale:.7, y:"20%", ease: Expo.easeOut, delay:.1}, "start")
        endTL.from(freeText.words, {duration: .4, y:20, opacity:0, ease: Expo.easeOut, stagger:.2}, "start")
        endTL.to(freeText.words, {duration: .5, opacity:0, ease: Quad.easeOut}, "start+=1.5")
        endTL.from(circels, {duration: 1, opacity:0, ease: Expo.easeOut, stagger:.1}, "start+=2.5")
        endTL.from(thankYou._letters, {duration: .5, opacity:0, ease: Expo.easeOut, stagger:.1}, "start+=3")
        endTL.from(everyone._letters, {duration: .5, opacity:0, ease: Expo.easeOut, stagger:.05}, "start+=4.5")
        endTL.from(".end .text_4", {duration: .0001, opacity:0}, "start+=6.2")
        endTL.from(".end .text_5", {duration: .0001, opacity:0}, "start+=7")
        endTL.from(keeper._letters, {duration: .5, opacity:0, ease: Expo.easeOut, stagger:.05}, "start+=8")

        endTL.to(".end .black", {duration: 5, opacity:1, ease:Quad.easeIn}, "start+=13")
        endTL.to(volume, {duration:5, val:0, ease: Linear.easeNone, onUpdate:(e) => {
            this.props.music.volume = volume.val;
        }}, "start+=13")
        
        endTL.to(volume, {duration:0.00001, val:1, ease: Linear.easeNone, onUpdate:(e) => {
            this.props.music.volume = volume.val;
        }}, "start+=20")
        endTL.to(".end .black", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
        endTL.to(".end .text_1", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
        endTL.to(".end .text_2", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
        endTL.to(".end .text_3", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
        endTL.to(".end .text_4", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
        endTL.to(".end .text_5", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
        endTL.to(".end .text_6", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
        endTL.to(".end .text_7", {duration: 0.00001, autoAlpha: 1, display:'block'}, "start+=20")
        endTL.to(".end .text_8", {duration: 0.00001, autoAlpha: 1, display:'block'}, "start+=20")
        endTL.to(".end .face", {duration: 0.00001, autoAlpha: 1, display:'block'}, "start+=20")
        endTL.to(".end .mg-container", {duration: 0.00001, autoAlpha: 0, display:'none'}, "start+=20")
    }

    fadeMusic() {
        let volume = {val:1};
        gsap.to(volume, {duration:5, val:0, ease: Linear.easeNone, onUpdate:(e) => {
            this.props.music.volume = volume.val;
        }});
    }

    render() {
        
        return (
            <div className="end">
                <div className="circles">
                    <div className="cc circle_1"></div>
                    <div className="cc circle_2"></div>
                    <div className="cc circle_3"></div>
                    <div className="cc circle_4"></div>
                    <div className="cc circle_5"></div>
                </div>
                <h1 className="text_1">I am free!!</h1>
                <div className="mg-container">
                    <div className="mg"></div>
                </div>
                
                <div className={"face "+(this.props.winner.name || "")}></div>

                <div className="text_2">Thank you!</div>
                <div className="text_3">Everyone deserves me!!</div>
                <div className="text_4">But</div>
                <div className="text_5">Only<br/>1</div>
                <div className="text_6">is my<br/>keeper...</div>

                <div className="text_7">Congratulations!</div>
                <div className="text_8">{this.props.winner.name || ""}</div>

                <div className="black"></div>
            </div>
        )
    }
}

export default End