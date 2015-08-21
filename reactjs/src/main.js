var React = require("react");
var Router = require("react-router");
var routes = require("./routes");
var InitializeActions = require("./actions/initializeActions");

//Router.HistotyLocation;

InitializeActions.initApp();

Router.run(routes, function(Handler){
        
    React.render(<Handler/>, document.getElementById("app"));
});