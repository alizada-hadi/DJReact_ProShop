import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from '../Screen/SearchBox'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {

  }, [])

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
    <Container>
        <LinkContainer to="/">
          <Navbar.Brand >ProShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll"> 
        <SearchBox />
        <Nav
            className="ml-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
        >
          <LinkContainer to='/cart'>
            <Nav.Link>
                <i className='fas fa-shopping-cart mr-2'></i>
                Cart
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) :(
              <LinkContainer to="/login">
              <Nav.Link>
                  <i className='fas fa-user mr-2'></i>
                  Login
              </Nav.Link>
            </LinkContainer>
            )
            }

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="admin">
              <LinkContainer to="/admin/users">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/products">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orders">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            )}
        </Nav>
        </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header