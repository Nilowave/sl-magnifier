import React from 'react';

import './End.scss';


class End extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let endTL = gsap.timeline();

        let circels = Array.from(document.querySelectorAll(".end .cc")).reverse();

        let freeText = new SplitText(".end .text_1", {type:"words"});
        let thankYou = new SplitText(".end .text_2", {type:"chars"});
        let everyone = new SplitText(".end .text_3", {type:"chars"});

        endTL.from(".mg-container", {duration: 2, scale:.7, y:"20%", ease: Expo.easeOut, delay:.1}, "start")
        endTL.from(freeText.words, {duration: .4, y:20, opacity:0, ease: Expo.easeOut, stagger:.2}, "start")
        endTL.to(freeText.words, {duration: .5, opacity:0, ease: Quad.easeOut}, "start+=1.5")
        endTL.from(circels, {duration: 3, opacity:0, scale:1.2, ease: Elastic.easeOut, stagger:.1}, "start+=2.5")
        endTL.from(thankYou.chars, {duration: .5, opacity:0, scale:1.2, ease: Expo.easeOut, stagger:.1}, "start+=5")
        endTL.from(everyone.chars, {duration: .5, opacity:0, scale:1.2, ease: Expo.easeOut, stagger:.1}, "start+=6.5")
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
                <h2 className="text_2">Thank you!</h2>
                <h2 className="text_3">Everyone deserves it!!</h2>
            </div>
        )
    }
}

export default End