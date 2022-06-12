import React, {useState, useEffect} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


function PaymentScreen() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const navigate = useNavigate()
    if(!shippingAddress){
        navigate("/shipping")
    }
    const dispatch = useDispatch()
    const submitHandler =  e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                    type="radio"
                    label="PayPal or Credit Card"
                    id="paypal"
                    name="paymentMethod"
                    checked
                    onChange={e => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>
            <Button variant='primary' type="submit">
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen