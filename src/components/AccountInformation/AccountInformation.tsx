import './AccountInformation.scss'
import { useEffect, useState, memo } from 'react'
import { Select } from 'antd'

interface AccountInformationProps {
  accounts: any[]
}

const { Option } = Select

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

function AccountInformation(props: AccountInformationProps) {
  const [debitsTotal, setDebitsTotal] = useState<string>('')
  const [creditsTotal, setCreditsTotal] = useState<string>('')

  const sumArray = (numbers: number[]): number => {
    if (numbers.length) {
      return numbers.reduce((a, b) => {
        return Number((a + b).toFixed(2))
      })
    } else {
      return 0
    }
  }

  const calculateTotals = () => {
    // console.log('props', props['accounts'])

    let debitsSum: number[] = []
    let creditsSum: number[] = []

    props['accounts'] &&
      props['accounts'][0].transactions.map((transaction: any) =>
        transaction.creditDebitIndicator === 'Debit'
          ? debitsSum.push(transaction.amount)
          : creditsSum.push(transaction.amount)
      )

    setDebitsTotal(sumArray(debitsSum).toFixed(2))
    setCreditsTotal(sumArray(creditsSum).toFixed(2))
  }

  useEffect(() => {
    // console.log('props', props['accounts'])
    calculateTotals()
  }, [props, props['accounts'], calculateTotals])

  return (
    <section className='account-holder-block'>
      <div className='account-holder-header'>
        <div className='section-title'>Accounts</div>
        <div className='section-title left-margin-100'>
          <Select
            defaultValue='lucy'
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value='jack'>Jack</Option>
            <Option value='lucy'>Lucy</Option>
            <Option value='Yiminghe'>yiminghe</Option>
          </Select>
        </div>
      </div>
      {props['accounts'] && props['accounts'][0] && (
        <div className='details-block bordered'>
          <div>
            <div>
              Total Debits:{' '}
              {`${props['accounts'][0].currencyCode} ${debitsTotal}`}
            </div>
            <div>
              Total Credits:{' '}
              {`${props['accounts'][0].currencyCode} ${creditsTotal}`}
            </div>
          </div>
          <div>
            <div>
              Available Balance:{' '}
              {`${props['accounts'][0].currencyCode} ${props['accounts'][0].balances.available.amount} ${props['accounts'][0].balances.available.creditDebitIndicator} `}
            </div>
            <div>
              Current Balance:{' '}
              {`${props['accounts'][0].currencyCode} ${props['accounts'][0].balances.current.amount} ${props['accounts'][0].balances.current.creditDebitIndicator} `}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default memo(AccountInformation)
