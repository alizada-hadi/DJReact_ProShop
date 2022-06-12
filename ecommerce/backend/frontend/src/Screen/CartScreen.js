import React, {useEffect} from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const productId = id
    
    const qty = location.state ? Number(location.state) : 1

    const cart = useSelector(state => state.cart)

    const {cartItems} = cart

    const removeFromCartButton = id => {
      dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
      navigate("/shipping")
    }

    const dispatch = useDispatch()
    useEffect(() => {
      if(productId){
        dispatch(addToCart(productId, qty))
      }
    }, [dispatch,productId, qty])
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ? (
            <Message message="Your cart is empty" variant="info" />
          ):
          <ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                        {
                            [...Array(item.countInStock).keys()].map((x) => (
                                <option key={x+1} value={x+1}>
                                    {x+1}
                                </option>
                            ))
                        }

                  </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartButton(item.product)}
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h2>

              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
              type="button"
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen