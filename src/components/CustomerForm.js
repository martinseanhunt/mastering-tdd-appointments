import React, { useState } from 'react'

const CustomerForm = ({ 
  firstName, 
  lastName,
  phoneNumber,
  onSubmit 
}) => {
  const [customer, setCustomer] = useState({ 
    firstName,
    lastName,
    phoneNumber
  })
  
  const handleChange = e => setCustomer({
    ...customer, 
    [e.target.name]: e.target.value
  })

  return <form 
    data-test="customer-form"
    onSubmit={() => onSubmit(customer)}
  >
    <label htmlFor="firstName">First name</label>
    <input
      type="text"
      name="firstName"
      value={customer.firstName}
      id="firstName"
      onChange={handleChange}
    />

    <label htmlFor="lastName">Last name</label>
    <input
      type="text"
      name="lastName"
      value={customer.lastName}
      id="lastName"
      onChange={handleChange}
    />

    <label htmlFor="phoneNumber">Phone number</label>
    <input
      type="text"
      name="phoneNumber"
      value={customer.phoneNumber}
      id="phoneNumber"
      onChange={handleChange}
    />

    <input type="submit" value="submit" />
  </form>
}

export default CustomerForm