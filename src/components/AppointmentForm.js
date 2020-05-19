import React, { useState } from 'react'

const AppointmentForm = ({ 
  selectableServices, 
  service, 
  onSubmit 
}) => { 
  const [appointment, setAppointment] = useState({
    service
  })

  return (
    <form 
      id="appointment"
      onSubmit={() => onSubmit(appointment)}
    >
      <label htmlFor="service">Service</label>
      <select 
        name="service" 
        value={appointment.service} 
        id="service"
        onChange={e => setAppointment({ service: e.target.value })}
      >
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </form>
  )
}

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions']
}

export default AppointmentForm