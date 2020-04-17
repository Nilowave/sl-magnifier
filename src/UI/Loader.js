import React from 'react';

import LoaderSVG from '../../assets/loader.svg';
// import './Player.scss';


class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading">
                <h1>Is your sound on?</h1>
                
                {this.props.sound ? (
                    <p onClick={this.props.playSound}>Yes!</p>
                ) : <LoaderSVG className="indicator" />}
            </div>
        )
    }
}

export default Loader;