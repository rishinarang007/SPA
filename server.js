var connect = require("connect");

connect.createServer(
		connect.static("../SPA")
).listen(3000);