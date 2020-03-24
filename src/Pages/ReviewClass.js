import React, { Component } from 'react';

class ReviewClass extends Component {
    state = { 
        contoh : 0
    }
    render() { 
        return ( 
            <div>
                <input type='button' value='-' onClick={() => this.setState({contoh : this.state.contoh -1})}/>
                {this.state.contoh}
                <input type='button' value='+' onClick={() => this.setState({contoh : this.state.contoh +1})}/>
            </div>
        );
    }
}
 
export default ReviewClass;