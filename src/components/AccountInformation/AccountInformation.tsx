import './AccountInformation.scss'
import { useEffect, useState, memo } from 'react'
import { Select } from 'antd'

interface AccountInformationProps {
  accounts: any[]
}

const { Option } = Select

const moneyShape = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
})

function AccountInformation(props: AccountInformationProps) {
  const [debitsTotal, setDebitsTotal] = useState<number>(0)
  const [creditsTotal, setCreditsTotal] = useState<number>(0)
  const [
    currentBankAccountIndex,
    setCurrentBankAccountIndex,
  ] = useState<number>(0)

  const { transactions, currencyCode, balances } = props.accounts[
    currentBankAccountIndex
  ]

  const handleAccountChange = (value: number): void => {
    setCurrentBankAccountIndex(value)
  }

  const sumArray = (numbers: number[]): number => {
    if (numbers.length) {
      return numbers.reduce((a, b) => {
        return Number((a + b).toFixed(2))
      })
    } else {
      return 0
    }
  }

  const calculateTotals = () => {
    let debitsSum: number[] = []
    let creditsSum: number[] = []

    props.accounts &&
      props.accounts[currentBankAccountIndex] &&
      transactions.map((transaction: any) =>
        transaction.creditDebitIndicator === 'Debit'
          ? debitsSum.push(transaction.amount)
          : creditsSum.push(transaction.amount)
      )

    setDebitsTotal(sumArray(debitsSum))
    setCreditsTotal(sumArray(creditsSum))
  }

  useEffect(() => {
    console.log('props acc', props.accounts)
    calculateTotals()
  }, [props, props.accounts, calculateTotals])

  return (
    <section className='account-holder-block'>
      <div className='account-holder-header'>
        <div className='section-title'>Accounts</div>
        <div className='section-title left-margin-100' id='account-filter'>
          <Select
            defaultValue={currentBankAccountIndex}
            onChange={handleAccountChange}
          >
            {props.accounts.map((acc, index) => (
              <Option key={index} value={index}>
                {`${acc.accountType}: ${acc.identifiers.accountNumber}-${acc.identifiers.bankCode}`}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {props.accounts && props.accounts[currentBankAccountIndex] && (
        <div className='details-block bordered'>
          <div className='details-block'>
            <div className='info-block'>
              <div className='info-row'>
                <div className='info-label'>Total Debits:</div>
                <div className='info-value'>{`${currencyCode} ${moneyShape
                  .format(debitsTotal)
                  .substring(1)}`}</div>
              </div>
              <div className='info-row'>
                <div className='info-label'>Total Credits:</div>
                <div className='info-value'>{`${currencyCode} ${moneyShape
                  .format(creditsTotal)
                  .substring(1)}`}</div>
              </div>
            </div>

            <div className='info-block'>
              <div className='info-row right'>
                <div className='info-label'>Available Balance:</div>
                <div className='info-value'>{`${currencyCode} ${
                  balances.available.creditDebitIndicator === 'Credit'
                    ? ''
                    : '-'
                } ${moneyShape
                  .format(balances.available.amount)
                  .substring(1)}`}</div>
              </div>
              <div className='info-row right'>
                <div className='info-label'>Current Balance:</div>
                <div className='info-value'>{`${currencyCode} ${
                  balances.current.creditDebitIndicator === 'Credit' ? '' : '-'
                } ${moneyShape
                  .format(balances.current.amount)
                  .substring(1)}`}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default memo(AccountInformation)
