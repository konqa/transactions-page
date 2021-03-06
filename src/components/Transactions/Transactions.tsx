import './Transactions.scss'

function Transactions() {
  return (
    <section className='transactions-block'>
      <div className='section-title'>Transactions</div>
      <div className='details-block headings'>
        <div>Date and Description</div>
        <div>Category</div>
        <div>Type and Amount</div>
      </div>
      <div className='transaction-row bordered'>
        <div className='transaction-row description'>Amazon AWS Purchase</div>
        <div className='transaction-row category'>
          <div>Online Transaction</div>
        </div>
        <div className='transaction-row amount'>233.02 CR</div>
      </div>
      <div className='transaction-row bordered'>
        <div className='transaction-row description'>Checkers</div>
        <div className='transaction-row category'>
          <div>Fraud</div>
        </div>
        <div className='transaction-row amount'>1233.02 CR</div>
      </div>
    </section>
  )
}

export default Transactions
