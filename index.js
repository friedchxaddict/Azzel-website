const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000

mongoose.connect("mongodb+srv://adrian:adrian@cluster0.1nbs0.mongodb.net/Azzel-website?retryWrites=true&w=majority",
	{
		useNewUrlParser:true,
		useUnifiedTopology:true
	});



let db = mongoose.connection;
db.on('error',console.error.bind(console, "Connection Error."));
db.once('open',()=>console.log("Connected to MongoDB"))

app.use(cors());
app.use(express.json());

app.get('/', function(request, response) {
 response.send('Hello World!');
 });

const userRoutes = require('./routes/userRoutes');
app.use('/users',userRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/products',productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/orders',orderRoutes);




app.listen(port,()=>console.log('Server is running at localhost:4000'));