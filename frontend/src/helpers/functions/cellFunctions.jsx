import { excelColToInt, intToExcelCol } from 'excel-column-name'

function selectCell(event) {
  if (event.target.readOnly) {
    event.target.readOnly = false
    event.target.style.cursor = 'text'
    return event.target.setSelectionRange(999999, 999999)
  }
}

function deselectCell(event) {
  event.target.readOnly = true
  return (event.target.style.cursor = 'cell')
}

function cellHandleOnKeyDown(event, row, setRowData, tabData, activeTab, setSearch) {
  if (event.target.readOnly) {
    if (event.key == 'ArrowLeft') return moveLeft(event)
    if (event.key == 'ArrowUp') return moveUp(event)
    if (event.key == 'ArrowRight') return moveRight(event)
    if (event.key == 'ArrowDown') return moveDown(event)

    if (!event.target.dataset.unselectable) {
      if (event.key == 'F2') return selectCell(event)
      if (event.key == 'Delete') return clearRow(row, setRowData, tabData, activeTab, setSearch)

      if (event.key.length == 1 || event.key == 'Backspace') {
        selectCell(event)
        clearRow(row, setRowData, tabData, activeTab, setSearch)
      }
    }
  }

  if (event.shiftKey && event.key == 'Tab') return moveLeft(event)
  if (event.shiftKey && event.key == 'Enter') return moveUp(event)
  if (!event.shiftKey && event.key == 'Tab') return moveRight(event)
  if (!event.shiftKey && event.key == 'Enter') return moveDown(event)
}

export { selectCell, deselectCell, cellHandleOnKeyDown }

const moveLeft = event => {
  event.preventDefault()
  const column = event.target.dataset.column
  const row = parseInt(event.target.dataset.row)

  let previousColumn = excelColToInt(column) - 1
  previousColumn = intToExcelCol(previousColumn)
  const leftCell = document.querySelector(`[data-column='${previousColumn}'][data-row='${row}']`)
  if (leftCell) return leftCell.focus()
}

const moveUp = event => {
  event.preventDefault()
  const column = event.target.dataset.column
  const row = parseInt(event.target.dataset.row)

  const topCell = document.querySelector(`[data-column='${column}'][data-row='${row - 1}']`)
  if (topCell) return topCell.focus()
}

const moveRight = event => {
  event.preventDefault()
  const column = event.target.dataset.column
  const row = parseInt(event.target.dataset.row)

  let nextColumn = excelColToInt(column) + 1
  nextColumn = intToExcelCol(nextColumn)
  const rightCell = document.querySelector(`[data-column='${nextColumn}'][data-row='${row}']`)
  if (rightCell) return rightCell.focus()
}

const moveDown = event => {
  event.preventDefault()
  const column = event.target.dataset.column
  const row = parseInt(event.target.dataset.row)

  const bottomCell = document.querySelector(`[data-column='${column}'][data-row='${row + 1}']`)
  if (bottomCell) return bottomCell.focus()
}

const clearRow = (row, setRowData, tabData, activeTab, setSearch) => {
  setSearch && setSearch('')
  setRowData(null)
  delete tabData[activeTab][row]
}
