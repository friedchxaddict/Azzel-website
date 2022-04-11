const Order = require("../models/Order");

const Product = require("../models/Product");

const User = require("../models/User");

module.exports.addOrder = (req,res) => {

	console.log(req.body)

	let newOrder = new Order({

		userId: req.user.id,
		totalAmount: req.body.totalAmount,
		products: req.body.products
	});

	newOrder.products.foreach(products => {

		console.log(products)

		let isProductUpdated = Product.findById(products.productId).then(product => {

			let addOrder = {

				orderId: newOrder.userId,
				quantity: products.quantity
			}

			products.orders.push(addOrder)

			return product.save().then(product => true).catch(err => err.message)
		})

	});

	newOrder.save()
	then(order => res.send(order))
	.catch(err => res.send(err));

};

module.exports.getUserOrders = (req,res) => {

	Order.find({userId: req.user.id})
	.then(result => res.send(result))
	.catch(err => res.send(err));

};


module.exports.getAllOrders = (req,res) => {

	Order.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};






