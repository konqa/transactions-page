import { render, screen, waitFor, getAllByTestId } from '@testing-library/react'
import AccountInformation from './AccountInformation'

const AccountInformationComponent = () =>
  render(
    <AccountInformation
      currentBankAccountIndex={0}
      setBankAccountIndex
      accounts={[
        {
          currencyCode: 'USD',
          accountHolderNames: 'Mr Paul Kruger',
          accountType: 'Business',
          identifiers: {
            accountNumber: '01945678',
            bankCode: '18273928',
          },
          balances: {
            current: {
              amount: 18000.3,
              creditDebitIndicator: 'Credit',
            },
            available: {
              amount: 18600.22,
              creditDebitIndicator: 'Debit',
            },
          },
          transactions: [
            {
              amount: 800,
              creditDebitIndicator: 'Debit',
            },
            {
              amount: 0.6,
              creditDebitIndicator: 'Debit',
            },
            {
              amount: 3443.6,
              creditDebitIndicator: 'Credit',
            },
            {
              amount: 1.17,
              creditDebitIndicator: 'Debit',
            },
            {
              amount: 5.49,
              creditDebitIndicator: 'Debit',
            },
            {
              amount: 2901.99,
              creditDebitIndicator: 'Credit',
            },
            {
              amount: 50,
              creditDebitIndicator: 'Credit',
            },
          ],
        },
      ]}
    />
  )

test('renders no data block', () => {
  render(
    <AccountInformation
      currentBankAccountIndex={0}
      setBankAccountIndex
      accounts={[]}
    />
  )
  const accountHolderNamesElement = screen.getByTestId('noinformationData')
  expect(accountHolderNamesElement).toBeInTheDocument()
})

test('renders current balance', async () => {
  AccountInformationComponent()
  await waitFor(() => {
    expect(screen.getByText('18 000,30', { exact: false })).toBeInTheDocument()
  })
  const providerNameElement = screen.getByTestId('currentBalance')
  expect(providerNameElement).toBeInTheDocument()
})

test('renders available balance', async () => {
  AccountInformationComponent()
  await waitFor(() => {
    expect(screen.getByText('18 600,22', { exact: false })).toBeInTheDocument()
  })
  const element = screen.getByTestId('availableBalance')
  expect(element).toBeInTheDocument()
})

test('renders total credits', async () => {
  AccountInformationComponent()
  await waitFor(() => {
    expect(screen.getByText('6 395,59', { exact: false })).toBeInTheDocument()
  })
  const totalCreditsElement = screen.getByTestId('totalCredits')
  expect(totalCreditsElement).toBeInTheDocument()
})

test('renders total debits', async () => {
  AccountInformationComponent()
  await waitFor(() => {
    expect(screen.getByText('807,26', { exact: false })).toBeInTheDocument()
  })
  const totalDebitsElement = screen.getByTestId('totalDebits')
  expect(totalDebitsElement).toBeInTheDocument()
})

test('renders correct account name on list', async () => {
  AccountInformationComponent()
  await waitFor(() => {
    expect(screen.getByText('Business: 01945678-18273928')).toBeInTheDocument()
  })
  const element = screen.getByTestId('accountItems')
  expect(element).toBeInTheDocument()
})
