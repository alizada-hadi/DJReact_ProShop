import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen'
import CartScreen from './Screen/CartScreen';


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
            </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
