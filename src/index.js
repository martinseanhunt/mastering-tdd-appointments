import React from 'react'
import ReactDOM from 'react-dom'

import sampleAppointments from './sampleData'
import AppointmentsDayView from './components/AppointmentsDayView'

ReactDOM.render(
  <AppointmentsDayView appointments={sampleAppointments} />,
  document.getElementById('root')
)