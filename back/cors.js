var whitelist = require("./whitelist.json");

module.exports = {
    accept: function(request, response, next) {
	const origin = request.headers.origin;
	const listed = Object.values(whitelist).includes(origin);
	if (listed) {
	    response.header("Access-Control-Allow-Origin",
			    origin);
	    response.header("Access-Control-Allow-Headers",
			    "Origin, X-Requested-With, Content-Type, Accept");
	    response.header("Access-Control-Allow-Credentials",
			    true);
	}
	next();
    },
    send: function(request, response) {
	response.send();
    }
};
