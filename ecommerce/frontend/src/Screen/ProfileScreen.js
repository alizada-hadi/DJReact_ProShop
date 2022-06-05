import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userDetail, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {USER_UPDATE_RESET} from '../constants/userConstants'

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
        </Col>
    </Row>
  )
}

export default ProfileScreen