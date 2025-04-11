import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Category from './pages/Category';
import Product from './pages/Product';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/category/:id" element={<Category />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

