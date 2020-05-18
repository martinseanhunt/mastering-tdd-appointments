import React from 'react'
import ReactDOM from 'react-dom'

import Appointment from '../src/components/Appointment'

describe('Appointment', () => {
  let container
  let sampleCustomer

  const render = component => ReactDOM.render(component, container)

  beforeEach(() => {
    container = document.createElement('div')
    sampleCustomer = { 
      firstName: 'Ashley', 
      lastName: 'Person', 
      phoneNumber: '07871354332',
      stylist: 'betty',
      salon: 'bettys salon',
      notes: 'Here are some notes'
    }
  })

  it('renders the customers first name', () => {
      render(<Appointment customer={sampleCustomer} />)
      expect(container.textContent).toMatch(sampleCustomer.firstName)
  })

  it('renders the customers first name', () => {  
    sampleCustomer.firstName = 'Dongle'
    render(<Appointment customer={sampleCustomer} />)

    const tableRow = container.querySelector('[data-test="first-name"]')
    expect(tableRow.textContent).toMatch(sampleCustomer.firstName)
  })

  it('renders the customers last name', () => {  
    render(<Appointment customer={sampleCustomer} />)

    const tableRow = container.querySelector('[data-test="last-name"]')
    expect(tableRow.textContent).toMatch(sampleCustomer.lastName)
  })

  it('renders the customers phone number', () => {  
    render(<Appointment customer={sampleCustomer} />)

    const tableRow = container.querySelector('[data-test="phone-number"]')
    expect(tableRow.textContent).toMatch(sampleCustomer.phoneNumber)
  })

  it('renders the customers stylist', () => {  
    render(<Appointment customer={sampleCustomer} />)

    const tableRow = container.querySelector('[data-test="stylist"]')
    expect(tableRow.textContent).toMatch(sampleCustomer.stylist)
  })

  it('renders the customers salon', () => {  
    render(<Appointment customer={sampleCustomer} />)

    const tableRow = container.querySelector('[data-test="salon"]')
    expect(tableRow.textContent).toMatch(sampleCustomer.salon)
  })

  it('renders the customers notes', () => {  
    render(<Appointment customer={sampleCustomer} />)

    const tableRow = container.querySelector('[data-test="notes"]')
    expect(tableRow.textContent).toMatch(sampleCustomer.notes)
  })

  it('renders heading with appointment time', () => {
    render(<Appointment customer={sampleCustomer} startsAt={new Date().setHours(12, 0)}/>)

    const heading = container.querySelector('[data-test="heading"]')
    expect(heading).toBeTruthy()
    expect(heading.textContent).toMatch('12:00')
  })
})