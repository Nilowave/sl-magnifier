import React from 'react';

import './Player.scss';


class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.progress)
        return (
            <div className="player">
                <div className="sprite idle">
                    <div className="head"></div>
                </div>
            </div>
        )
    }
}

export default Player