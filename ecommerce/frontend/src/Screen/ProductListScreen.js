import React, {useState, useEffect, Fragment} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Table, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProducts, product_delete, createNewProduct } from '../actions/productActions'



function ProductListScreen() {
    // defining modal properties
    const [showModal, setShowModal] = useState(false)
    // define product fields
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")

    // 
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const productDelete = useSelector(state => state.productDelete)
    const productCreate = useSelector(state => state.productCreate)
    const {loading, error, products} = productList
    const {loading:deleteProduct, error:productError, success:productSuccess} = productDelete
    const {loading:createProductLoading, error:createProductError, product:newProduct } = productCreate
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(()=> {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            navigate("/login")
        }
    }, [dispatch, navigate, userInfo, productSuccess, newProduct])

    const deleteUserHandler = id => {
        if(window.confirm("Are you sure you want to delete this product? ")){
            dispatch(product_delete(id))
        }
    }

    const createProductHandler = () => {
        setShowModal(true)
    }
    const handleClose = () => setShowModal(false)

    const submitHandler = e => {
        e.preventDefault()
        dispatch(createNewProduct(name, brand, category, price, description))
        setShowModal(false)
        setName('')
        setBrand('')
        setCategory('')
        setPrice(0)
        setDescription('')
    }
  return (
    <Fragment>
        {/* modal start */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Product</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                required
                                type='text'
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control
                                required
                                type='text'
                                placeholder="Enter product brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Product Category</Form.Label>
                                <Form.Control
                                required
                                type='text'
                                placeholder="Enter product category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                required
                                type='number'
                                placeholder="Enter product price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Product description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type="submit" className='mt-2' variant="primary">Create</Button>
                        </Form>
                        
                    </Modal.Body>
            </Modal>
        {/* modal end */}
        <Row className=''>
            <Col lg={10}>
                <h1>Product List</h1>
            </Col>
            <Col lg={2} className='text-right'>
                <Button className='my-1' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product 
                </Button>
            </Col>
        </Row>
        {
            loading ? <Loader /> :
            error ? (
                <Message message={error} variant="danger" />
            ):
            (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }
    </Fragment>
  )
}

export default ProductListScreen