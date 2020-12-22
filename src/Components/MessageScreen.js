import React from 'react';
import { Component } from 'react';

class MessageScreen extends Component{

    
    constructor(props){
        super(props)
        this.state ={
            oldState : props.visible,
            time : -1,
            played : false
        }

    }
    
    async timer(count){
        console.log(count)
        if(count === 0){
            document.getElementById("message").style.display = "none"
            const old = this.state.oldState
            this.setState({oldState : !old},)
            return 0
        }else{
            this.setState({
                 time : count
            })
            return setTimeout(() => this.timer(count - 1), 1000)
        }
         
    }


    componentDidUpdate(){
        console.log("houve update!",this.state.oldState)
        // if(this.state.oldState !== this.props.visible ){
            if (!this.state.visible && !this.state.played){
            this.setState({
                played : true
            })
            console.log(this.state.oldState,this.props.visible)
            this.timer(3).then(()=>{
                console.log("invisible!")
            })
        }
    }
    render (){  
            
        return (<div id="message" >
            <h1>
                {/* {this.props.title} */}
                SNAKE GAME
            </h1>
            <div id="content">
                {/* {this.props.title2} */this.state.time >= 0 ? this.state.time : ''}
                
            </div>
        </div>)
    }

}


export default MessageScreen