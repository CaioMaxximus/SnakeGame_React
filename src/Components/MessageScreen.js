import React from 'react';
import { Component } from 'react';

class MessageScreen extends Component{

    
    constructor(props){
        super(props)
        this.state ={
            oldState : props.visible
        }

    }
    
    timer(count){
        console.log(count)
        if(count === 0){
            document.getElementById("message").style.display = "none"
            return 0
        }else{
            return setTimeout(() => this.timer(count - 1), 1000)
        }
         
    }


    componentDidUpdate(){
        console.log("houve update!",this.state.oldState)
        if(this.props.visible){
            document.getElementById("message").style.display = "block"
            console.log("visible!")
        }
        else{
            document.getElementById("message").style.display = "none"
            console.log("invisible!")

        }
        if(this.state.oldState !== this.props.visible){
            this.timer(3)
        }
    }
    render (){  
            
        return (<div id="message" >
            <h1>
                {this.props.title}
            </h1>
            <div>
                {this.props.title2}
            </div>
        </div>)
    }

}


export default MessageScreen