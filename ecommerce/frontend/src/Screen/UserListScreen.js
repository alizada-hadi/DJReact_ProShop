import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUsersList, deleteUser } from '../actions/userActions'

function UserListScreen() {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=> state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(()=> {
        if(userInfo && userInfo.isAdmin){
            dispatch(getUsersList())
        }else{
            navigate("/login")
        }
    }, [dispatch, successDelete])

    const deleteUserHandler = id => {
        if(window.confirm("Are you sure you want to delete this user? "))
        {
            dispatch(deleteUser(id))
        }
    }
  return (
    <div>
        <h1>Users</h1>
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
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{color : "green"}}></i>) : (<i  className='fas fa-check' style={{color : "red"}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(user.id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }
    </div>
  )
}

export default UserListScreen