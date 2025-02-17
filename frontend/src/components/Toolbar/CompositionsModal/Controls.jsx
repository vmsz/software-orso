import { useCompositionModal } from '../../../helpers/hooks/useCompositionModal'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'

function Controls() {
  const {
    setModalOpen,
    compositionTab,
    compositionRow,
    additionalInfo,
    inputs,
    setCompositionTab,
    setCompositionRow,
    setCode,
    setDescription,
    setUnity,
    setAdditionalInfo,
    setInitialInputs,
    setInputs,
  } = useCompositionModal()
  const { setTabData, tabs, tabData } = useSpreadsheetTabs()

  return (
    <div className='flex w-full items-center justify-end gap-2'>
      <button
        className='bg-accent h-8 w-24 rounded-md transition-all hover:brightness-responsive active:scale-90'
        onClick={() => {
          if (compositionTab && compositionRow != null && compositionRow != undefined) {
            let cost = 0
            for (const input of inputs) {
              cost += input.resourceTotal * input.cost
            }
            const indexOfCompositionTab = tabs.indexOf(compositionTab)
            const updatedTabData = tabData
            updatedTabData[indexOfCompositionTab][compositionRow] = {
              ...updatedTabData[indexOfCompositionTab][compositionRow],
              cost: cost,
              additionalInfo: additionalInfo,
              inputs: inputs,
              total: cost * updatedTabData[indexOfCompositionTab][compositionRow].quantity,
            }
            setTabData(updatedTabData)
          }
          setModalOpen(false)
          setCompositionTab('')
          setCompositionRow(null)
          setCode('')
          setDescription('')
          setUnity('')
          setAdditionalInfo('')
          setInitialInputs([])
          setInputs([])
        }}
      >
        Salvar
      </button>
      <button
        className='border-border h-8 w-24 rounded-md border transition-all hover:brightness-responsive active:scale-90'
        onClick={() => {
          setModalOpen(false)
          setCompositionTab('')
          setCompositionRow(null)
          setCode('')
          setDescription('')
          setUnity('')
          setAdditionalInfo('')
          setInitialInputs([])
          setInputs([])
        }}
      >
        Cancelar
      </button>
    </div>
  )
}
export { Controls }
