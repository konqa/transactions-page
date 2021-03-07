import './CustomerData.scss'

interface CustomerDataPropsType {
  providerName: string
  countryCode: string
  accountHolderNames: string
}

function CustomerData(props: CustomerDataPropsType) {
  return (
    <section className='customer-data-block'>
      <div className='section-title'>{props.accountHolderNames}</div>
      <div className='details-block'>
        <div>Provider Name: {props.providerName}</div>
        <div>Country Code: {props.countryCode}</div>
      </div>
    </section>
  )
}

export default CustomerData
