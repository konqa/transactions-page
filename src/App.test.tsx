import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

it('Logo presence', () => {
  const { queryByAltText } = render(<App />)
  const img = queryByAltText('logo')
  expect(img).toBeTruthy()
})
