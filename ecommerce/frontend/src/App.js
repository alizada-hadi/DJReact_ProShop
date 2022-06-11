import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen'
import CartScreen from './Screen/CartScreen';
import  LoginScreen from './Screen/LoginScreen'
import RegisterScreen from './Screen/RegisterScreen';
import ProfileScreen from './Screen/ProfileScreen';
import ShippingScreen from './Screen/ShippingScreen';
import PaymentScreen from './Screen/PaymentScreen';
import PlaceOrderScreen from './Screen/PlaceOrderScreen';
import OrderScreen from './Screen/OrderScreen';
import UserListScreen from './Screen/UserListScreen';
import UserEditScreen from './Screen/UserEditScreen';
import ProductListScreen from './Screen/ProductListScreen';
import ProductUpdateScreen from './Screen/ProductUpdateScreen';
import OrderListScreen from './Screen/OrderListScreen';


function App() {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="product/:id" element={<ProductScreen />} />
              <Route path="cart/" element={<CartScreen />} />
              <Route path="cart/:id" element={<CartScreen />} />
              <Route path="login/" element={<LoginScreen />} />
              <Route path="register/" element={<RegisterScreen />} />
              <Route path="profile/" element={<ProfileScreen />} />
              <Route path="shipping/" element={<ShippingScreen />} />
              <Route path="payment/" element={<PaymentScreen />} />
              <Route path="placeorder/" element={<PlaceOrderScreen />} />
              <Route path="admin/orders" element={<OrderListScreen />} />
              <Route path="order/:id/" element={<OrderScreen />} />
              <Route path="admin/users" element={<UserListScreen />} />
              <Route path="admin/user/:id/edit" element={<UserEditScreen />} />
              <Route path="admin/products" element={<ProductListScreen />} />
              <Route path="admin/product/:id/edit" element={<ProductUpdateScreen />} />
            </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
