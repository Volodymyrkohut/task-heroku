var db = require("../model/auth.js");
var e = require("../ext/setError.js");

module.exports = function (app){
	app.get("/login",function (req,res,next){
		if(req.session.user){
			res.status(302) 
			res.setHeader("Location","/");
			res.send("200")
		}
		res.render("login.ejs",{title:"Ввійти"})
	})

	app.get("/register",function (req,res,next){
		if(req.session.user){
			res.status(302) 
			res.setHeader("Location","/");
			res.send("200")
		}
		res.render("register.ejs",{title:"Зареєструватися"})
	})

	app.get("/logout",function (req,res,next){
		if(req.session){
			req.session.destroy();
			res.status(302) // redirect
			res.setHeader("Location","/");
			res.send("200")
		}else{
			next(e.setError(400,"You can not logout! "))
		}
	
	})

	app.post("/register",(req,res,next) => {
		db.register(req.body).then((data) => {
			if(data === null){ 
				next(e.setError(404,"Not found"))
			}else{
				res.status(302) 
				res.setHeader("Location","/");
				res.send("200")
			}
		}).catch((error)=>{
			next(e.setError(401,"User duplicate login"))
		}) 
	});


	app.post("/login",(req,res,next) => {
		const { login,password } = req.body;
		db.login(req.body).then((data) => {
			if(data === null){ next(e.setError(404,"Not found"))}
			if(data){
				console.log("problem with : ",data)
				if(data.checkPassword(password)){
					req.session.user = data._id 
					res.status(302) 
					res.setHeader("Location","/profile");
					res.send("200")
				}else{
					// res.send("Problem here")
					next(e.setError(401,"Неправильний логін"))
				}
			}else{
				next(e.setError(401,"Unauthorized"))
			}
		}).catch((error)=>{
			next(error)
		}) 
	})


	app.get("/profile",(req,res,next) => {
			if(req.session.user){
				db.ifUserHaveCookie(req.session.user).then((data) => {
					 if(data === null){ next(e.setError(401,"Unauthorized"))}
						res.render("enter",{title:"profile",data: data,bar: '<li><a href="/logout">Вийти</a></li>'})
					}).catch((error)=>{
						next(error)
					}) 
			}else{
				next(e.setError(401,"You don't have session"))
			}
	})
	//put


	app.post("/change",function (req,res,next){
		db.changeProfile(req.session.user,req.body).then((data)=>{
			if(data === null){ next(e.setError(404,"Data not found"))}
			if(data){
					console.log("change!!!! : ",data)
					res.status(302) // redirect
					res.setHeader("Location","/profile");
					res.send("200")
			}else{
				next(e.setError(404,"You can not change you profile! "))
			}
		}).catch((error) => {next(error)}) 
	})


///////////////////////////////////////////////////////////////
}