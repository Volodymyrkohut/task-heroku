module.exports = function (app){
	app.use(function (req, res, next){
		var error = new Error("Not Found");
		error.status = 404;
		next(error) 
	})



	if('development' == process.env.NODE_ENV){
		app.use(function (error,req,res,next){
			res.status(error.status || 500)
			res.render("error.ejs",{
				message  :   error.message,
				error    :   error,
				title    :   "Помилка",
				status   :   error.status
			})

		})
// для продакшина
	}else{
		app.use(function (error,req,res,next){
			res.status(error.status || 500);
			res.render("error.ejs",{
				message  :   error.message,
				title    :   "Помилка ",
				error    :   "",
				status   :   error.status
			})
		})
	}
}

