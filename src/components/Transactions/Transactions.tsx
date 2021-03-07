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
  const [
    currentTotalTransactions,
    setCurrentTotalTransactions,
  ] = useState<number>(props.transactions.length)
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const [currentSearchText, setCurrentSearchText] = useState<string>('')
  const [transactionRows, setTransactionRows] = useState(props.transactions)

  useEffect(() => {
    console.log('props', props)
  }, [])

  const resetSearch = (): void => {
    setTransactionRows(props.transactions)
    setCurrentTotalTransactions(props.transactions.length)
    setCurrentPageNumber(1)
    setCurrentSearchText('')
    console.log('BLANK', transactionRows)
  }

  const processSearch = (value: string) => {
    let newRows = transactionRows.filter((transaction) =>
      transaction.description.includes(value)
    )
    console.log('newRows', newRows)
    setTransactionRows(newRows)
    setCurrentTotalTransactions(newRows.length)
    setCurrentPageNumber(1)
    setCurrentSearchText(value)
  }

  const onSearch = (value: string) => {
    console.log(`search text ${value}`)
    if (value === '') {
      resetSearch()
    } else {
      processSearch(value)
    }
  }

  const onFlipPage = (value: number): void => {
    console.log(`new page ${value}`)
    setCurrentPageNumber(value)
  }

  const handlePageSizeChange = (value: string): void => {
    console.log(`page size selected ${value}`)
    setCurrentPageSize(Number(value))
    setCurrentPageNumber(1)
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

      {transactionRows &&
        transactionRows.map(
          (transaction, index) =>
            index > currentPageSize * (currentPageNumber - 1) &&
            index < currentPageSize * currentPageNumber &&
            transaction.description.includes(currentSearchText) && (
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
            current={currentPageNumber}
            total={currentTotalTransactions}
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
