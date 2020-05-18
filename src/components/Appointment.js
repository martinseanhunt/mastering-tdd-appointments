import React from 'react'

import { appointmentTimeOfDay } from '../util/timeUtil'

const Appointment = ({ customer, startsAt }) => (
  <div>
    <h1 data-test="heading">
      Appointment for {customer.firstName} {customer.lastName} at {appointmentTimeOfDay(startsAt)}
    </h1>
    <table>
      <tbody>
        <tr data-test="first-name">
          <td>First Name</td>
          <td>{customer.firstName}</td>
        </tr>
        <tr data-test="last-name">
          <td>Last Name</td>
          <td>{customer.lastName}</td>
        </tr>
        <tr data-test="phone-number">
          <td>Phone Number</td>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr data-test="stylist">
          <td>Stylist</td>
          <td>{customer.stylist}</td>
        </tr>
        <tr data-test="salon">
          <td>Salon</td>
          <td>{customer.salon}</td>
        </tr>
        <tr data-test="notes">
          <td>Notes</td>
          <td>{customer.notes}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Appointment