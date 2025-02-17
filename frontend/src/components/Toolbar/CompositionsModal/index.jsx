import { LuNetwork } from 'react-icons/lu'
import { MainContent } from './MainContent'
import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { useCompositionModal } from '../../../helpers/hooks/useCompositionModal'
import { Controls } from './Controls'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import { InputsTable } from './Tabs/InputsTable'
import { BarChart } from './Tabs/BarChart'
import { PieChart } from './Tabs/PieChart'

function CompositionsModal() {
  const {
    modalOpen,
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
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <div className='relative flex justify-center'>
      <LuNetwork
        size={30}
        onMouseUp={() => setModalOpen(true)}
        onMouseOver={() => setTooltipOpen(true)}
        onMouseOut={() => setTooltipOpen(false)}
        className='flex shrink-0 cursor-pointer flex-col items-center transition-all hover:brightness-responsive active:scale-90'
      />
      <span
        className={`bg-tooltip border-borderVariant absolute top-12 z-50 shrink-0 select-none rounded-lg border border-solid p-2 transition-all ${tooltipOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        Composições
      </span>

      <Dialog
        transition
        open={modalOpen}
        onClose={() => {
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
        className='fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/40 p-10 font-[Inter] text-primary backdrop-blur-lg transition duration-150 ease-out data-[closed]:opacity-0'
      >
        <DialogPanel
          className={
            'bg-modal border-borderVariant flex h-full max-h-[900px] w-full max-w-[1520px] flex-col gap-3 rounded-xl border border-solid p-4 font-Inter text-primary shadow-xl'
          }
        >
          <MainContent />
          <TabGroup className={'flex flex-1 flex-col overflow-hidden'}>
            <TabList className={'rounded-t-lg'}>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-tl-lg rounded-tr-lg px-5 py-2 transition-all hover:brightness-responsive`}
              >
                Insumos
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-tl-lg rounded-tr-lg px-5 py-2 transition-all hover:brightness-responsive`}
              >
                Gráfico de Barras
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-tl-lg rounded-tr-lg px-5 py-2 transition-all hover:brightness-responsive`}
              >
                Gráfico de Setores
              </Tab>
            </TabList>
            <TabPanels className={'flex-1 overflow-hidden rounded-b-lg rounded-tr-lg'}>
              <TabPanel className={'h-full'}>
                <InputsTable />
              </TabPanel>
              <TabPanel className={'h-full'}>
                <BarChart />
              </TabPanel>
              <TabPanel className={'h-full'}>
                <PieChart />
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <Controls />
        </DialogPanel>
      </Dialog>
    </div>
  )
}

export { CompositionsModal }
