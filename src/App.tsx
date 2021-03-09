import { useEffect, useState } from 'react'
import './App.scss'
import CustomerData from './app/CustomerData/CustomerData'
import AccountInformation from './app/AccountInformation/AccountInformation'
import Transactions from './app/Transactions/Transactions'

function App() {
  const [data, setData] = useState<any>({})

  const getData = () => {
    try {
      fetch('./data/apollo-carter.json')
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((jsonData) => {
          console.log(jsonData)
          setData(jsonData)
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='App'>
      {Object.keys(data).length > 0 && (
        <>
          <CustomerData
            providerName={data.providerName}
            countryCode={data.countryCode}
            accountHolderNames={data.accounts[0].accountHolderNames}
          />

          <AccountInformation accounts={data.accounts} />
          <Transactions transactions={data.accounts[0].transactions} />
        </>
      )}
      {/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header> */}
    </div>
  )
}

export default App
