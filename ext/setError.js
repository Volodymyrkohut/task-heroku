function setError(status,message){
	message = message || "Somthing wrong"
	var error = new Error(message)
	error.status = status || 404;
	return error;
}

module.exports.setError = setError;