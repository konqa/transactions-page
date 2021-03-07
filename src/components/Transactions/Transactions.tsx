import { useEffect, useState, memo } from 'react'
import { Select, Input, Pagination } from 'antd'
import './Transactions.scss'

interface TransactionsProps {
  transactions: any[]
}

const { Option } = Select

const { Search } = Input

function Transactions(props: TransactionsProps) {
  const [pageSizes] = useState<string[]>(['25', '50', '100'])
  const [currentPageSize, setCurrentPageSize] = useState<number>(25)
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)

  useEffect(() => {
    console.log('props', props)
  }, [])

  const onSearch = (value: string) => {
    console.log(`search text ${value}`)
  }

  const onFlipPage = (value: number) => {
    console.log(`new page ${value}`)
    setCurrentPageNumber(value)
  }

  const handlePageSizeChange = (value: string) => {
    console.log(`page size selected ${value}`)
    setCurrentPageSize(Number(value))
  }

  return (
    <section className='transactions-block'>
      <div className='section-title'>Transactions</div>
      <div className='account-holder-filter-row'>
        <div className='section-title'>
          <Search
            placeholder='Search'
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <div className='section-title'>
          <Select
            placeholder='Page size'
            defaultValue='25'
            style={{ width: 200 }}
            onChange={handlePageSizeChange}
          >
            {pageSizes.map((size) => (
              <Option value={size}>Show {size} entries</Option>
            ))}
          </Select>
        </div>
      </div>
      <div className='details-block headings'>
        <div>Date and Description</div>
        <div>Category</div>
        <div>Amount</div>
      </div>

      {props.transactions &&
        props.transactions.map(
          (transaction, index) =>
            index > currentPageSize * (currentPageNumber - 1) &&
            index < currentPageSize * currentPageNumber && (
              <div key={index} className='transaction-row bordered'>
                <div className='transaction-row description'>
                  {transaction.bookingDate.substring(0, 10)}
                  <span className='transaction-bullet'>&bull;</span>
                  {transaction.description}
                </div>
                <div className='transaction-row category'>
                  {transaction.enrichedData.category.name ===
                  'Uncategorised' ? (
                    ''
                  ) : (
                    <div>{transaction.enrichedData.category.name}</div>
                  )}
                </div>
                <div className='transaction-row amount'>{`${
                  transaction.creditDebitIndicator === 'Debit' ? '-' : ''
                }${transaction.amount.toFixed(2)}`}</div>
              </div>
            )
        )}

      {props.transactions && (
        <div className='footer-page-flipper'>
          <Pagination
            defaultCurrent={1}
            total={props.transactions.length}
            pageSize={currentPageSize}
            showSizeChanger={false}
            onChange={onFlipPage}
          />
        </div>
      )}
    </section>
  )
}

export default Transactions
