import { useEffect, useState } from 'react'
import './App.scss'
import CustomerData from './app/CustomerData/CustomerData'
import AccountInformation from './app/AccountInformation/AccountInformation'
import Transactions from './app/Transactions/Transactions'

function App() {
  const [data, setData] = useState<any>({})
  const [currentBankAccountIndex, setBankAccountIndex] = useState<number>(0)

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
            accountHolderNames={
              data.accounts[currentBankAccountIndex].accountHolderNames
            }
          />

          <AccountInformation
            accounts={data.accounts}
            currentBankAccountIndex={currentBankAccountIndex}
            setBankAccountIndex={setBankAccountIndex}
          />
          <Transactions
            transactions={data.accounts[currentBankAccountIndex].transactions}
          />
        </>
      )}
    </div>
  )
}

export default App
