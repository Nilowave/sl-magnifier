import React from 'react';

import LoaderSVG from '../../assets/loader.svg';
// import './Player.scss';


class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.clickIt = this.clickIt.bind(this);

        this.state = {
            loading: true
        }
    }

    clickIt() {
        this.setState({loading:false});
        this.props.playSound()
    }

    render() {
        return (
            <div className="loading">
                <h1>Is your sound on?</h1>
                
                {(this.props.sound && !this.props.isAdmin && this.props.gameOn) ? (
                    <p onClick={this.clickIt}>Yes!</p>
                ) : (this.state.loading && !this.props.sound) && <LoaderSVG className="indicator" />}

                {(this.state.loading && this.props.isAdmin && this.props.sound) && (
                     <p className="admin" onClick={this.props.runGameOn}>Game on!</p>
                )}
            </div>
        )
    }
}

export default Loader;