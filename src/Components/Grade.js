import React ,{Component} from 'react';
import Pixel from './Pixel';


class Grade extends Component{

    constructor(props){
        super(props)
        let pixels = []
        for (let index = 0; index < 10; index++) {
            let row = []
            for (let j = 0; j < 10; j++) {
                row.push('.')
                
            }
            pixels.push(row)
        }
        this.state = {
            pixels : pixels,
            direction : null
        }
        console.log(this.state.pixels)
    }

    controlDirection(row,column){

        const direction = this.state.direction
        switch(direction){
            case ('up'):
                this.movePixelUp(row - 1,column)
                break
            case ('down'):
                this.movePixelDown(row + 1,column)
                break
            case ('left'):
                this.movePixelLeft(row,column - 1)
                break
            case ('right'):
                this.movePixelRight(row,column + 1)
                break
            default:
                break
        }


    }

    changeDirection(direction){

        this.setState({
            direction : direction
        })
    }
    movePixelLeft(row,column){
        const pixels= this.state.pixels.slice()

        pixels[row][column] = 'X'
        pixels[row][column + 1] = '.'
        this.setState({
            pixels : pixels
        })
        if(column > 0 ){
            setTimeout(() => {
                this.controlDirection(row , column)
            }, 500);
        }
        
    }

    movePixelRight(row,column){
        const pixels= this.state.pixels.slice()

        pixels[row][column] = 'X'
        pixels[row][column -1] = '.'
        this.setState({
            pixels : pixels
        })
        if(column < 9){
            setTimeout(() => {
                this.controlDirection(row , column)
            }, 500);
        }
        
    }

    movePixelUp(row,column){
        const pixels= this.state.pixels.slice()

        pixels[row][column] = 'X'
        pixels[row + 1][column] = '.'
        this.setState({
            pixels : pixels
        })
        if(row > 0){
            setTimeout(() => {
                this.controlDirection(row , column)
            }, 500);
        }
        
    }

    movePixelDown(row,column){
        const pixels= this.state.pixels.slice()

        pixels[row][column] = 'X'
        pixels[row - 1][column] = '.'
        this.setState({
            pixels : pixels
        })
        if(row < 9){
            setTimeout(() => {
                this.controlDirection(row , column)
            }, 500);
        }
        
    }

    render(){
        let index = 0

        return <div className = 'grade' > 
            {this.state.pixels.map((row,indexRow)=>{
                return <div className = 'row' key = {index}>
                    {row.map((pixel, indexColumn)=>{
                        index += 1
                    return <Pixel val = {pixel}
                                key = {index}
                                onClick = {() =>{
                                    this.movePixelDown(indexRow,indexColumn)}}
                            ></Pixel>})}
            </div> 

        })}
        <br/>
            <div>
            <button onClick = {()=> {this.changeDirection('left')}}>LEFT_</button>
            <button onClick = {()=> {this.changeDirection('right')}}>RIGHT</button>
            <button onClick = {()=> {this.changeDirection('up')}}>_UP__</button>
            <button onClick = {()=> {this.changeDirection('down')}}>DOWN_</button>
            </div>
        </div>
    }
}

export default Grade;