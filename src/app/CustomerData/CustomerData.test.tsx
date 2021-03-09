import { render, screen } from '@testing-library/react'
import CustomerData from './CustomerData'

const cDataComponent = () =>
  render(
    <CustomerData
      providerName='Data Company'
      countryCode='RU'
      accountHolderNames='Rodney Elmington'
    />
  )

test('renders no data block', () => {
  render(<CustomerData providerName='' countryCode='' accountHolderNames='' />)
  const accountHolderNamesElement = screen.getByTestId('noaccountData')
  expect(accountHolderNamesElement).toBeInTheDocument()
})

test('renders account holder name', () => {
  cDataComponent()
  const accountHolderNamesText = screen.getByText('Rodney Elmington')
  const accountHolderNamesElement = screen.getByTestId('accountHolderNames')
  expect(accountHolderNamesText).toBeInTheDocument()
  expect(accountHolderNamesElement).toBeInTheDocument()
})

test('renders provider name', () => {
  cDataComponent()
  const providerNameText = screen.getByText('Data Company')
  const providerNameElement = screen.getByTestId('providerName')
  expect(providerNameElement).toBeInTheDocument()
  expect(providerNameText).toBeInTheDocument()
})

test('renders country code', () => {
  cDataComponent()
  const countryCodeText = screen.getByText('RU')
  const countryCodeElement = screen.getByTestId('countryCode')
  expect(countryCodeText).toBeInTheDocument()
  expect(countryCodeElement).toBeInTheDocument()
})
