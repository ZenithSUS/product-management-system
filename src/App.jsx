import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStateContext } from "./context/context_provider";
import './styles/dashboard.css';
import { NotFound } from "./components/ui/not-found";
import Dashboard from './navigation/dashboard';
import Products from './navigation/products';
import Orders from './navigation/orders';
import { Customers } from "./navigation/customers";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { EditCustomer } from "./components/forms/customers/edit-customer";
import { EditOrder } from "./components/forms/orders/edit-order";
import { EditProduct } from "./components/forms/products/edit-product";

function App() {
  const { token } = useStateContext();

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/products" element={token ? <Products /> : <Navigate to="/login" />} />
        <Route path="/products/:productID" element={token ? <EditProduct /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/orders/:orderID" element={token ? <EditOrder /> : <Navigate to="/login" />} />
        <Route path="/customers" element={token ? <Customers /> : <Navigate to="/login" />}  />
        <Route path="/customers/:customerID" element={token ? <EditCustomer /> : <Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="*" element={token ? <NotFound /> : <Navigate to="/login" />} />
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;