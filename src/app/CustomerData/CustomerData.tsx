import NoData from '../NoData/NoData'
import './CustomerData.scss'

interface CustomerDataProps {
  providerName: string
  countryCode: string
  accountHolderNames: string
}

function CustomerData(props: CustomerDataProps) {
  return (
    <section className='customer-data-block'>
      {!props || props.accountHolderNames !== '' ? (
        <>
          <div className='section-title' data-testid='accountHolderNames'>
            {props.accountHolderNames}
          </div>
          <div className='details-block'>
            <div className='info-row'>
              <div className='info-label'>Provider Name:</div>
              <div className='info-value' data-testid='providerName'>
                {props.providerName}
              </div>
            </div>
            <div className='info-row right'>
              <div className='info-label'>Country Code:</div>
              <div className='info-value' data-testid='countryCode'>
                {props.countryCode}
              </div>
            </div>
          </div>
        </>
      ) : (
        <NoData infoCategory='account' />
      )}
    </section>
  )
}

export default CustomerData
