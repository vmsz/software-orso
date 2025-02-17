import { useSpreadsheetTabs } from '../../helpers/hooks/useSpreadsheetTabs'
import { IoClose } from 'react-icons/io5'
import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'

function Tabs() {
  const { tabData, setTabData, tabs, setTabs, activeTab, setActiveTab, tabScrollIndex, setTabScrollIndex } =
    useSpreadsheetTabs()

  return (
    <div className='flex items-center gap-2 overflow-hidden'>
      <div className='flex gap-2 overflow-x-auto scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-500'>
        {tabs.map(tab => {
          const indexOfTab = tabs.indexOf(tab)
          const isActive = activeTab == indexOfTab

          if (tab) {
            return (
              <button key={tab} className={`relative flex items-center text-left`}>
                <div
                  className={`w-40 cursor-default rounded-xl p-2 transition-all ${isActive ? 'bg-accent text-primary' : 'bg-inactive text-secondary hover:brightness-responsive'}`}
                  onClick={() => setActiveTab(indexOfTab)}
                >
                  <div className='w-32 overflow-hidden text-ellipsis'>{tab}</div>
                </div>
                {tabs.length > 1 && (
                  <IoClose
                    size={20}
                    className='absolute right-1.5 cursor-default rounded-full transition-all hover:opacity-50'
                    onClick={() => {
                      if (isActive) {
                        const nextTab = tabs[activeTab + 1]
                        !nextTab && setActiveTab(activeTab - 1)
                      }
                      if (indexOfTab < activeTab) {
                        setActiveTab(activeTab - 1)
                      }

                      const updatedTabs = tabs
                      updatedTabs.splice(indexOfTab, 1)

                      const updatedTabData = tabData
                      updatedTabData.splice(indexOfTab, 1)

                      const updatedTabScrollIndex = tabScrollIndex
                      updatedTabScrollIndex.splice(indexOfTab, 1)

                      setTabs(updatedTabs)
                      setTabData(updatedTabData)
                      setTabScrollIndex(updatedTabScrollIndex)
                    }}
                  />
                )}
              </button>
            )
          }
        })}
      </div>
      <TabCreationModal />
    </div>
  )
}

export { Tabs }

function TabCreationModal() {
  const [open, setOpen] = useState(false)
  const [newTabName, setNewTabName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { tabs, setTabs, tabData, setTabData, setActiveTab, tabScrollIndex, setTabScrollIndex } = useSpreadsheetTabs()

  return (
    <>
      <IoAddOutline
        size={30}
        className='border-border shrink-0 cursor-pointer rounded-full border-solid transition-all hover:border-2 hover:brightness-responsive'
        onClick={() => setOpen(true)}
      />
      <Dialog
        transition
        open={open}
        onClose={() => {
          setOpen(false)
          setNewTabName('')
          setErrorMessage('')
        }}
        className='fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/40 font-[Inter] text-primary backdrop-blur-lg transition duration-150 ease-out data-[closed]:opacity-0'
      >
        <DialogPanel className={'bg-modal flex w-full max-w-[480px] flex-col gap-2 rounded-xl p-6 shadow-xl'}>
          <span>Insira o nome da nova guia:</span>
          <input
            type='text'
            value={newTabName}
            onChange={event => setNewTabName(event.target.value)}
            placeholder='Nome...'
            className='bg-inputs border-border h-8 w-full rounded-md border border-solid px-2 placeholder:text-secondary'
          />
          <p>{errorMessage}</p>
          <div className='flex w-full justify-end gap-2'>
            <button
              className='bg-accent h-8 w-24 rounded-md transition-all hover:brightness-responsive active:scale-90'
              onClick={() => {
                if (newTabName) {
                  if (tabs.includes(newTabName)) {
                    return setErrorMessage('Uma guia com este nome já existe, escolha outro nome.')
                  }
                  const updatedTabs = tabs
                  updatedTabs.push(newTabName)

                  const updatedTabData = tabData
                  updatedTabData.push({})

                  const updatedTabScrollIndex = tabScrollIndex
                  updatedTabScrollIndex.push(0)

                  setTabs(updatedTabs)
                  setTabData(updatedTabData)
                  setTabScrollIndex(updatedTabScrollIndex)

                  const indexOfNewTab = updatedTabs.indexOf(newTabName)
                  setActiveTab(indexOfNewTab)

                  setOpen(false)
                  setNewTabName('')
                  return setErrorMessage('')
                }
                return setErrorMessage('Por favor, insira o nome da guia')
              }}
            >
              Criar
            </button>
            <button
              className='border-border h-8 w-24 rounded-md border transition-all hover:brightness-responsive active:scale-90'
              onClick={() => {
                setOpen(false)
                setErrorMessage('')
                setNewTabName('')
              }}
            >
              Cancelar
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
export { TabCreationModal }
