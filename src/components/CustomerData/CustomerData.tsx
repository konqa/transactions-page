import './CustomerData.scss'

interface CustomerDataProps {
  providerName: string
  countryCode: string
  accountHolderNames: string
}

function CustomerData(props: CustomerDataProps) {
  return (
    <section className='customer-data-block'>
      <div className='section-title'>{props.accountHolderNames}</div>
      <div className='details-block'>
        <div className='info-row'>
          <div className='info-label'>Provider Name:</div>
          <div className='info-value'>{props.providerName}</div>
        </div>
        <div className='info-row right'>
          <div className='info-label'>Country Code:</div>
          <div className='info-value'>{props.countryCode}</div>
        </div>
      </div>
    </section>
  )
}

export default CustomerData
