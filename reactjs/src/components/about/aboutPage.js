var React = require("react");

var About = React.createClass({
    
    statics:{
    
       /* willTransitionTo: function(transition, params, query, callback){
        
            if(!confirm('Are you sure you read a page')){
                
                console.log(transition);
                
                transition.abort();
                
            }else{
                console.log(params)
                console.log(query)
                
                callback();
            }
        },
        
        willTransitionFrom: function(transition, component){
            if(!confirm('Are you sure you want to leave a page')){
                
                console.log(transition);
                
                transition.abort();
                
            }
        }*/
    
    },
    
    render: function(){
    
        return(
                
            <div>
				<h1>About</h1>
				<p>
					This application uses the following technologies:
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Node</li>
						<li>Gulp</li>
						<li>Browserify</li>
						<li>Bootstrap</li>
					</ul>
				</p>
			</div>
        )
    }

})
    

    
module.exports = About;