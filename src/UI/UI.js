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
        this.setState({
            page: 3,
            weapon: weapon,
            clicks: 0
        })
    }

    animatePage2() {
        let splitTitle_1 = new SplitText("#title_2", { type: "chars" });
        let splitText_2 = new SplitText("#text_3", { type: "chars" });
        let splitText_3 = new SplitText("#text_4", { type: "words" });

        var page2TL = gsap.timeline({});

        page2TL.from(splitTitle_1.chars, { duration: .4, opacity: 0, scale: 2, x: 20, y: -10, stagger: .05, ease: Expo.easeOut }, "start");
        page2TL.from(splitText_2.chars, { duration: 2, opacity: 0, y: 20, stagger: .05, ease: Elastic.easeOut }, "start+=.8");
        page2TL.from("#line_2", { duration: 4, opacity: 0, scaleX: 0 }, "start+=.8");
        page2TL.from(splitText_3.words, { duration: 2, opacity: 0, x: -20, stagger: .1, ease: Elastic.easeOut }, "start+=3");
        page2TL.from(".weapon", { duration: 1.5, opacity: 0, y: "20vh", stagger: .3, ease: Expo.easeOut }, "start+=5.5");
    }

    animatePage3() {
        this.props.startGame(this.state);
        let pt1 = new SplitText("#pt1", { type: "words" });
        
        var page3TL = gsap.timeline({onComplete: e => {
            this.props.hideUI(this.state);
        }});

        page3TL.from(pt1.words, { duration: 3, x: "100vw", stagger: .5, ease: Expo.easeOut }, "start");
        page3TL.to("#pt1", { duration: 0.001, opacity: 0 });
        page3TL.from(".pt3_pt", { duration: 0.001, opacity: 0, ease: "steps (1)", stagger: 1 }, "start+=4");
        page3TL.to(".ui", { duration: 3, opacity: 0, ease: Quad.easeInOut, delay: 3 });
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page && this.state.page == 2) {
            this.animatePage2();
        }
        if (prevState.page !== this.state.page && this.state.page == 3) {
            this.animatePage3();
        }
    }

    componentDidMount() {
        let splitTitle_1 = new SplitText("#title_1", { type: "chars" });
        let splitText_2 = new SplitText("#text_1", { type: "words" });
        let splitText_3 = new SplitText("#text_2", { type: "words" });
        let names = Array.from(document.querySelectorAll(".player-name"));

        names.sort(function (a, b) { return 0.5 - Math.random() });

        var intro = gsap.timeline({ delay: .1 });

        intro.from(splitTitle_1.chars, { duration: .4, opacity: 0, scale: 1.2, x: 10, y: -10, stagger: .1, ease: Expo.easeOut }, "start");
        intro.from(splitText_2.words, { duration: 1.5, opacity: 0, y: -15, stagger: .2, ease: Expo.easeOut }, "start+=2");
        intro.from("#line_1", { duration: 5, opacity: 0, scaleX: 0 }, "start+=1");
        intro.from(splitText_3.words, { duration: .8, opacity: 0, y: -20, stagger: .1, ease: Bounce.easeOut }, "start+=3.2");
        intro.from(names, { duration: .8, opacity: 0, stagger: .1, ease: Elastic.easeOut }, "start+=4.2");

    }

    render() {
        let names = ["Troy", "Alison", "Junior", "Sombra", "Yusaku", "Kit", "Sean", "Akiko", "Michael", "Kelvin", "Pete", "Tyler", "Noelle", "Kristina", "Kayla", "James", "Vinny", "Danilo"];

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
                            <h1 className="halt" id="title_1">Halt!</h1>
                            <h1 id="text_1">Who goes there?</h1>
                        </div>
                        <div className="line" id="line_1"></div>
                        <div className="input">
                            <h1 className="answer" id="text_2">It is me...</h1>
                            <div className="names">
                                {
                                    names.map(n => {
                                        return <p key={n} className="player-name" onClick={(e) => this.handleNameClick(n)} value={n}>{n}</p>
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
                            <h1 className="halt" id="title_2">Splendid!</h1>
                            <h1 id="text_3">Welcome {this.state.name}.</h1>
                        </div>
                        <div className="line" id="line_2"></div>
                        <div className="input">
                            <h1 className="answer" id="text_4">Please, select your weapon of choice...</h1>
                            <div className="weapons">
                                {
                                    weapons.map(w => {
                                        return <div key={w} className={`weapon ${w}`} onClick={e => { this.handleWeaponClick(w) }}></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
                break;
            case 3:
                page = (
                    <div className="page3">
                        <h1 className="pt1" id="pt1">Get ready to</h1>
                        <h1 className="pt2 pt3_pt" id="pt2">Crack</h1>
                        <h1 className="pt3 pt3_pt" id="pt3">the</h1>
                        <h1 className="pt4 pt3_pt" id="pt4">Egg</h1>
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

Array.prototype.remove = function () {
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