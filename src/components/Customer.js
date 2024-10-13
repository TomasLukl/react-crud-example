import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CustomerDataService from "../services/CustomerService";

const Customer = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialCustomerState = {
    id: null,
    name: "",
    description: "",
    status: true
  };
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");

  const getCustomer = id => {
    CustomerDataService.get(id)
      .then(response => {
        setCurrentCustomer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCustomer(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updateStatus = status => {
    var data = {
      id: currentCustomer.id,
      name: currentCustomer.name,
      description:  currentCustomer.description,
      status: status
    };

    CustomerDataService.update(currentCustomer.id, data)
      .then(response => {
        setCurrentCustomer({ ...currentCustomer, status: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    CustomerDataService.update(currentCustomer.id, currentCustomer)
      .then(response => {
        console.log(response.data);
        setMessage("The Customer was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCustomer = () => {
    CustomerDataService.remove(currentCustomer.id)
      .then(response => {
        console.log(response.data);
        navigate("/customers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCustomer ? (
        <div className="edit-form">
          <h4>Customer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCustomer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCustomer.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCustomer.status ? "Active" : "Inactive"}
            </div>
          </form>

          {currentCustomer.status ? (
            <button
              className="badge text-bg-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              Deactivate
            </button>
          ) : (
            <button
              className="badge text-bg-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Activate
            </button>
          )}

          <button className="badge text-bg-danger mr-2" onClick={deleteCustomer}>
            Delete
          </button>

          <button
            type="submit"
            className="badge text-bg-success"
            onClick={updateCustomer}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Customer...</p>
        </div>
      )}
    </div>
  );
};

export default Customer;
