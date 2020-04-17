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
                
                {this.props.sound ? (
                    <p onClick={this.clickIt}>Yes!</p>
                ) : this.state.loading && <LoaderSVG className="indicator" />}
            </div>
        )
    }
}

export default Loader;