import React from 'react';

import './End.scss';


class End extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let endTL = gsap.timeline();

        endTL.from(".mg-container", {duration: 2, scale:.7, y:"20%", ease: Expo.easeOut, delay:.1, onComplete:() => {
            // document.querySelector(".mg").classList.add("wiggle");
        }})
    }

    render() {
        
        return (
            <div className="end">
                <h1 className="text_1">I am</h1>
                <div className="mg-container">
                    <div className="mg"></div>
                </div>
                <h1 className="text_2">freeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h1>
            </div>
        )
    }
}

export default End