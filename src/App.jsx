import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStateContext } from "./context/context_provider";
import './styles/dashboard.css';
import Dashboard from './navigation/dashboard';
import Products from './navigation/products';
import Orders from './navigation/orders';
import { Customers } from "./navigation/customers";
import { Login } from "./auth/login";
import { Register } from "./auth/register";


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


function App() {
  const { token } = useStateContext();
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={token ? <Dashboard products={products} orders={orders} /> : <Navigate to="/login" />} />
        <Route path="/products" element={token ? <Products products={products} /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <Orders orders={orders} /> : <Navigate to="/login" />} />
        <Route path="/customers" element={token ? <Customers /> : <Navigate to="/login" />}  />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={token ? <h2>404 Not Found</h2> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;