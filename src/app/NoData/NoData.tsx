interface NoDataProps {
  infoCategory: string
}

function NoData(props: NoDataProps) {
  return (
    <div
      className='no-transactions'
      data-testid={`no${props.infoCategory}Data`}
    >
      No {props.infoCategory} to display
    </div>
  )
}

export default NoData
