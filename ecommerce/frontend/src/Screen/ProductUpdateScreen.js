import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, File } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import axios from 'axios'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { updateProduct, detailProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductUpdateScreen() {
    const {id} = useParams()
    const productId = id
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(1)
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)


    const navigate = useNavigate()

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const productUpdate = useSelector(state => state.productUpdate)
    const {error, loading, product} = productDetail
    const {error:updateError, loading:updateLoading, success:updateSuccess} = productUpdate
    useEffect(()=> {
      if(updateSuccess){
        dispatch({type : PRODUCT_UPDATE_RESET})
        navigate("/admin/products")
      }else{
        if(!product.name || product._id !== Number(productId)){
            dispatch(detailProduct(productId))
        }else{
            setName(product.name)
            setBrand(product.brand)
            setCategory(product.category)
            setImage(product.image)
            setQty(product.countInStock)
            setPrice(product.price)
            setDescription(product.description)
            
        }
      }
    }, [productId, product, updateSuccess])
    
    const submitHandler = e => {
      e.preventDefault()
      dispatch(updateProduct({_id : product._id, "name" : name, "brand" : brand, "category" : category, "price" : price, "countInStock" : qty, "description" : description}))
        
    }

    const uploadImageHandler = async e => {
        const file = e.target.files[0]
        const formData = new FormData()


        formData.append("image", file)
        formData.append("product_id", productId)

        setUploading(true)

        try{
            const config = {
                headers : {
                    'Content-type' : 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/product/upload/photo/', formData, config)
            setImage(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }
    }

  return (
    <div>
        <Link to="/admin/products">
            Go Back
        </Link>
        <FormContainer>
        <h1>Edit Product</h1>
        

        {loading ? <Loader /> : error ? <Message message={error} variant="danger" /> : (
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                required
                type='text'
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                required
                type='text'
                placeholder="Enter your brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                required
                type='text'
                placeholder="Enter the category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                type='file'
                onChange={uploadImageHandler}
                >
                </Form.Control>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                required
                type='number'
                placeholder="Enter the price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="qty">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                required
                type='number'
                placeholder="Enter the quantity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
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
              <Button onClick={submitHandler} type="submit" className='mt-2' variant="primary">Update</Button>
            </Form>
        )}
    </FormContainer>
    </div>
  )
}

export default ProductUpdateScreen