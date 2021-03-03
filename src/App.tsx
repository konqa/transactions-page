import React from 'react'
import logo from './logo.svg'
import './App.scss'
import CustomerData from './components/CustomerData/CustomerData'
import AccountInformation from './components/AccountInformation/AccountInformation'
import Transactions from './components/Transactions/Transactions'

function App() {
  return (
    <div className='App'>
      <CustomerData />
      <AccountInformation />
      <Transactions />

      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
