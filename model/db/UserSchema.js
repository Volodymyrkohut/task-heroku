var mongoose = require("mongoose");
var crypto = require("crypto");

var User = new mongoose.Schema({
	login:{
		type: String,
		require: true,
		unique: true
	},
	mail:String,
	country:String,
	hash:{
		type: String,
		require:true
	},
	salt: {
		type: String,
		require: true
	},
	iteration:{
		type: Number,
		require: true
	},
	created:{
		type:Date,
		default: Date.now()
	}
})

User.virtual("password")
	.set(function (data){
		this.salt = String(Math.random());
		this.iteration = parseInt(Math.random() * 10 +1);
		this.hash = this.getHash(data);
	})
	.get(function (){
		return this.hash;
	})

User.methods.getHash = function (password){
	var c = crypto.createHmac('sha1',this.salt);
	for(var i = 0; i< this.iteration; i++){
		c = c.update(password);
	}
	   return c.digest('hex');
}


User.methods.checkPassword = function (data){
	return this.getHash(data) === this.hash
}



exports.Person = mongoose.model("User",User);


