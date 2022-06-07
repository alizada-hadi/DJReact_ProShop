import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getOrderDetails, payOrder } from '../actions/orderAction'


function OrderScreen() {

    const {id} = useParams()
    const orderId = id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails
    if(!loading && !error){
        order.itemPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if(!order || order._id !== parseInt(orderId)){
            dispatch((getOrderDetails(orderId)))
        }
    },[dispatch, order, orderId])

    const paymentHandler = () => {
        dispatch(payOrder(orderId))
    }

  return loading ? (
      <Loader />
  ):
  error ? (
      <Message message={error} variant="danger" />
  ):
  (
    <div>
       <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name : </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email : </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Shipping:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}
                            {'   '}
                            {order.shippingAddress.postalCode}
                            {'   '}
                            {order.shippingAddress.country}
                        </p>

                        {
                            order.isDelivered ? (<Message message={order.deliveredAt} variant="success" />)
                            :
                            (
                                <Message variant="warning" message="Not Derlivered" />
                            )
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}
                        </p>

                        {
                            order.isPaid ? (<Message message={order.paidAt} variant="success" />)
                            :
                            (
                                <Message variant="warning" message="Not paid" />
                            )
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>

                        {order.orderItems.length === 0 ? <Message message="order is empty" variant='info' />
                        :
                        (
                            <ListGroup variant='flush'>
                                {
                                    order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded /> 
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )    
                    }
                        
                        
                    </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items : </Col>
                                <Col>${order.itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping : </Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax : </Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total : </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {
                            !order.isPaid && (
                                <ListGroup.Item>
                                    <Button
                                    onClick={paymentHandler}
                                    type="button" 
                                    className='btn-block' 
                                    variant='primary'>
                                        Pay
                                    </Button>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen