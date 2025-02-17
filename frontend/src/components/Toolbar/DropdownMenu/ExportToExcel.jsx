import { PiMicrosoftExcelLogoFill } from 'react-icons/pi'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { generateExcel } from 'mr-excel'
import { formatToBRL } from '../../../helpers/functions/formatToBRL'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { useBDI } from '../../../helpers/hooks/useBDI'

function ExportToExcel() {
  const { tabData, tabs, activeTab } = useSpreadsheetTabs()
  const [loading, setLoading] = useState(false)
  const { bdi } = useBDI()

  return (
    <button
      className='relative right-0 top-1.5 flex cursor-pointer items-center gap-1 transition-all hover:brightness-responsive active:scale-90'
      onMouseUp={async () => {
        setLoading(true)
        await generateExcelTable(tabData, tabs, activeTab, bdi)
        setLoading(false)
      }}
    >
      <PiMicrosoftExcelLogoFill className='shrink-0' size={28} />
      <span className='relative right-0.5 shrink-0 text-sm font-semibold'>Salvar Excel</span>
      <ClipLoader
        color='var(--primary)'
        size={20}
        className={`relative left-1 shrink-0 transition-all ${loading ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />
    </button>
  )
}

export { ExportToExcel }

const generateExcelTable = async (tabData, tabs, activeTab, bdi) => {
  let formattedToMrExcel = []

  formattedToMrExcel.push({ description: 'SOFTWARE ORSO', h: 30, isTitle: true })

  const isItemized = tabData[activeTab]?.[0]?.code?.K == ''

  if (!isItemized) {
    let total = 0
    const compositions = Object.values(tabData[activeTab]).filter(row => row.code.WWW != 0)
    for (const composition of compositions) {
      total += composition.total
    }
    formattedToMrExcel.push({
      description: tabs[activeTab],
      total: formatToBRL(total),
      bdiTotal: formatToBRL(total + total * bdi),
      h: 20,
    })
  }

  for (const row of Object.values(tabData[activeTab])) {
    formattedToMrExcel.push({
      item: row?.item,

      wbsArea: row?.wbs?.area,
      wbsSubArea: row?.wbs?.subArea,
      wbsFront: row?.wbs?.front,

      codeK: row?.code?.K,
      codeTT: row?.code?.TT,
      codeUU: row?.code?.UU,
      codeVVV: row?.code?.VVV,
      codeWWW: row?.code?.WWW,

      description: row?.description,
      unity: row?.unity,

      measurementCriteriaCMS: row?.measurementCriteria?.CMS,
      measurementCriteriaK: row?.measurementCriteria?.K,
      measurementCriteriaTT: row?.measurementCriteria?.TT,
      measurementCriteriaUU: row?.measurementCriteria?.UU,
      measurementCriteriaSeq: row?.measurementCriteria?.Seq,

      quantity: row?.quantity,
      cost: formatToBRL(row?.cost),
      total: formatToBRL(row?.total),
      bdiTotal: formatToBRL(row?.total + row?.total * bdi),

      h: 20,
    })
  }

  const excelData = {
    fileName: tabs[activeTab],
    creator: 'Software Orso',
    created: Date.now(),
    modified: Date.now(),
    styles: {
      headerStyle: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: '1d2731',
        color: 'ffffff',
      },

      title: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: '1d2731',
        color: 'ffffff',
      },

      tabNameLeft: {
        alignment: { horizontal: 'left', vertical: 'center' },
        backgroundColor: 'b86e00',
      },
      tabNameCenter: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: 'b86e00',
      },

      firstLevelLeft: {
        alignment: { horizontal: 'left', vertical: 'center' },
        backgroundColor: 'ff9900',
      },
      firstLevelCenter: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: 'ff9900',
      },

      secondLevelLeft: {
        alignment: { horizontal: 'left', vertical: 'center' },
        backgroundColor: 'ffcc00',
      },
      secondLevelCenter: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: 'ffcc00',
      },

      thirdLevelLeft: {
        alignment: { horizontal: 'left', vertical: 'center' },
        backgroundColor: 'ffff99',
      },
      thirdLevelCenter: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: 'ffff99',
      },

      fourthLevelLeft: {
        alignment: { horizontal: 'left', vertical: 'center' },
        backgroundColor: 'ffffcc',
      },
      fourthLevelCenter: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: 'ffffcc',
      },

      fifthLevelLeft: {
        alignment: { horizontal: 'left', vertical: 'center' },
        backgroundColor: 'ffffff',
      },
      fifthLevelCenter: {
        alignment: { horizontal: 'center', vertical: 'center' },
        backgroundColor: 'ffffff',
      },
    },
    sheet: [
      {
        styleCellCondition(data, fullData, rowIndex, colIndex, fromHeader) {
          if (fromHeader) {
            return 'headerStyle'
          }

          let level

          if (!fullData.codeK && fullData.isTitle) {
            return 'title'
          }
          if (
            fullData.codeK == 0 &&
            fullData.codeTT == 0 &&
            fullData.codeUU == 0 &&
            fullData.codeVVV == 0 &&
            fullData.codeWWW == 0
          ) {
            if (colIndex == 9) return 'tabNameLeft'
            if (colIndex == 18) return 'tabNameCenter'
            if (colIndex == 19) return 'tabNameCenter'
            return 'tabNameCenter'
          }
          if (
            fullData.codeK != 0 &&
            fullData.codeTT == 0 &&
            fullData.codeUU == 0 &&
            fullData.codeVVV == 0 &&
            fullData.codeWWW == 0
          ) {
            level = 0
          }
          if (
            fullData.codeK != 0 &&
            fullData.codeTT != 0 &&
            fullData.codeUU == 0 &&
            fullData.codeVVV == 0 &&
            fullData.codeWWW == 0
          ) {
            level = 1
          }
          if (
            fullData.codeK != 0 &&
            fullData.codeTT != 0 &&
            fullData.codeUU != 0 &&
            fullData.codeVVV == 0 &&
            fullData.codeWWW == 0
          ) {
            level = 2
          }
          if (
            fullData.codeK != 0 &&
            fullData.codeTT != 0 &&
            fullData.codeUU != 0 &&
            fullData.codeVVV != 0 &&
            fullData.codeWWW == 0
          ) {
            level = 3
          }
          if (
            fullData.codeK != 0 &&
            fullData.codeTT != 0 &&
            fullData.codeUU != 0 &&
            fullData.codeVVV != 0 &&
            fullData.codeWWW != 0
          ) {
            level = 4
          }

          if (level == 0) {
            if (colIndex == 0) return 'firstLevelLeft'
            if (colIndex == 1) return 'firstLevelCenter'
            if (colIndex == 2) return 'firstLevelCenter'
            if (colIndex == 3) return 'firstLevelCenter'
            if (colIndex == 4) return 'firstLevelCenter'
            if (colIndex == 5) return 'firstLevelCenter'
            if (colIndex == 6) return 'firstLevelCenter'
            if (colIndex == 7) return 'firstLevelCenter'
            if (colIndex == 8) return 'firstLevelCenter'
            if (colIndex == 9) return 'firstLevelLeft'
            if (colIndex == 10) return 'firstLevelCenter'
            if (colIndex == 11) return 'firstLevelCenter'
            if (colIndex == 12) return 'firstLevelCenter'
            if (colIndex == 13) return 'firstLevelCenter'
            if (colIndex == 14) return 'firstLevelCenter'
            if (colIndex == 15) return 'firstLevelCenter'
            if (colIndex == 16) return 'firstLevelCenter'
            if (colIndex == 17) return 'firstLevelCenter'
            if (colIndex == 18) return 'firstLevelCenter'
            if (colIndex == 19) return 'firstLevelCenter'
          }
          if (level == 1) {
            if (colIndex == 0) return 'secondLevelLeft'
            if (colIndex == 1) return 'secondLevelCenter'
            if (colIndex == 2) return 'secondLevelCenter'
            if (colIndex == 3) return 'secondLevelCenter'
            if (colIndex == 4) return 'secondLevelCenter'
            if (colIndex == 5) return 'secondLevelCenter'
            if (colIndex == 6) return 'secondLevelCenter'
            if (colIndex == 7) return 'secondLevelCenter'
            if (colIndex == 8) return 'secondLevelCenter'
            if (colIndex == 9) return 'secondLevelLeft'
            if (colIndex == 10) return 'secondLevelCenter'
            if (colIndex == 11) return 'secondLevelCenter'
            if (colIndex == 12) return 'secondLevelCenter'
            if (colIndex == 13) return 'secondLevelCenter'
            if (colIndex == 14) return 'secondLevelCenter'
            if (colIndex == 15) return 'secondLevelCenter'
            if (colIndex == 16) return 'secondLevelCenter'
            if (colIndex == 17) return 'secondLevelCenter'
            if (colIndex == 18) return 'secondLevelCenter'
            if (colIndex == 19) return 'secondLevelCenter'
          }
          if (level == 2) {
            if (colIndex == 0) return 'thirdLevelLeft'
            if (colIndex == 1) return 'thirdLevelCenter'
            if (colIndex == 2) return 'thirdLevelCenter'
            if (colIndex == 3) return 'thirdLevelCenter'
            if (colIndex == 4) return 'thirdLevelCenter'
            if (colIndex == 5) return 'thirdLevelCenter'
            if (colIndex == 6) return 'thirdLevelCenter'
            if (colIndex == 7) return 'thirdLevelCenter'
            if (colIndex == 8) return 'thirdLevelCenter'
            if (colIndex == 9) return 'thirdLevelLeft'
            if (colIndex == 10) return 'thirdLevelCenter'
            if (colIndex == 11) return 'thirdLevelCenter'
            if (colIndex == 12) return 'thirdLevelCenter'
            if (colIndex == 13) return 'thirdLevelCenter'
            if (colIndex == 14) return 'thirdLevelCenter'
            if (colIndex == 15) return 'thirdLevelCenter'
            if (colIndex == 16) return 'thirdLevelCenter'
            if (colIndex == 17) return 'thirdLevelCenter'
            if (colIndex == 18) return 'thirdLevelCenter'
            if (colIndex == 19) return 'thirdLevelCenter'
          }
          if (level == 3) {
            if (colIndex == 0) return 'fourthLevelLeft'
            if (colIndex == 1) return 'fourthLevelCenter'
            if (colIndex == 2) return 'fourthLevelCenter'
            if (colIndex == 3) return 'fourthLevelCenter'
            if (colIndex == 4) return 'fourthLevelCenter'
            if (colIndex == 5) return 'fourthLevelCenter'
            if (colIndex == 6) return 'fourthLevelCenter'
            if (colIndex == 7) return 'fourthLevelCenter'
            if (colIndex == 8) return 'fourthLevelCenter'
            if (colIndex == 9) return 'fourthLevelLeft'
            if (colIndex == 10) return 'fourthLevelCenter'
            if (colIndex == 11) return 'fourthLevelCenter'
            if (colIndex == 12) return 'fourthLevelCenter'
            if (colIndex == 13) return 'fourthLevelCenter'
            if (colIndex == 14) return 'fourthLevelCenter'
            if (colIndex == 15) return 'fourthLevelCenter'
            if (colIndex == 16) return 'fourthLevelCenter'
            if (colIndex == 17) return 'fourthLevelCenter'
            if (colIndex == 18) return 'fourthLevelCenter'
            if (colIndex == 19) return 'fourthLevelCenter'
          }
          if (level == 4) {
            if (colIndex == 0) return 'fifthLevelLeft'
            if (colIndex == 1) return 'fifthLevelCenter'
            if (colIndex == 2) return 'fifthLevelCenter'
            if (colIndex == 3) return 'fifthLevelCenter'
            if (colIndex == 4) return 'fifthLevelCenter'
            if (colIndex == 5) return 'fifthLevelCenter'
            if (colIndex == 6) return 'fifthLevelCenter'
            if (colIndex == 7) return 'fifthLevelCenter'
            if (colIndex == 8) return 'fifthLevelCenter'
            if (colIndex == 9) return 'fifthLevelLeft'
            if (colIndex == 10) return 'fifthLevelCenter'
            if (colIndex == 11) return 'fifthLevelCenter'
            if (colIndex == 12) return 'fifthLevelCenter'
            if (colIndex == 13) return 'fifthLevelCenter'
            if (colIndex == 14) return 'fifthLevelCenter'
            if (colIndex == 15) return 'fifthLevelCenter'
            if (colIndex == 16) return 'fifthLevelCenter'
            if (colIndex == 17) return 'fifthLevelCenter'
            if (colIndex == 18) return 'fifthLevelCenter'
            if (colIndex == 19) return 'fifthLevelCenter'
          }
        },
        mapSheetDataOption: {
          height: 'h',
        },
        headerHeight: 30,
        name: tabs[activeTab],

        headers: [
          {
            label: 'item',
            text: 'Item',
            size: 20,
          },

          {
            label: 'wbsArea',
            text: 'Área',
            size: 10,
          },
          {
            label: 'wbsSubArea',
            text: 'Sub Área',
            size: 10,
          },
          {
            label: 'wbsFront',
            text: 'Frente',
            size: 10,
          },

          {
            label: 'codeK',
            text: 'K',
            size: 10,
          },
          {
            label: 'codeTT',
            text: 'TT',
            size: 10,
          },
          {
            label: 'codeUU',
            text: 'UU',
            size: 10,
          },
          {
            label: 'codeVVV',
            text: 'VVV',
            size: 10,
          },
          {
            label: 'codeWWW',
            text: 'WWW',
            size: 10,
          },

          {
            label: 'description',
            text: 'Descricão',
            size: 150,
          },

          {
            label: 'unity',
            text: 'Unidade',
            size: 10,
          },

          {
            label: 'measurementCriteriaCMS',
            text: 'CMS',
            size: 10,
          },
          {
            label: 'measurementCriteriaK',
            text: 'K',
            size: 10,
          },
          {
            label: 'measurementCriteriaTT',
            text: 'TT',
            size: 10,
          },
          {
            label: 'measurementCriteriaUU',
            text: 'UU',
            size: 10,
          },
          {
            label: 'measurementCriteriaSeq',
            text: 'Seq',
            size: 10,
          },

          {
            label: 'quantity',
            text: 'Quantidade',
            size: 15,
          },
          {
            label: 'cost',
            text: 'Preço',
            size: 20,
          },
          {
            label: 'total',
            text: 'Total',
            size: 30,
          },

          {
            label: 'bdiTotal',
            text: 'Total (BDI)',
            size: 30,
          },
        ],
        data: formattedToMrExcel,
      },
    ],
  }

  generateExcel(excelData)
}
