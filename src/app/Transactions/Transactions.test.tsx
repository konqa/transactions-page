import { render, screen, fireEvent } from '@testing-library/react'
import Transactions from './Transactions'

const TransactionsComponent = () =>
  render(
    <Transactions
      transactions={[
        {
          transactionId: '2022668028',
          description: 'KFC France',
          amount: 2.3,
          creditDebitIndicator: 'Debit',
          bookingDate: '2020-03-22T00:00:00Z',
          enrichedData: {
            category: {
              id: 30027,
              name: 'Eating out',
              confidence: 0.962992906570435,
            },
          },
        },
        {
          transactionId: '2022668056',
          description: 'BEST ONE, xxx LONDON    LONDON     US',
          amount: 30,
          creditDebitIndicator: 'Debit',
          bookingDate: '2020-03-20T00:00:00Z',

          enrichedData: {
            category: {
              id: 30073,
              name: 'Uncategorised',
            },
          },
        },
      ]}
    />
  )

test('renders no data block', () => {
  render(<Transactions transactions={[]} />)
  const element = screen.getByTestId('notransactionsData')
  expect(element).toBeInTheDocument()
})

test('renders search box', () => {
  TransactionsComponent()
  const element = screen.getByTestId('searchBox')
  expect(element).toBeInTheDocument()
})

test('renders page size filter', () => {
  TransactionsComponent()
  const element = screen.getByTestId('pageSizeFilter')
  expect(element).toBeInTheDocument()
})

test('renders transaction table', () => {
  TransactionsComponent()
  const element = screen.getByTestId('transactionTable')
  expect(element).toBeInTheDocument()
})

test('renders page flipper', () => {
  TransactionsComponent()
  const element = screen.getByTestId('pagination')
  expect(element).toBeInTheDocument()
})

test('render excludes uncategorised text', () => {
  TransactionsComponent()
  const element = screen.queryByText('Uncategorised')
  expect(element).not.toBeInTheDocument()
})

test('render is displaying date correctly', () => {
  TransactionsComponent()
  const element1 = screen.queryByText('2020-03-20T00:00:00Z')
  expect(element1).not.toBeInTheDocument()
  const element2 = screen.getByText('2020-03-20')
  expect(element2).toBeInTheDocument()
})

// Check search flow
// Check page size change
