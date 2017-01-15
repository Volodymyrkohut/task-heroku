var express = require("express");
var bodyParser = require("body-parser");
var db = require("./model/auth.js");
var cookieParser = require("cookie-parser")
var session = require("express-session");
var methodOverride = require('method-override')
var ejs = require("ejs");
var ejsLocals = require("ejs-locals");
var path = require("path");

db.setUpConnection();

const app = express();
app.set('port', (process.env.PORT || 5000));
	app.use(session({
	secret: "mySekretWord",
	resave:false,
	saveUninitializad: true,
	key: "NODESESSID",
	cookie: {
			path: "/",
			maxAge: null,
			httpOnly:true
	}
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser())
app.use(methodOverride())

app.set("views",__dirname + "/views");
app.set("view engine","ejs");
app.engine("ejs",ejsLocals);


app.get("/",function (req,res){
		if(req.session.user){
			res.render("main",{
								title:"Головна",
								bar:'<li><a href="/logout">Вийти</a></li>',
								menu:'<li><a href="/profile">Profile</a></li><li><a href="/chat">Chat</a></li>'})
		}else{
			res.render("main",{
								title:"Головна",
								bar:'<li><a href="/login">Ввійти</a></li><li><a href="/register">Реєстрація</a></li>',
								menu:""})
		}	
})

var socket = require("socket.io")
	
var io = socket.listen(app.listen(app.get('port'),()=>{
 	console.log("Server work!!! port "+ app.get('port'))
}))





require("./controllers/auth.js")(app);
require("./controllers/chat.js")(app,io);
require("./controllers/error.js")(app);
