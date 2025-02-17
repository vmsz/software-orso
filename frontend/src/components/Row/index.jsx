import { DefaultCell } from './DefaultCell'
import { spreadsheetConfig } from '../../helpers/configs/spreadsheetConfig'
import { QuantityCell } from './QuantityCell'
import { DescriptionCell } from './DescriptionCell'
import { useState } from 'react'
import { formatToBRL } from '../../helpers/functions/formatToBRL'
import { useSpreadsheetTabs } from '../../helpers/hooks/useSpreadsheetTabs'
import { useBDI } from '../../helpers/hooks/useBDI'

function Row({ row }) {
  const { tabData, activeTab } = useSpreadsheetTabs()
  const [rowData, setRowData] = useState(tabData?.[activeTab]?.[row])
  const { bdi } = useBDI()
  const bdiTotal = rowData?.total + rowData?.total * bdi

  let bgColor

  if (
    rowData?.code?.K == '' &&
    rowData?.code?.TT == '' &&
    rowData?.code?.UU == '' &&
    rowData?.code?.VVV == '' &&
    rowData?.code?.WWW == ''
  ) {
    bgColor = 'bg-accent'
  }

  if (
    rowData?.code?.K != 0 &&
    rowData?.code?.TT == 0 &&
    rowData?.code?.UU == 0 &&
    rowData?.code?.VVV == 0 &&
    rowData?.code?.WWW == 0
  ) {
    bgColor = 'bg-firstLevelItem'
  }
  if (
    rowData?.code?.K != 0 &&
    rowData?.code?.TT != 0 &&
    rowData?.code?.UU == 0 &&
    rowData?.code?.VVV == 0 &&
    rowData?.code?.WWW == 0
  ) {
    bgColor = 'bg-secondLevelItem'
  }
  if (
    rowData?.code?.K != 0 &&
    rowData?.code?.TT != 0 &&
    rowData?.code?.UU != 0 &&
    rowData?.code?.VVV == 0 &&
    rowData?.code?.WWW == 0
  ) {
    bgColor = 'bg-thirdLevelItem'
  }
  if (
    rowData?.code?.K != 0 &&
    rowData?.code?.TT != 0 &&
    rowData?.code?.UU != 0 &&
    rowData?.code?.VVV != 0 &&
    rowData?.code?.WWW == 0
  ) {
    bgColor = 'bg-fourthLevelItem'
  }
  if (
    rowData?.code?.K != 0 &&
    rowData?.code?.TT != 0 &&
    rowData?.code?.UU != 0 &&
    rowData?.code?.VVV != 0 &&
    rowData?.code?.WWW != 0
  ) {
    bgColor = 'bg-cell'
  }

  return (
    <div className={`flex ${bgColor} w-full max-[1903px]:w-fit`}>
      <span className='border-borderSpreadsheet bg-header sticky left-0 z-10 flex h-8 w-12 shrink-0 items-center justify-center border-b border-solid text-sm font-bold text-secondary'>
        {row + 1}
      </span>
      <DefaultCell
        row={row}
        column={spreadsheetConfig.item.letter}
        width={spreadsheetConfig.item.width}
        value={rowData?.item}
      />

      <DefaultCell
        row={row}
        column={spreadsheetConfig.wbs.area.letter}
        width={spreadsheetConfig.wbs.area.width}
        value={rowData?.wbs?.area}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.wbs.subArea.letter}
        width={spreadsheetConfig.wbs.subArea.width}
        value={rowData?.wbs?.subArea}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.wbs.front.letter}
        width={spreadsheetConfig.wbs.front.width}
        value={rowData?.wbs?.front}
      />

      <DefaultCell
        row={row}
        column={spreadsheetConfig.code.K.letter}
        width={spreadsheetConfig.code.K.width}
        value={rowData?.code?.K}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.code.TT.letter}
        width={spreadsheetConfig.code.TT.width}
        value={rowData?.code?.TT}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.code.UU.letter}
        width={spreadsheetConfig.code.UU.width}
        value={rowData?.code?.UU}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.code.VVV.letter}
        width={spreadsheetConfig.code.VVV.width}
        value={rowData?.code?.VVV}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.code.WWW.letter}
        width={spreadsheetConfig.code.WWW.width}
        value={rowData?.code?.WWW}
      />

      <DescriptionCell
        row={row}
        column={spreadsheetConfig.description.letter}
        width={spreadsheetConfig.description.width}
        value={rowData?.description}
        setRowData={setRowData}
      />

      <DefaultCell
        row={row}
        column={spreadsheetConfig.unity.letter}
        width={spreadsheetConfig.unity.width}
        value={rowData?.unity}
      />

      <DefaultCell
        row={row}
        column={spreadsheetConfig.measurementCriteria.CMS.letter}
        width={spreadsheetConfig.measurementCriteria.CMS.width}
        value={rowData?.measurementCriteria?.CMS}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.measurementCriteria.K.letter}
        width={spreadsheetConfig.measurementCriteria.K.width}
        value={rowData?.measurementCriteria?.K}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.measurementCriteria.TT.letter}
        width={spreadsheetConfig.measurementCriteria.TT.width}
        value={rowData?.measurementCriteria?.TT}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.measurementCriteria.UU.letter}
        width={spreadsheetConfig.measurementCriteria.UU.width}
        value={rowData?.measurementCriteria?.UU}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.measurementCriteria.Seq.letter}
        width={spreadsheetConfig.measurementCriteria.Seq.width}
        value={rowData?.measurementCriteria?.Seq}
      />

      <QuantityCell
        row={row}
        column={spreadsheetConfig.quantity.letter}
        width={spreadsheetConfig.quantity.width}
        value={rowData?.quantity}
        setRowData={setRowData}
      />

      <DefaultCell
        row={row}
        column={spreadsheetConfig.cost.letter}
        width={spreadsheetConfig.cost.width}
        value={formatToBRL(rowData?.cost)}
      />

      <DefaultCell
        row={row}
        column={spreadsheetConfig.total.letter}
        width={spreadsheetConfig.total.width}
        value={formatToBRL(rowData?.total)}
      />
      <DefaultCell
        row={row}
        column={spreadsheetConfig.bdi.letter}
        width={spreadsheetConfig.bdi.width}
        value={formatToBRL(bdiTotal)}
      />
    </div>
  )
}

export { Row }
