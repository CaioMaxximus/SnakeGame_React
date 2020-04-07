import React ,{Component} from 'react';

class Pixel extends Component{

    render(){
        return <button onClick = {this.props.onClick}> {this.props.val}</button>
    }
}

export default Pixel;