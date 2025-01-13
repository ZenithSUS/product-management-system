import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import './styles/dashboard.css';
import Dashboard from './navigation/dashboard';
import Products from './navigation/products';

const products = [
  {id: 1, name: "Product 1", price: 10.99, quantity: 5},
  {id: 2, name: "Product 2", price: 19.99, quantity: 3},
  {id: 3, name: "Product 3", price: 29.99, quantity: 2}
];

const orders = [
  {id: 1, name: "Order 1", price: 10.99, quantity: 5},
  {id: 2, name: "Order 2", price: 19.99, quantity: 3},
  {id: 3, name: "Order 3", price: 29.99, quantity: 2},
  {id: 4, name: "Order 4", price: 39.99, quantity: 1},
  {id: 5, name: "Order 5", price: 49.99, quantity: 2}
]

const customers = [
  {id: 1, name: "Customer 1", email: "6o9fD@example.com"},
  {id: 2, name: "Customer 2", email: "6o9fD@example.com"},
  {id: 3, name: "Customer 3", email: "6o9fD@example.com"},
  {id: 4, name: "Customer 4", email: "6o9fD@example.com"},
  {id: 5, name: "Customer 5", email: "6o9fD@example.com"}
]

function App() {
  const token = true;

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={token ? <Dashboard products={products} orders={orders} customers={customers} /> : <Navigate to="/login" />} />
        <Route path="/products" element={token ? <Products products={products} /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <h2>Orders</h2> : <Navigate to="/login" />} />
        <Route path="/customers" element={token ? <h2>Customers</h2> : <Navigate to="/login" />}  />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <h2>Login</h2>} />
        <Route path="*" element={token ? <h2>404 Not Found</h2> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;