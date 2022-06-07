import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userDetail, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {USER_UPDATE_RESET} from '../constants/userConstants'
import { ordersMine } from '../actions/orderAction'

function ProfileScreen() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails) 
    const userLogin = useSelector(state => state.userLogin)
    const userUpdate = useSelector(state => state.userUpdate)
    const myOrderList = useSelector(state => state.myOrderList)

    const {error:orderError, loading:orderLoading, orders} = myOrderList
    const {user, loading, error} = userDetails
    const {userInfo} = userLogin
    const {success} = userUpdate

    const navigate = useNavigate()


    useEffect(() => {
        if(!userInfo){
            navigate("/login")
        }else{
            if(!user || !user.name){
              dispatch({type : USER_UPDATE_RESET})
                dispatch(userDetail('profile'))
                dispatch(ordersMine())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, dispatch, user])

    const submitHandler = e => {
        e.preventDefault()
        if(password !=confirmPassword){
          setMessage("passwords do not match ")
        }
        else{
          dispatch(updateUserProfile({
            "id" : user._id, 
            "name" : name, 
            "email" : email, 
            "password" : password
          }))
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message message={message} variant="danger" />}
        {error && <Message message={error} variant="danger" />}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
            required
            type='email'
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type='password'
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className='mt-2' variant="primary">Update</Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My orders</h2>

            {orderLoading ? (
              <Loader />
            ): orderError ? (
              <Message variant="danger" message={error} />
            ) : 
              (
                <Table striped responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map(order => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createAt.substring(0,10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                            <i className='fas fa-times' style={{color:"red"}}></i>
                          )}</td>
                          <td>{order.isDelivered ? order.derliveredAt : "Not Paid"}</td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button className='btn-sm'>Details</Button>
                            </LinkContainer>
                          </td>
                          
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              )
            }
        </Col>
    </Row>
  )
}

export default ProfileScreen