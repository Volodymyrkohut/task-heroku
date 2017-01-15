var Writer = require("../model/db/schema_chat.js"),
    session = require("express-session"),
    User = require("../model/db/UserSchema.js").Person;
    // renderError = require("./renderError.js");


function Chat(app,io){

	app.get("/chat",function (req,res,next){
		if(!req.session.user){	
			res.render("login.ejs",{title:"login"
										,some:"Для того щоб користуватися чатомм вам необхідно ввійти в систему"})
		}
		else{
			io.sockets.on("connection",function(client){
			 User.findById(req.session.user,function (error,result){
			 	if(error) next(error)
				Writer.find({location: result.country},function (err,row){
					if(err) next(err)
					io.sockets.emit("mess",{send: row})
				})
			 }) 
			 
			client.emit('disconnect')

			client.removeAllListeners()

			client.on("se",function (data){
					User.findById(req.session.user,function (error,item){
						if(error){
							next(error)
						}else{
							var W = new Writer({
								msg      :  data.message,
								login    :  item.login,
								location :  item.country
							})

							W.save(function(error,Us){
								if(error) next(error)
								io.sockets.emit("sen",Us);
							})
						}
					})
			})
		})
		res.render("chat.ejs",{title:"VipChat",});
		}
	})
}

module.exports = Chat;

