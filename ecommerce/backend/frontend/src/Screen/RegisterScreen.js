import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const userRegister = useSelector(state => state.userRegister)
    const {userInfo, error, loading} = userRegister
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo){
            navigate("/")
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage("Password do not match ")
        }else{
            dispatch(register(name, email, password))
            navigate("/")
        }
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
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
            required
            type='password'
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            required
            type='password'
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className='mt-2' variant="primary">Sign Up</Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Already a member? <Link to={"/login"}>Login</Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen