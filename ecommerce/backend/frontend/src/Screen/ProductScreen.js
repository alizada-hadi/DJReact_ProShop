import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { detailProduct, createReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen({history}) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const productCreateReview = useSelector(state => state.productCreateReview)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const {product, loading, error} = productDetail
    const {success:createReviewSuccess, loading:loadingProductReview, error:errorProductReview} = productCreateReview
    useEffect(() => {
        if(createReviewSuccess){
            setRating(0)
            setComment("")
            dispatch({type : PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(detailProduct(id))
    }, [dispatch, createReviewSuccess])


    const addToCartHandler = () => {
        navigate(
            `/cart/${id}?qty=${qty}`, 
            {state : qty}
        )
    }
    const submitHandler = e => {
        e.preventDefault()
        dispatch(createReview(id, {rating, comment}))
    }
  return (
    <div>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>
        {
            loading ? <Loader />
            : error ? <Message message={error} variant="danger" />
            : 
            <div>
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

            <Row>
                <Col md={6}>
                    <h4 className='mt-4'>Reviews</h4>
                    
                    {loadingProductReview && <Loader />}
                    {createReviewSuccess && <Message message="Review Submitted" variant="success" />}
                    {errorProductReview && <Message message={errorProductReview} variant="danger" />}
                    {product.reviews.length === 0 && <Message message="No reviews" variant="info" />}

                    <ListGroup variant="flush">
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} color="#f8e825" />
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                    <ListGroup.Item>
                        <h4>Write a review</h4>

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                    as="select"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="1">1- Poor</option>
                                        <option value="2">2- Fair</option>
                                        <option value="3">3- Good</option>
                                        <option value="4">4- Very Good</option>
                                        <option value="5">5- Excellent</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                    as='textarea'
                                    row='6'
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    >

                                    </Form.Control>
                                </Form.Group>

                                <Button
                                    disabled={loadingProductReview}
                                    type='submit'
                                >
                                    submit
                                </Button>
                            </Form>
                        ):
                        (
                            <Message message={`Please ${<Link to='/login'>Login</Link>} to write a review`} />
                        )
                        }
                    </ListGroup.Item>
                    </ListGroup>

                </Col>
            </Row>
            </div>
        }
    </div>
  )
}

export default ProductScreen