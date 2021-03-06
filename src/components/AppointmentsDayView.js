import React, { useState } from 'react'

import Appointment from './Appointment'
import CustomerForm from './CustomerForm'
import { appointmentTimeOfDay } from '../util/timeUtil'

// NOTE: this component would break if appointments were not passed at all
// should use prop types

const AppointmentssDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0) 

  return (
    <>
    <div id="appointments-day-view">
      <ol>
        {appointments.map((a,i) => (
          <li key={a.startsAt}>
            <button 
              type="button"
              onClick={() => setSelectedAppointment(i)}
            >
              {appointmentTimeOfDay(a.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      
      {appointments.length
        ? <Appointment {...appointments[selectedAppointment]} />
        : <p data-test="no-appointments">No appointments</p>
      }
    </div>
    <CustomerForm />
    </>
  )
}

export default AppointmentssDayView