import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { userDetail, adminUpdateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {
    const {id} = useParams()
    const userId = id
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)


    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const updateUser = useSelector(state => state.updateUser)
    const {error, loading, user} = userDetails
    const {error:updateError, loading:updateLoading, success:updateSuccess} = updateUser
    useEffect(()=> {
      if(updateSuccess){
        dispatch({type : USER_UPDATE_RESET})
        navigate("/admin/users")
      }else{
        if(!user.name || user._id !== Number(userId)){
            dispatch(userDetail(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
      }
    }, [userId, user, updateSuccess])
    
    const submitHandler = e => {
      e.preventDefault()
        dispatch(adminUpdateUser({_id:user._id, name, email, isAdmin}))
    }

  return (
    <div>
        <Link to="/admin/users">
            Go Back
        </Link>
        <FormContainer>
        <h1>Edit User</h1>
        

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
    
              <Form.Group controlId="isAdmin">
                <Form.Check
                type='checkbox'
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button onClick={submitHandler} type="submit" className='mt-2' variant="primary">Update</Button>
            </Form>
        )}
    </FormContainer>
    </div>
  )
}

export default UserEditScreen