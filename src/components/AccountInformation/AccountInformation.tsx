import './AccountInformation.scss'

function AccountInformation() {
  return (
    <section className='account-holder-block'>
      <div className='section-title'>Accounts</div>
      <div className='details-block bordered'>
        <div>
          <div>Total Debits: 2000.00</div>
          <div>Total Credits: 4000.00</div>
        </div>
        <div>
          <div>Available Balance: 2000.00</div>
          <div>Current Balance: 2880.00</div>
        </div>
      </div>
    </section>
  )
}

export default AccountInformation
