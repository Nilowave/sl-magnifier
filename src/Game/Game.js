import React from 'react';

import './Game.scss';


class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.progress)
        return (
            <div className="game">
                
                <div className="egg-container">
                    <div className="egg-wrapper idle" onClick={this.props.onClick}>

                        <img src="./egg-grey.png" className="egg" />
                        <div className="colored-wrapper" style={{height: this.props.progress + "%"}}>
                            <div className="egg colored"></div>
                        </div>
                    </div>
                </div>

                <div className="floor">
                    <div className="shadow"></div>
                    <div className="sprite idle">
                        <div className="head"></div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Game