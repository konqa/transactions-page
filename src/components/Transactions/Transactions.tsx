import { useEffect, useState, memo } from 'react'
import './Transactions.scss'

interface TransactionsPropsType {
  transactions: any[]
}

function Transactions(props: TransactionsPropsType) {
  useEffect(() => {
    console.log('props', props)
  }, [])

  return (
    <section className='transactions-block'>
      <div className='section-title'>Transactions</div>
      <div className='details-block headings'>
        <div>Date and Description</div>
        <div>Category</div>
        <div>Amount</div>
      </div>

      {props.transactions &&
        props.transactions.map((transaction, index) => (
          <div key={index} className='transaction-row bordered'>
            <div className='transaction-row description'>
              {transaction.bookingDate.substring(0, 10)}
              <span className='transaction-bullet'>&bull;</span>
              {transaction.description}
            </div>
            <div className='transaction-row category'>
              {transaction.enrichedData.category.name === 'Uncategorised' ? (
                ''
              ) : (
                <div>{transaction.enrichedData.category.name}</div>
              )}
            </div>
            <div className='transaction-row amount'>{`${
              transaction.creditDebitIndicator === 'Debit' ? '-' : ''
            }${transaction.amount.toFixed(2)}`}</div>
          </div>
        ))}
    </section>
  )
}

export default Transactions
