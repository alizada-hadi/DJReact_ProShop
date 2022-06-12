import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {

  const cart = useSelector(state => state.cart)
  const userInfo = useSelector(state => state.userLogin)
  const {shippingAddress} = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navigate("/payment")
  }
  if(!userInfo){
    navigate("/login")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
            required
            type='text'
            placeholder="Your address please"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
      </Form.Group>
      <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
            required
            type='text'
            placeholder="Your city please"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
      </Form.Group>
      <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            required
            type='text'
            placeholder="Your postal code please"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
      </Form.Group>
      <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
            required
            type='text'
            placeholder="Your country please"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
      </Form.Group>
      <Button type='submit' className='mt-2' variant='primary'>
        Continue
      </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen