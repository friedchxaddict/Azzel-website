const User = require("../models/User");

const Product = require("../models/Product");

const bcrypt = require("bcrypt");

const auth = require("../auth");

module.exports.registerUser = (req,res) => {

	console.log(req.body);

	const hashedPW = bcrypt.hashSync(req.body.password,10);

	let newUser = new User ({

		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		mobileNo: req.body.mobileNo,
		password: hashedPW
	});

	newUser.save()
	.then(user => res.send(user))
	.catch(err => res.send(err));
}

module.exports.loginUser = (req,res) => {

	console.log(req.body);

	User.findOne({email: req.body.email})
	.then(foundUser => {

		if(foundUser === null){
			return res.send("No User Found.")
		}else{
			const isPasswordCorrect = bcrypt.compareSync(req.body.password,foundUser.password);
			console.log(isPasswordCorrect);

			if(isPasswordCorrect){
				return res.send({accessToken: auth.createAccesToken(foundUser)})
			}else {
				return res.send("Incorrect Password.")
			}

		}
	})

	.catch(err => res.send(err));
}


module.exports.updateAdmin = (req,res) => {

	console.log (req.params.id)

	let updates = {

		isAdmin:true 
	}

	User.findByIdAndUpdate(req.params.id,updates,{new:true})
	.then(results => res.send(results))
	.catch(err => res.send(err));
}

module.exports.getUserDetails = (req,res) => {

	console.log (req.user);

	User.findById(req.user.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));


}























