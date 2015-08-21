"use strict";

var React = require("react");

var Router = require("react-router");

var Link = Router.Link;

var Home = React.createClass({
        
    render: function(){
        
        return (
        
        <div className="jumbotron">
  		    	<h1>Hello world from Bootstrap</h1>
                <Link to="aboutUS" className="btn btn-lg">Learn More</Link>
  	     </div>
            
        
        );
    }
    
});

module.exports = Home;