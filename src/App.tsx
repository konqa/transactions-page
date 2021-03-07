import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.scss'
import CustomerData from './components/CustomerData/CustomerData'
import AccountInformation from './components/AccountInformation/AccountInformation'
import Transactions from './components/Transactions/Transactions'

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
