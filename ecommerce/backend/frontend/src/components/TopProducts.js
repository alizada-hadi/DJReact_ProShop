import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

import { productsTop } from '../actions/productActions'

function TopProducts() {
    const dispatch = useDispatch()

    const topProducts = useSelector(state=> state.topProducts)
    const {error, loading, products} = topProducts
    useEffect(() => {
        dispatch(productsTop())
    }, [dispatch])
  return ( loading ? <Loader /> 
    : error ? <Message message={error} variant="danger" /> 

    :

    (
        <Carousel pause='hover' className='bg-dark'>
            {
                products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{product.name} (${product.price})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )

  )
}

export default TopProducts