import React, { useState } from "react";
import CustomerDataService from "../services/CustomerService";

const AddCustomer = () => {
  const initialCustomerState = {
    id: null,
    name: ""
  };
  const [customer, setCustomer] = useState(initialCustomerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = () => {
    var data = {
      name: customer.name,
      description: customer.description
    };

    CustomerDataService.create(data)
      .then(response => {
        setCustomer({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCustomer = () => {
    setCustomer(initialCustomerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCustomer}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={customer.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={customer.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveCustomer} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
