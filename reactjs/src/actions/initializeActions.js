var Dispatcher = require("../dispatcher/appDispatcher");
var AuthorAPI = require("../api/authorApi");
var ActionTypes = require("../constants/actionTypes");

var InitializeActions = {
        
    initApp : function(){
        
        Dispatcher.dispatch({
            
            actionType: ActionTypes.INITIALIZE,
            
            initData: {
    
                authorList: AuthorAPI.getAllAuthors()
            }
            

        });
    }
};


module.exports = InitializeActions;