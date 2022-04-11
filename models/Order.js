const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

	userId: {
		type: String,
		required: [true, "User ID is required."]
	},
	totalAmount: {
		type: Number,
		required: [true, "Total amount is required."]
	},
	purchasedOn : {
		type: Date,
		default: new Date()
	},
	products: [
		{
			productId: {
				type: String,
				required: [true, "Product ID is required."]
			},
			quantity: {
				type: Number,
				required: [true, "Quanntity is requred."]
			}
		}
	]

})

module.exports = mongoose.model("Order", orderSchema);