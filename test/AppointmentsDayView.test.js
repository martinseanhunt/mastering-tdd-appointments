import React from 'react'
import reactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import AppointmentDayView from '../src/components/AppointmentsDayView'

// NOTE: following the book but I don't think these are a good use case 
// for toMatch as is would create false positives e.g component has Ashleya 
// would create match for Ashley

describe('AppoinmentsDayView', () => {
  let container
  const today = new Date()
  const appointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: 'Ashley' } },
    { startsAt: today.setHours(13, 0), customer: { firstName: 'Bill' } }
  ]

  const render = component => reactDOM.render(component, container)

  beforeEach(() => {
    container = document.createElement('div')
  })

  it('renders a div with the correct ID', () => {
    render(<AppointmentDayView appointments={[]} />)
    expect(container.querySelector('#appointments-day-view')).toBeTruthy()
  })

  it('renders elements in an ol element', () => {    
    render(<AppointmentDayView appointments={appointments} />)
    const list = container.querySelector('ol')

    expect(list).toBeTruthy()
    expect(list.children).toHaveLength(2)
  })
  
  it('renders each appointment in an <li>', () => {
    render(<AppointmentDayView appointments={appointments} />)
    const listItems = container.querySelectorAll('li')

    expect(listItems.length).toEqual(2)
    expect(listItems[0].textContent).toEqual(('12:00'))
    expect(listItems[1].textContent).toEqual(('13:00'))
  })

  // TODO 
  it('renders a no-appointments message', () => {
    render(<AppointmentDayView appointments={[]} />)

    const message = container.querySelector('[data-test="no-appointments"]')

    expect(message).toBeTruthy()
  })

  // NOTE: Is this now an integration test since it's covering the child? 
  // I think it would be better to give the component a data attribut and
  // check that it's being rendered with the correct props? 
  it('selects the first appointment by default', () => {
    render(<AppointmentDayView appointments={appointments} />)
    expect(container.textContent).toMatch('Ashley')
  })

  it('has a button within each li', () => {
    render(<AppointmentDayView appointments={appointments} />)
    const listItems = container.querySelectorAll('li > button')
    
    expect(listItems).toHaveLength(appointments.length)
    expect(listItems[0].type).toEqual('button')
  })

  it('renders another appointment when selected', () => {
    render(<AppointmentDayView appointments={appointments} />)
    const button = container.querySelectorAll('button')[1]

    ReactTestUtils.Simulate.click(button)

    expect(container.textContent).toMatch(appointments[1].customer.firstName)
  })
})