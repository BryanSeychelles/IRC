const deps = require("./deps.js");
const cors = require("./cors.js");
const user = require("./user.js");
const send = require("./send.js");

deps.irc.get("/", (request, response) => {
    if (request.session.username)
	response.sendFile(__dirname + "/html/chat.html");
    else
    	response.sendFile(__dirname + "/html/username.html");
});

deps.irc.route("/user")
    .options([cors.accept, cors.send])
    .post([cors.accept, user.name]);

deps.irc.route("/send")
    .options([cors.accept, cors.send])
    .post([cors.accept, send.mesg]);

deps.startServer(1337);
