import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from './components/ui_parts';
import { Sidebar } from './components/ui_parts';
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
  return (
    <Router>
      <Header user={{ name: "User" }} />
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard products={products} orders={orders} customers={customers} />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/orders" element={<h2>Orders</h2>} />
        <Route path="/customers" element={<h2>Customers</h2>} />
        <Route path="/login" element={<h2>Login</h2>} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
}



export default App;