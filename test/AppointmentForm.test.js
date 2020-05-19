import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'

import { createContainer } from './domManipulators'
import AppointmentForm from '../src/components/AppointmentForm'

describe('AppointmentForm', () => {
  let render
  let container

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  const form = id => container.querySelector(`form[id="${id}"]`)
  const getField = name => form('appointment').elements[name]
  const getLabel = name => container.querySelector(`label[for="${name}"]`)

  // Selects an option by its text content
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(
      option => option.textContent === textContent
    )
  }

  it('renders a form', () => {
    render(<AppointmentForm />)
    expect(form('appointment')).toBeTruthy()
  })

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />)
      const field = getField('service')

      expect(field).toBeTruthy()
      expect(field.tagName).toEqual('SELECT')
    })

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />)
      const firstNode = getField('service').childNodes[0]

      expect(firstNode.value).toEqual('')
      expect(firstNode.selected).toBeTruthy()
    })

    it('lists all salon services', () => {
      const selectableServices = ['Cut', 'Blow-dry']
      render(<AppointmentForm
        selectableServices={selectableServices}
      />)
        
      // The node list is live and will update as compoennt does
      // but the array we're creating is static at the point of creation
      const optionNodes = Array.from(getField('service').childNodes)
      const renderedServices = optionNodes.map(node => node.textContent)

      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      )
    })

    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry']
      render(
        <AppointmentForm
          selectableServices={services}
          service="Blow-dry"
        />
      )
      const option = findOption(
        getField('service'),
        'Blow-dry'
      )
      expect(option.selected).toBeTruthy()
    })

    it('renders a label', () => {
      render(<AppointmentForm />)
      const label = getLabel('service')
      expect(label).toBeTruthy()
      expect(label.textContent).toEqual('Service')
    })

    it('assigns an id that matches the label id', () => {
      render(<AppointmentForm />)
      const label = getLabel('service')
      const field = getField('service')

      expect(label.htmlFor).toEqual(field.id)
    })

    it('saves existing value when submitted', async () => {
      expect.hasAssertions()
      const services = ['Cut']
      render(
        <AppointmentForm
          selectableServices={services}
          service="Cut"
          onSubmit={values => expect(values.service).toEqual('Cut')}
        />
      )
      await ReactTestUtils.Simulate.submit(form('appointment'))
    })

    it('saves a new value when submitted', async () => {
      expect.hasAssertions()
      const services = ['Cut', 'Blow-dry']
      render(
        <AppointmentForm
          selectableServices={services}
          service="Blow-dry"
          onSubmit={appointment => expect(appointment.service).toEqual('Cut')}
        />
      )
      
      expect(getField('service').value).toEqual('Blow-dry')

      await ReactTestUtils.Simulate.change(getField('service'), 
        { target: { value: 'Cut' } }
      )
      await ReactTestUtils.Simulate.submit(form('appointment'))
    })
  })
})