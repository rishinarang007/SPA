var React = require("react");

var authorAPI = require("../../api/authorApi");

var AuthorList = require("./authorList");

var Router = require("react-router");

var AuthorStore = require("../../stores/authorStore");

var Link = Router.Link;

var AuthorPage = React.createClass({
        
    getDefaultProps:function(){
            
        return {
            
            authors: []
        };
    },
    
    
    getInitialState: function(){
        
        return {
            
            authors: AuthorStore.getAllAuthors()//this.props.authors
        };
        
    },
    
    componentWillMount: function(){
        
        AuthorStore.addChangeListener(this._onChange);
    
    },
    
    componentWillUnmount: function(){
        
        AuthorStore.removeChangeListener(this._onChange);
    
    },
    
    _onChange:function(){
        
        this.setState({ authors: AuthorStore.getAllAuthors() });
    
    },
    
   /* componentDidMount: function(){
        
        console.log("componentDidMount");
        
        if(this.isMounted()){
            
            this.setState({ authors : authorAPI.getAllAuthors() });
        }
        
        
    
    },  
    */
    render: function(){
    
        return(
            
            <div>
            
            <h1>Authors</h1>
            <Link to="addAuthor" className="btn btn-default" >Add Author</Link>
            <AuthorList authors={this.state.authors} />
               
            </div>
        );
    }

})
    

    
module.exports = AuthorPage;