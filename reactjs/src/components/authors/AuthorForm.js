var React = require("react");

var Input = require("../common/textInput");

var AuthorForm = React.createClass({
    
    propTypes:{
    
        author:React.PropTypes.object.isRequired,
        saveForm:React.PropTypes.func.isRequired,
        onChange:React.PropTypes.func.isRequired,
        errors:React.PropTypes.object.isRequired,
    
    }
    ,
        
  render: function(){
    
        return(
            <form>
			
            <h1>Manage Author</h1>
			
            <Input
					name="firstName"
					label="First Name"
					value={this.props.author.firstName}
					onChange={this.props.onChange}
                    error={this.props.errors.firstName}
                />

				<Input
					name="lastName"
					label="Last Name"
					value={this.props.author.lastName}
					onChange={this.props.onChange}
                    error={this.props.errors.lastName}
				/>
            
            <br/>
			
            <input type="submit" value="Save" className="btn btn-default"
             onClick={this.props.saveForm}/>
            
			</form>
             
           
        );
    }

});
    

    
module.exports = AuthorForm;