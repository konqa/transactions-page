import './AccountInformation.scss'
import { useEffect, useState, memo } from 'react'
import { Select } from 'antd'
import NoData from '../NoData/NoData'

interface AccountInformationProps {
  accounts: any[]
  currentBankAccountIndex: number
  setBankAccountIndex: any
}

const { Option } = Select

const moneyShape = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
})

function AccountInformation(props: AccountInformationProps) {
  const [debitsTotal, setDebitsTotal] = useState<number>(0)
  const [creditsTotal, setCreditsTotal] = useState<number>(0)

  const handleAccountChange = (value: number): void => {
    props.setBankAccountIndex(value)
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
      props.currentBankAccountIndex > -1 &&
      props.accounts[props.currentBankAccountIndex] &&
      props.accounts[
        props.currentBankAccountIndex
      ].transactions.map((transaction: any) =>
        transaction.creditDebitIndicator === 'Debit'
          ? debitsSum.push(transaction.amount)
          : creditsSum.push(transaction.amount)
      )

    setDebitsTotal(sumArray(debitsSum))
    setCreditsTotal(sumArray(creditsSum))
  }

  useEffect(() => {
    console.log('props acc', props.accounts)
    console.log('props.currentBankAccountIndex', props.currentBankAccountIndex)
    calculateTotals()
  }, [props, props.accounts, calculateTotals])

  return (
    <section className='account-holder-block'>
      {props.accounts[0] && props.accounts[0].accountHolderNames ? (
        <>
          <div className='account-holder-header'>
            <div className='section-title'>Accounts</div>
            <div className='section-title left-margin-100' id='account-filter'>
              <Select
                defaultValue={props.currentBankAccountIndex}
                onChange={handleAccountChange}
                data-testid='accountItems'
              >
                {props.accounts.map((acc, index) => (
                  <Option key={index} value={index}>
                    {`${acc.accountType}: ${acc.identifiers.accountNumber}-${acc.identifiers.bankCode}`}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='details-block bordered'>
            <div className='details-block'>
              <div className='info-block'>
                <div className='info-row'>
                  <div className='info-label'>Total Debits:</div>
                  <div className='info-value' data-testid='totalDebits'>{`${
                    props.accounts[props.currentBankAccountIndex].currencyCode
                  } ${moneyShape.format(debitsTotal).substring(1)}`}</div>
                </div>
                <div className='info-row'>
                  <div className='info-label'>Total Credits:</div>
                  <div className='info-value' data-testid='totalCredits'>{`${
                    props.accounts[props.currentBankAccountIndex].currencyCode
                  } ${moneyShape.format(creditsTotal).substring(1)}`}</div>
                </div>
              </div>

              <div className='info-block'>
                <div className='info-row right'>
                  <div className='info-label'>Available Balance:</div>
                  <div
                    className='info-value'
                    data-testid='availableBalance'
                  >{`${
                    props.accounts[props.currentBankAccountIndex].currencyCode
                  } ${
                    props.accounts[props.currentBankAccountIndex].balances
                      .available.creditDebitIndicator === 'Credit'
                      ? ''
                      : '-'
                  } ${moneyShape
                    .format(
                      props.accounts[props.currentBankAccountIndex].balances
                        .available.amount
                    )
                    .substring(1)}`}</div>
                </div>
                <div className='info-row right'>
                  <div className='info-label'>Current Balance:</div>
                  <div className='info-value' data-testid='currentBalance'>{`${
                    props.accounts[props.currentBankAccountIndex].currencyCode
                  } ${
                    props.accounts[props.currentBankAccountIndex].balances
                      .current.creditDebitIndicator === 'Credit'
                      ? ''
                      : '-'
                  } ${moneyShape
                    .format(
                      props.accounts[props.currentBankAccountIndex].balances
                        .current.amount
                    )
                    .substring(1)}`}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NoData infoCategory='information' />
      )}
    </section>
  )
}

export default memo(AccountInformation)
