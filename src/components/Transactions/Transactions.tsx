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
  }, [props])

  const resetSearch = (): void => {
    setTransactionRows(props.transactions)
    setCurrentTotalTransactions(props.transactions.length)
    setCurrentPageNumber(1)
  }

  const processSearch = (value: string): void => {
    const regexp = new RegExp(value, 'gi')
    let newRows = props.transactions.filter(
      (transaction) => transaction.description.search(regexp) > -1
    )
    setTransactionRows(newRows)
    setCurrentTotalTransactions(newRows.length)
    setCurrentPageNumber(1)
    setCurrentSearchText(value)
    // console.log('newRows', newRows)
  }

  const onSearch = (value: string): void => {
    if (value === currentSearchText) {
      return
    } else if (value === '') {
      resetSearch()
    } else {
      processSearch(value)
    }
  }

  const onFlipPage = (value: number): void => {
    console.log(`new page ${value}`)
    setCurrentPageNumber(value)
    document.querySelector('#transactions-block')?.scrollIntoView()
  }

  const handlePageSizeChange = (value: string): void => {
    console.log(`page size selected ${value}`)
    setCurrentPageSize(Number(value))
    setCurrentPageNumber(1)
  }

  return (
    <section className='transactions-block' id='transactions-block'>
      <div className='section-title'>Transactions</div>
      <div className='account-holder-filter-row'>
        <div className='section-title'>
          <Search
            placeholder='Search'
            allowClear
            onSearch={onSearch}
            style={{ width: 400 }}
          />
        </div>
        <div className='section-title'>
          <Select
            placeholder='Page size'
            defaultValue='25'
            style={{ width: 200 }}
            onChange={handlePageSizeChange}
          >
            {pageSizes.map((size, index) => (
              <Option key={index} value={size}>
                Show {size} entries
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {transactionRows.length > 0 ? (
        <>
          <div className='details-block headings'>
            <div>Date and Description</div>
            <div>Category</div>
            <div>Amount</div>
          </div>

          {transactionRows.map(
            (transaction, index) =>
              index >= currentPageSize * (currentPageNumber - 1) &&
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
        </>
      ) : (
        <div className='no-transactions'>No transactions found</div>
      )}

      {transactionRows.length > 0 && (
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
