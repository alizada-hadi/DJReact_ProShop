import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { detailProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen({history}) {
    const [qty, setQty] = useState(1)
    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const {product, loading, error} = productDetail
    useEffect(() => {
        dispatch(detailProduct(id))
    }, [dispatch])


    const addToCartHandler = () => {
        navigate(
            `/cart/${id}?qty=${qty}`, 
            {state : qty}
        )
    }

  return (
    <div>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>

        {
            loading ? <Loader />
            : error ? <Message message={error} variant="danger" />
            : 
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color={`#f8e825`}
                            />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description : ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price : </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status : </Col>
                                    <Col>
                                        <>
                                            {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                                        </>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            
                            {
                                product.countInStock > 0 ?
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col xs="auto" className='my-1'>
                                            <Form.Control
                                            as="select"
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                :
                                ""
                            }

                            <ListGroup.Item>
                                {product.countInStock > 0 ? 
                                
                                <Button
                                onClick={addToCartHandler}
                                className='btn btn-block' type='button'>Add to cart</Button>
                                    :
                                    <Button className='btn btn-block' type='button' disabled>Add to cart</Button>
                            
                            }
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        }
    </div>
  )
}

export default ProductScreen