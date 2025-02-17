import { cellHandleOnKeyDown } from '../../helpers/functions/cellFunctions'

function DefaultCell({ column, row, width, value }) {
  return (
    <input
      id={`cell_${column}${row}`}
      style={{ width: width }}
      className='border-borderSpreadsheet focus:border-accent hover:bg-cellHovered focus:bg-cellHovered h-8 w-full cursor-cell border-b border-r border-solid bg-transparent text-center text-sm font-bold placeholder:font-normal focus:border-2'
      type='text'
      onKeyDown={event => cellHandleOnKeyDown(event)}
      value={value ? value : ''}
      data-unselectable={true}
      data-column={column}
      data-row={row}
      spellCheck={false}
      readOnly={true}
    />
  )
}

export { DefaultCell }
