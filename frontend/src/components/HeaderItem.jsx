function HeaderItem({ mainTitle, columns }) {
  return (
    <div className='h-fit shrink-0 text-sm font-bold text-secondary'>
      {mainTitle ? (
        <>
          <span className='border-borderSpreadsheet flex h-8 items-center justify-center border-b border-r border-solid'>
            {mainTitle}
          </span>
          <div className='flex'>
            {columns.map(column => {
              return (
                <span
                  key={column.title}
                  className='border-borderSpreadsheet flex h-8 items-center justify-center border-b border-r border-solid'
                  style={{ width: column.width }}
                >
                  {column.title}
                </span>
              )
            })}
          </div>
        </>
      ) : (
        <span
          style={{ width: columns[0].width }}
          className='border-borderSpreadsheet flex h-16 items-center justify-center border-b border-r border-solid'
        >
          {columns[0].title}
        </span>
      )}
    </div>
  )
}

export { HeaderItem }
