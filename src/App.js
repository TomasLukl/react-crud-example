import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCustomer from "./components/AddCustomer";
import Customer from "./components/Customer";
import CustomersList from "./components/CustomersList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/customers" className="navbar-brand">
          CMS
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/customers"} className="nav-link">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CustomersList/>} />
          <Route path="/customers" element={<CustomersList/>} />
          <Route path="/add" element={<AddCustomer/>} />
          <Route path="/customers/:id" element={<Customer/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
