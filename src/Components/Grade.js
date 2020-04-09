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
            
            body : [{
                row : 4,
                column : 4
            },{
                row : 4,
                column : 5}],
            movesHistory : ['left','left']
        }

    }

    game(){

        const body = this.state.body.slice()
        let moves = this.state.movesHistory.slice()
        for(let i = 0;i < body.length; i++){    
            let square = body[i]
            console.log(moves)
            const direction = moves[i]
            // if(i === 0){
            //     moves.push(direction)
            // }            
            this.controlDirection(direction,square);
            

        }
        moves = this.state.movesHistory.slice()
        moves = this.transform_moves()
        this.setState({movesHistory: moves})
        console.log(moves)
        setTimeout(() => {
            this.game()
        }, 1000);

    }

    transform_moves(){
        let moves = this.state.movesHistory.slice()

        for (let i = 0; i < moves.length - 1 ; i ++){
            moves[i + 1] = moves[i]
             
        }
        return moves
    }

    controlDirection(direction,square){

        console.log('control direction')
        let row = square.row
        let column =  square.column


        switch(direction){
            case ('up'):
                this.movePixelUp(row - 1,column,square)
                square.row = row -1
                square.column = column
                break
            case ('down'):
                this.movePixelDown(row + 1,column,square)
                square.row = row +1
                square.column = column
                break
            case ('left'):
                this.movePixelLeft(row,column - 1,square)
                square.row = row
                square.column = column - 1
                break
            case ('right'):
                this.movePixelRight(row,column + 1,square)
                square.row = row
                square.column = column + 1
                break
            default:
                break
        }
        


    }

    changeDirection(direction){

        
        
        let moves = this.state.movesHistory.slice()
        moves[0] = direction

        this.setState({
            movesHistory: moves
            
        })
    }

    movePixelLeft(row,column){
        const pixels= this.state.pixels.slice()

        if(column > 0 ){   
            pixels[row][column] = 'X'
            pixels[row][column + 1] = '.'
            this.setState({
                pixels : pixels
            })        
        }
        
    }

    movePixelRight(row,column){
        const pixels= this.state.pixels.slice()

        if(column < 9){
            pixels[row][column] = 'X'
            pixels[row][column -1] = '.'
            this.setState({
                pixels : pixels
            })
            
        }
        
    }

    movePixelUp(row,column){
        const pixels= this.state.pixels.slice()

        if(row > 0){
            pixels[row][column] = 'X'
            pixels[row + 1][column] = '.'
            this.setState({
                pixels : pixels
            })
        }
        
 
        
    }

    movePixelDown(row,column){
        const pixels= this.state.pixels.slice()
        
        if(row < 9){
            pixels[row][column] = 'X'
            pixels[row - 1][column] = '.'
            this.setState({
                pixels : pixels
            })        
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
                                // onClick = {() =>{
                                //     this.movePixelDown(indexRow,indexColumn)}}
                            ></Pixel>})}
            </div> 

        })}
        <button onClick = {()=> this.game()}>START</button>
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