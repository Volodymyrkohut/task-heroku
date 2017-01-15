import mongoose from "mongoose";
var Person = require("./db/UserSchema.js").Person;



export function setUpConnection(){
	mongoose.connect("mongodb://localhost/user");
}



export function register(data){
		const { login,password,mail,country } = data
		var userList = new Person({
			login        :  login,
			password     :  password,
		    mail   		 :  mail,
			country      :  country
		})
		return userList.save()
}



export function login (body){
	    return Person.findOne({login: body.login})
}




export function ifUserHaveCookie(id){
		return Person.findById(id)
}



// //for PUT
// export function changeProfile(id,user){
// 	return Person.update({_id:id}, {$set:user},{upset:true})
// }





