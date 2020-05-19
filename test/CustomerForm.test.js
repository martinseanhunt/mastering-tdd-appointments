import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'

import { createContainer } from './domManipulators'
import CustomerForm from '../src/components/CustomerForm'

describe('CustomerForm', () => {
  let render
  let container

  const getForm = id => container.querySelector(`form[data-test="${id}"]`)
  const getField = fieldName => getForm('customer-form').elements[fieldName]
  const labelFor = formElement =>
  container.querySelector(`label[for="${formElement}"]`)

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).toBeTruthy()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual('text')
  }

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  it('renders a form', () => {
    render(<CustomerForm />)
    const form = getForm('customer-form')

    expect(form).toBeTruthy()
  })

  const itRendersAsATextBox = fieldName => 
    it('renders as a text box', () => {
      render(<CustomerForm />)
      const field = getField(fieldName)
      expectToBeInputFieldOfTypeText(field)
    })

  const itIncludesTheExistingValue = fieldName => 
    it('includes the existing value', () => {
      // Setting prop key dynamically with spread... Nice!
      render(<CustomerForm {...{[fieldName]: 'value'}} />)
      const field = getField(fieldName)

      expect(field.value).toEqual('value')
    })

  const itRendersALabel = (fieldName, text) => 
    // I would prefer to just check that the text isn't blank
    it('renders a label', () => {
      render(<CustomerForm />)
      const label = labelFor(fieldName)

      expect(label).not.toBeNull()
      expect(label.textContent).toEqual(text)
    })

  const itAssignsMatchingId = (fieldName, id) =>
    // Could do this dynamically to make sure they match
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      const field = getField(fieldName)
      expect(field.id).toEqual(id)
    })

  const itSavesExistingValue = fieldName => 
    it('saves existing value when submitted', async () => {
      // Makes sure that at least one assertion has been made
      // so if the onSumbit hasn't run it will fail
      expect.hasAssertions()
      render(<CustomerForm
        {...{[fieldName]: "value"}}
        onSubmit={(customer) =>
          expect(customer[fieldName]).toEqual('value')
        }
      />)
      const form = getForm('customer-form')
      await ReactTestUtils.Simulate.submit(form)
    })

  const itSavesNewValue = fieldName => 
    it('saves new value when submitted', async () => {
      expect.hasAssertions()
      render(<CustomerForm
        {...{[fieldName]: "value"}}
        onSubmit={(customer) =>
          expect(customer[fieldName]).toEqual('newValue')
        }
      />)

      const form = getForm('customer-form')
      const field = getField(fieldName)

      await ReactTestUtils.Simulate.change(field, {
        target: { value: 'newValue', name: fieldName }
      })
      await ReactTestUtils.Simulate.submit(form)
    })

  describe('First name field', () => {
    const field = 'firstName'
    itRendersAsATextBox(field)
    itIncludesTheExistingValue(field)
    itRendersALabel(field, 'First name')
    itAssignsMatchingId(field, 'firstName')
    itSavesExistingValue(field)
    itSavesNewValue(field)
  })

  describe('Last name field', () => {
    const field = 'lastName'
    itRendersAsATextBox(field)
    itIncludesTheExistingValue(field)
    itRendersALabel(field, 'Last name')
    itAssignsMatchingId(field, 'lastName')
    itSavesExistingValue(field)
    itSavesNewValue(field)
  })

  describe('Phone number field', () => {
    const field = 'phoneNumber'
    itRendersAsATextBox(field)
    itIncludesTheExistingValue(field)
    itRendersALabel(field, 'Phone number')
    itAssignsMatchingId(field, 'phoneNumber')
    itSavesExistingValue(field)
    itSavesNewValue(field)
  })

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container
      .querySelector('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })
  
})