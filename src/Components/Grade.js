import React ,{Component} from 'react';
import Pixel from './Pixel';


class Grade extends Component{

    constructor(props){
        super(props)
        let pixels = []
        for (let index = 0; index < 10; index++) {
            let row = []
            for (let j = 0; j < 10; j++) {
                row.push('white')
                
            }
            pixels.push(row)
        }

        this.state = {
            pixels : pixels,
            point : false,
            body : [{
                row : 4,
                column : 4
            }],
            movesHistory : ['left'],
            status: 'playing'
        }

    }

    game(){

        if(this.state.point === true){
            this.addBody()
            this.setState({
                point : false
            })
            this.generateRedPixels()
        }

        const body = this.state.body.slice()
        let moves = this.state.movesHistory.slice()
        
        for(let i = 0;i < body.length; i++){    
            let square = body[i]
            console.log(moves)
            const direction = moves[i]
            this.controlDirection(direction,square);
            
        }
        moves = this.state.movesHistory.slice()
        moves = this.transform_moves()
        this.setState({movesHistory: moves})
        if(this.state.status === 'playing')
            setTimeout(() => {
                this.game()
            }, 400);
        

    }

    transform_moves(){
        let moves = this.state.movesHistory.slice()

        for (let i = moves.length - 1; i > 0 ; i --){
            moves[i] = moves[i - 1]
             
        }
        return moves
    }

    generateRedPixels(){

        let valid = false
        const pixels = this.state.pixels.slice()
        let size = this.state.pixels.length - 1
        while(!valid){

            let row = Math.floor(Math.random() * size) 
            let col = Math.floor(Math.random() * size)
            if(pixels[row][col] !== 'blue'){
                valid = true
                pixels[row][col] = 'red'
            }
        }
    }

    controlDirection(direction,square){

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

    addBody(){
        let body = this.state.body.slice()
        let moves = this.state.movesHistory.slice()
        let tail = body[body.length -1]
        let direction = moves[moves.length -1]
        let row = tail.row
        let col = tail.column
        switch(direction){
            case('up'):
                row = row + 1
                break
            case('down'):
                row = row - 1
                break
            case('left'):
                col = col + 1
                break
            case('right'):
                col = col - 1
                break
            default:
                break

        }
        let newTail= {
            row : row,
            column :  col
        }
        moves.push(moves[moves.length -1])
        body.push(newTail)
        this.setState({
            body : body,
            movesHistory : moves
        })
    }

    verifyColision(row ,col){

        const pixels = this.state.pixels.slice()

        let size = 9//this.props.size 
        if(row > size || col > size
            || row < 0 || col < 0
            || pixels[row][col] === 'blue') 
        {
            this.setState({
                status : 'over'
            })
            return false
        }
        else if(pixels[row][col] === 'red'){
            this.setState({
                point : true
            })
        }
        return true
    }

    changeDirection(direction){

        
        
        let moves = this.state.movesHistory.slice()
        let moveNow = moves[0]
        if((moveNow === 'left' && direction !== 'right') 
            || (moveNow === 'right' && direction !== 'left') 
            || (moveNow === 'up' && direction !== 'down')
            || (moveNow === 'down' && direction !== 'up')){

                moves[0] = direction
                this.setState({
                    movesHistory: moves
                    
                })
        }



    }

    movePixelLeft(row,column){
        const pixels= this.state.pixels.slice()

        if(this.verifyColision(row,column))
            pixels[row][column] = 'blue'
            pixels[row][column + 1] = 'white'
            this.setState({
                pixels : pixels
            })        
        
        
    }

    movePixelRight(row,column){
        const pixels= this.state.pixels.slice()

        if(this.verifyColision(row,column))
        pixels[row][column] = 'blue'
        pixels[row][column -1] = 'white'
        this.setState({
            pixels : pixels
        })
            
        
        
    }

    movePixelUp(row,column){
        const pixels= this.state.pixels.slice()

        if(this.verifyColision(row,column))
            pixels[row][column] = 'blue'
            pixels[row + 1][column] = 'white'
            this.setState({
                pixels : pixels
            })
        
        
 
        
    }

    movePixelDown(row,column){
        const pixels= this.state.pixels.slice()
        
        if(this.verifyColision(row,column))
            pixels[row][column] = 'blue'
            pixels[row - 1][column] = 'white'
            this.setState({
                pixels : pixels
            })               
    }

    render(){
        function keyPressed(evt){
            evt = evt || window.event;
            var key = evt.keyCode || evt.which;
            return String.fromCharCode(key); 
        }
        
        document.onkeypress = (evt) =>{
            var str = keyPressed(evt);
            console.log(str)
            if(str === 'w')
                this.changeDirection('up')    
            else if(str === 'a')
                this.changeDirection('left')
            else if(str === 'd'){
                this.changeDirection('right')
            }else if(str === 's'){
                this.changeDirection('down')
            }
        } 
        let index = 0

        return <div >      
            <div className = 'grade' >
                {this.state.pixels.map((row,indexRow)=>{
                    return <div className = 'row' key = {index}>
                        {row.map((pixel, indexColumn)=>{
                            index += 1
                        return <Pixel val = {pixel}
                                    key = {index}
                                ></Pixel>})}
                </div>})}
            </div>
            <button onClick = {() => { this.game() ;  this.generateRedPixels()}}>START</button>
            <br/>
        </div>
    }
}



export default Grade;