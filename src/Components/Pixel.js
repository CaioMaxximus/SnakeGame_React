import React ,{Component} from 'react';
import './style.css'  
class Pixel extends Component{



    render(){
        const colorStyle = {
            backgroundColor : this.props.val
        }
        return <div className = 'pixel'
        style = {colorStyle}></div>
    }
}

export default Pixel;