const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
require('dotenv').config()

const app = express()
// Tu llave secreta que te brinda stripe
const stripe = new Stripe(process.env.SK_KEY)

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async (req,res) => {
	try {
		// puedes obtener muchos mas datos de aca y decidir que hacer con ellos tantos en el front como en el back, en este caso solo requiero de dos
		const { id,amount } = req.body

		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Gaming Keyboard",
			payment_method: id,
			confirm: true, // confirmas el metodo de pago y el pago
		})

		console.log(payment)

		res.send({ message: 'Succesfull payment' })
		} catch(error) {
			console.log(error)
			res.json({message: error.raw.message})
		}
})

app.listen(3001,() => {
	console.log('Server on port', 3001)
})