import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './components/CheckoutForm.jsx'

import 'bootswatch/dist/lux/bootstrap.min.css'
import './App.css'

export default function App() {
 const stripePromise = loadStripe("pk_test_51KCRPKD9FJqNgYcPULPpmsyimojEfeKiNujtqa1yQJOAW9T5dR3Ql1E9ReKTfJsvwk7He8ga36uUEIcdQWWM6pJ600ketKy6yE")

 return (
   <Elements stripe={stripePromise} >
     <div className="container p-4">
       <div className="row">
        <div className="col-md-4 offset-">
         <CheckoutForm />
        </div>
       </div>
     </div>
   </Elements>
  )
}