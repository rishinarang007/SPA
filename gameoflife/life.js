function $(selector, container){
    
    return (container || document).querySelector(selector);
}

(function(){
    
    var _ = self.Life = function(seed){
        
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;
        
        this.prevBoard = [];
        this.board = cloneArray(seed);
        
    };
    
    _.prototype = {
            
        next: function(){
            
            this.prevBoard = cloneArray(this.board);
            
            for(var y=0; y<this.height; y++){
                
                for(var x=0; x<this.width; x++){
                        
                    var neighbours = this.aliveNeighbours(this.prevBoard, x ,y);
                    
                    //console.log(y, x , ": " , neighbours);
                    
                    var alive = !!this.board[y][x];
                    
                    if(alive){
                        
                        if(neighbours < 2 || neighbours >3){
                            
                            this.board[y][x] = 0;
                            
                        }
                        
                    }else{
                        
                        if(neighbours == 3){
                            
                            this.board[y][x] = 1;
                            
                        }
                    }
                    
                    
                }
            }
        },
        
        
        aliveNeighbours: function(array, x , y){
                
            var prevRow = array[y-1] || [];
            var nextRow = array[y+1] || [];
            var sum = 0;
            
            // console.log(array[y][x-1]);
            //console.log(prevRow[x-1]);
            
            
            return [
                
                prevRow[x-1], prevRow[x], prevRow[x+1],
                array[y][x-1], array[y][x+1],
                nextRow[x-1], nextRow[x], nextRow[x+1]
                
            ].reduce(function(prev, cur){
                
                //console.log("count" , prev + +!!cur);
                
                return prev + +!!cur; //boolean then a number
                
                
            }, 0);     
            
        },
        
        toString: function(){
            
            return this.board.map(function(row){return row.join(' '); }).join('\n');
        }
    }
    
    function cloneArray(array){
        
        return array.slice().map(function(row){return row.slice();});
    }
    
    

})();

/*var game = new Life([
    
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
    
    [0.1,0.2,0.3,0.4,0.5],
    [1.1,1.2,1.3,1.4,1.5],
    [2.1,2.2,2.3,2.4,2.5],
    [3.1,3.2,3.3,3.4,3.5],
    [4.1,4.2,4.3,4.4,4.5]
    
]);

console.log(game.toString());

console.log(game.next());

console.log(game.toString());

console.log(game.next());*/

(function(){

    var _ = self.LifeView = function(table, size){
        
        this.grid = table;
        this.size = size;
        this.started = false;        
        this.createGrid();
        this.autoplay = false;
    
    }
    
    _.prototype = {
            
        createGrid: function(){
                
            var fragment = document.createDocumentFragment();
            var me = this;
            this.checkboxes = [];
            //this.grid.innerHTML = "";            
            
            for(var y=0; y<this.size; y++){
                
                var row = document.createElement("tr");
                
                 this.checkboxes[y] = [];
                
                for(var x=0; x<this.size; x++){
                    
                    var cell = document.createElement("td")
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox"
                   
                    
                    this.checkboxes[y][x] = checkbox;
                    
                    checkbox.coords = [y,x]
                    
                    cell.appendChild(checkbox);
                    
                    row.appendChild(cell);
                    
                }
                
                fragment.appendChild(row);
            }
            
            this.grid.addEventListener("change", function(event){
                    
                if(event.target.nodeName.toLowerCase() == "input"){
                        
                    me.started = false
                }
            })
            
            this.grid.addEventListener("keyup", function(event){
                
                var checkbox = event.target;
                
                if(checkbox.nodeName.toLowerCase() == "input"){
                    
                    var coords = checkbox.coords
                    var y = coords[0];
                    var x = coords[1];
                    
                    switch(event.keyCode){
                        
                        case 37:
                            if(x>0){
                                me.checkboxes[y][x-1].focus();
                            }
                            break;
                        case 38:
                            if(y>0){
                                me.checkboxes[y-1][x].focus();
                            }
                            break;
                        case 39:
                            if(x< me.size-1){
                                me.checkboxes[y][x+1].focus();
                            }
                            break;
                        case 40:
                            if(y< me.size-1){
                                me.checkboxes[y+1][x].focus();
                            }
                            break;
                    }
                    
                }
                    
            })
            
            
            this.grid.appendChild(fragment);
            
            
        },
        
        get boardArray(){
            
            return this.checkboxes.map(function(row){
                    
                return row.map(function(checkbox){
                
                    return +checkbox.checked;
                })
            });
            
        },
        
        play: function(){
            
            this.game = new Life(this.boardArray);
            this.started = true;
        },
        
        next: function(){
            
            var me = this;
            
            if(!this.started || this.game){
                
                this.play();
            }          
            
            this.game.next();
            
            var board = this.game.board;
            
            for(var y=0; y<this.size; y++){
                
                for(var x=0; x<this.size;x++){
                    
                    this.checkboxes[y][x].checked = !!board[y][x];
                }
            }
            
            if(this.autoplay){
                
               this.timer = setTimeout(function(){
                    me              .next()
                },1000)
            }
            
            
        }
    }

})();

var lifeView = new LifeView(document.getElementById("grid"), 12);

$("button.next").addEventListener("click", function(){
        
    lifeView.next();
    
}, false)

$("#autoplay").addEventListener("change", function(){
        
    $("button.next").textContent = this.checked? "Start" : "Next";
    
    lifeView.autoplay = this.checked;
    
    if(!this.checked){
        
        clearTimeout(lifeView.timer);
    }
    
    
}, false)