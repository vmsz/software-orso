import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { RiResetRightFill } from 'react-icons/ri'

function ResetModal() {
  const [open, setOpen] = useState(false)
  const { tabData, setTabData, tabs, activeTab, tabScrollIndex, setTabScrollIndex } = useSpreadsheetTabs()

  return (
    <>
      <button
        className='relative top-1 flex cursor-pointer items-center gap-1 transition-all hover:brightness-responsive active:scale-90'
        onMouseUp={() => setOpen(true)}
      >
        <RiResetRightFill size={26} className='shrink-0' />
        <span className='shrink-0 text-sm font-semibold'>Limpar guia</span>
      </button>

      <Dialog
        transition
        open={open}
        onClose={() => setOpen(false)}
        className='fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/40 font-[Inter] text-primary backdrop-blur-lg transition duration-150 ease-out data-[closed]:opacity-0'
      >
        <DialogPanel
          className={
            'bg-modal border-borderVariant flex w-full max-w-[480px] flex-col gap-5 rounded-xl border border-solid p-6 shadow-xl'
          }
        >
          <span>Tem certeza que deseja limpar a guia &quot;{tabs[activeTab]}&quot;</span>
          <div className='flex w-full justify-end gap-2'>
            <button
              className='bg-accent h-8 w-24 rounded-md transition-all hover:brightness-responsive active:scale-90'
              onClick={() => {
                const updatedTabData = tabData
                updatedTabData[activeTab] = {}

                const updatedTabScrollIndex = tabScrollIndex
                updatedTabScrollIndex[activeTab] = 0

                setTabScrollIndex(updatedTabScrollIndex)
                setTabData(updatedTabData)
                return setOpen(false)
              }}
            >
              Limpar
            </button>
            <button
              className='border-border h-8 w-24 rounded-md border transition-all hover:brightness-responsive active:scale-90'
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
export { ResetModal }
