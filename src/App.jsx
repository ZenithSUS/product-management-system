import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import './styles/dashboard.css';
import Dashboard from './navigation/dashboard';
import Products from './navigation/products';
import Orders from './navigation/orders';

const products = [
  {id: 1, name: "Product 1", price: 10.99, quantity: 5},
  {id: 2, name: "Product 2", price: 19.99, quantity: 3},
  {id: 3, name: "Product 3", price: 29.99, quantity: 2}
];

const orders = [
  {id: 1, customerName: "Customer 1", productName: "Product 1", quantity: 2},
  {id: 2, customerName: "Customer 2", productName: "Product 2", quantity: 1},
  {id: 3, customerName: "Customer 3", productName: "Product 3", quantity: 3},
  {id: 4, customerName: "Customer 4", productName: "Product 4", quantity: 4}
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
        <Route path="/orders" element={token ? <Orders orders={orders} /> : <Navigate to="/login" />} />
        <Route path="/customers" element={token ? <h2>Customers</h2> : <Navigate to="/login" />}  />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <h2>Login</h2>} />
        <Route path="*" element={token ? <h2>404 Not Found</h2> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;