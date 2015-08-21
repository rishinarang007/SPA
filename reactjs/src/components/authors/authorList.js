var React = require("react");

var Router = require("react-router");

var AuthorActions = require("../../actions/AuthorActions")

var Link = Router.Link;

var AuthorList = React.createClass({   
    
    propTypes:{
        
        authors: React.PropTypes.array.isRequired
    
    },
    
    deleteAuthor:function(id, event){
        
        event.preventDefault();
        
        AuthorActions.deleteAuthor(id);
    
    },
    
    
    
    render: function(){
        
       var  createAuthorRow = function(author, index){
            
            return(
                
                <tr key={author.id}>
                    <td><a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete Author</a></td>
                    <td><Link to="manageAuthor" params={{ id: author.id }}>{author.id}</Link></td>
                    <td>{author.firstName} {author.lastName}</td>
                </tr>
            )
        
        }
    
        return(
            
            <div>
                <table className="table">
                    <thead>
                        <th></th>   
                        <th>ID</th>
                        <th>Name</th>                        
                    </thead>
                    <tbody>
                        {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }

})   

    
module.exports = AuthorList;