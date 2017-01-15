var mongoose = require("mongoose");

var SchemaDate = new mongoose.Schema({
	login:String,
	msg:String,
	location:String,
	date:{
		type:Date,
		default: Date.now()
	}

})

var Writer = mongoose.model("Writer",SchemaDate);




module.exports = Writer;