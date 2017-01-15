var mongoose = require("mongoose");
var Person = require("./db/UserSchema.js").Person;

exports.setUpConnection = function (){
	mongoose.connect("mongodb://root:root@ds157298.mlab.com:57298/onecoin");
}
//mongodb://root:root@ds157298.mlab.com:57298/onecoin
exports.showAllUsers = function (){
	return Person.find();
}


exports.register = function (data){
		const { login,password,mail,country } = data
		var userList = new Person({
			login        :  login,
			password     :  password,
		    mail   		 :  mail,
			country      :  country
		})
		return userList.save()
}

exports.login = function (body){
	    return Person.findOne({login: body.login})
}

exports.ifUserHaveCookie =  function (id){
		return Person.findById(id)
}



// //for PUT ! Якщо person.update то міняє все окрім password! 
exports.changeProfile = function(id,user){
	const {login,password,mail,country} = user;
	return Person.findById({_id:id},function (err,data){
		data.password = user.password
		data.login	  = user.login
		data.country  = user.country
		data.mail     = user.mail
		data.save()
	}) 
		
}





/*
exports.changeProfile = function(id,user){
	console.log("USEREEE :" ,user)
	const {login,password,mail,country} = user;
	return Person.update({_id:id}, {$set: user},{upset:true})
}
*/ 