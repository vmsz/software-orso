import { TbEdit } from 'react-icons/tb'
import { useCompositionModal } from '../../../helpers/hooks/useCompositionModal'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'

function EditIcon({ row }) {
  const {
    setModalOpen,
    setCompositionTab,
    setCompositionRow,
    setCode,
    setDescription,
    setUnity,
    setAdditionalInfo,
    setInitialInputs,
    setInputs,
  } = useCompositionModal()
  const { tabData, activeTab } = useSpreadsheetTabs()
  const rowData = tabData?.[activeTab]?.[row]

  return (
    <TbEdit
      size={22}
      color='var(--secondary)'
      className='cursor-pointer transition-all hover:scale-110 hover:brightness-responsive'
      onClick={() => {
        setCompositionTab(rowData.tab)
        setCompositionRow(rowData.row)
        setCode(rowData.code.K + rowData.code.TT + rowData.code.UU + rowData.code.VVV + rowData.code.WWW)
        setDescription(rowData.description)
        setUnity(rowData.unity)
        setAdditionalInfo(rowData.additionalInfo)
        setInitialInputs(JSON.parse(JSON.stringify(rowData.inputs)))
        setInputs(JSON.parse(JSON.stringify(rowData.inputs)))
        setModalOpen(true)
      }}
    />
  )
}
export { EditIcon }
