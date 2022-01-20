import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios'
import {useState} from 'react'
export default function CheckoutForm() {

  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })
    setLoading(true)

    if(!error) {
      const { id } = paymentMethod

      try {
        const {data} = await axios.post('http://localhost:3001/api/checkout', {
        id,
        amount: 10000
        })

        console.log(data)

        elements.getElement(CardElement).clear();
      } catch(error) {
        console.log(error)
      }

      setLoading(false)
    }
  }

  return (
  <form onSubmit={handleSubmit} className="card card-body">
   <img src="https://www.corsair.com/medias/sys_master/images/images/h80/hdd/9029904465950/-CH-9109011-ES-Gallery-K70-RGB-MK2-01.png" alt="Corsair" className="img-fluid"/>

   <h3 className="text-center my-2">Price: 100$</h3>

   <div className="form-group">
    <CardElement className="form-control" />
   </div>

   <button className="btn btn-success" disabled={!stripe}>
    {loading ? (
        <div className="spinner-border text-light" role="status">
         <span className="sr-only"></span>
        </div>
      ) : "Comprar"}
   </button>
  </form>
  )
}