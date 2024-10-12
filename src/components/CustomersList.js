import React, { useState, useEffect } from "react";
import CustomerDataService from "../services/CustomerService";
import { Link } from "react-router-dom";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveCustomers();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCustomers = () => {
    CustomerDataService.getAll()
      .then(response => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCustomers();
    setCurrentCustomer(null);
    setCurrentIndex(-1);
  };

  const setActiveCustomer = (Customer, index) => {
    setCurrentCustomer(Customer);
    setCurrentIndex(index);
  };

  const removeAllCustomers = () => {
    CustomerDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    CustomerDataService.findByName(searchName)
      .then(response => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Customers List</h4>

        <ul className="list-group">
          {customers &&
            customers.map((customer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCustomer(customer, index)}
                key={index}
              >
                {customer.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCustomers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCustomer ? (
          <div>
            <h4>Customer</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCustomer.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCustomer.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCustomer.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/customers/" + currentCustomer.id}
              className="badge text-bg-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersList;
