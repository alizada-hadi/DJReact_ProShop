import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
      if(userInfo){
        navigate("/")
      }
    }, [userInfo])
    
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }

    return (
    <div>
      <FormContainer>
        <h1>Sign In</h1>

        {
          error && <Message message ={error} variant="danger" />
        }
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
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

          <Button type="submit" className='mt-2' variant="primary">Sign In</Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer? <Link to={"/register"}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  )
}

export default LoginScreen