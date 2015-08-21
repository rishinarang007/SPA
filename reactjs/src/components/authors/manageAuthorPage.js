var React = require("react");

var AuthorForm = require("./AuthorForm");

var AuthorActions = require("../../actions/authorActions");

var AuthorStore = require("../../stores/authorStore");

var Router = require("react-router");

var ManageAuthorPage = React.createClass({
        
    /*
    
    getDefaultProps:function(){
            
        
    },
    
    componentDidMount: function(){
        
        console.log("componentDidMount");    
        
    }  
    */
    
    mixins:[
        
        Router.Navigation
    
    ],   
    
    statics:{
            
        willTransitionFrom:function(transition, component){
            
            if(component.state.dirty && !confirm("Leave without Saving")){
                
                transition.abort();
            
            }        
        }
    
    },   
    
    getInitialState: function(){
        
       return{
            
           author: { id:'', firstName:"", lastName:""},
           errors:{},
           dirty: false
       }
        
    },
    
    componentWillMount:function(){
    
        var authorID = this.props.params.id;
        
       if(authorID){
        
           var author =  AuthorStore.getAuthorById(authorID);
            this.setState({author: author});
       } 
        
    
    },
    
     authorFormIsValid: function(){
        
        var formValid = true;
        this.state.errors = {} //clear any previous error
        
        if(this.state.author.firstName.length < 3){
            
            this.state.errors.firstName = 'First Name must be at least 3 characters long';
            formValid = false
        }
        
        if(this.state.author.lastName.length < 3){
            
            this.state.errors.lastName = 'Last Name must be at least 3 characters long';
            formValid = false
        }
        
        this.setState({errors: this.state.errors});
        
        return formValid
        
    },
    
    
    setAuthorState:function(event){
        
        this.setState({dirty:true});
        
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field]  = value;
        
        this.setState({author : this.state.author});
    
    },
    
    saveForm:function(event){
        
        event.preventDefault();
        
        if(!this.authorFormIsValid()){
            
            return;
        }
        
        if(this.state.author.id){
            
            AuthorActions.updateAuthor(this.state.author);
            
        }else{
            
            AuthorActions.createAuthor(this.state.author);
        }
        
        this.setState({dirty:false});
        
        this.transitionTo("authors");
    
    },
    
    
    render: function(){
    
        return(
            
            <AuthorForm
                author = {this.state.author}
                onChange = {this.setAuthorState}
                saveForm = {this.saveForm}
                errors = {this.state.errors}
            />
            
           
        );
    }

})
    

    
module.exports = ManageAuthorPage;