import { useSpreadsheetTabs } from '../../helpers/hooks/useSpreadsheetTabs'
import { selectCell, deselectCell, cellHandleOnKeyDown } from '../../helpers/functions/cellFunctions'

function QuantityCell({ column, row, width, value, setRowData }) {
  const { tabData, activeTab } = useSpreadsheetTabs()
  const rowData = tabData?.[activeTab]?.[row]
  return (
    <input
      id={`cell_${column}${row}`}
      style={{ width: width }}
      className='border-borderSpreadsheet focus:border-accent hover:bg-cellHovered focus:bg-cellHovered h-8 w-full cursor-cell border-b border-r border-solid bg-transparent text-center text-sm font-bold placeholder:font-normal focus:border-2'
      type='number'
      value={value ? value : ''}
      onChange={event => {
        tabData[activeTab][row] = {
          ...rowData,
          quantity: event.target.value,
          total: rowData?.cost * event.target.value,
        }
        setRowData({ ...rowData, quantity: event.target.value, total: rowData?.cost * event.target.value })
      }}
      onTouchStart={event => selectCell(event)}
      onDoubleClick={event => selectCell(event)}
      onBlur={event => deselectCell(event)}
      onKeyDown={event => cellHandleOnKeyDown(event, row, setRowData, tabData, activeTab, undefined)}
      data-column={column}
      data-row={row}
      spellCheck={false}
      readOnly={true}
    />
  )
}

export { QuantityCell }
