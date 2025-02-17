import { AiFillInfoCircle } from 'react-icons/ai'
import { useState } from 'react'
import { useSpreadsheetTabs } from '../../helpers/hooks/useSpreadsheetTabs'
import { formatToBRL } from '../../helpers/functions/formatToBRL'
import { useBDI } from '../../helpers/hooks/useBDI'

function SpreadsheetInfo() {
  const [open, setOpen] = useState(false)
  const { tabData, activeTab } = useSpreadsheetTabs()
  const { bdi } = useBDI()

  let allTabsCompositionCount = 0
  let allTabsGroupingCount = 0
  let allTabsCost = 0

  let tabCompositionCount = 0
  let tabGroupingCount = 0
  let tabCost = 0

  for (const tab of tabData) {
    for (const row of Object.values(tab)) {
      const indexOfTab = tabData.indexOf(tab)

      if (indexOfTab == activeTab) {
        if (row.code.WWW != 0) {
          tabCost += row.total
          tabCompositionCount++
        }
        if (row.code.WWW == 0) {
          tabGroupingCount++
        }
      }

      if (row.code.WWW != 0) {
        allTabsCost += row.total
        allTabsCompositionCount++
      }
      if (row.code.WWW == 0) {
        allTabsGroupingCount++
      }
    }
  }

  return (
    <div className='relative flex flex-col items-center'>
      <AiFillInfoCircle
        className='transition-all hover:brightness-responsive'
        size={32}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onTouchStart={() => setOpen(!open)}
      />

      <div
        className={`bg-tooltip border-border absolute top-12 z-50 flex w-max select-none flex-col justify-center gap-4 rounded-md border border-solid p-3 shadow-xl transition-all ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className='flex gap-1'>
          <span className='text-secondary'>Percentual BDI:</span>
          <span className='text-primary'>{(bdi * 100).toFixed(2).toString().replace('.', ',')}%</span>
        </div>
        <div className='shrink-0 space-y-2'>
          <p className='text-md text-primary'>Esta guia</p>
          <div className='space-y-1'>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Atividades:</span>
              <span className='shrink-0 text-primary'>{tabCompositionCount}</span>
            </div>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Agrupamentos:</span>
              <span className='shrink-0 text-primary'>{tabGroupingCount}</span>
            </div>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Custo Total:</span>
              <span className='shrink-0 text-primary'>{formatToBRL(tabCost)}</span>
            </div>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Custo Total (DBI):</span>
              <span className='shrink-0 text-primary'>{formatToBRL(tabCost + tabCost * bdi)}</span>
            </div>
          </div>
        </div>

        <div className='shrink-0 space-y-2'>
          <p className='text-md text-primary'>Todas as guias</p>
          <div className='space-y-1'>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Atividades:</span>
              <span className='shrink-0 text-primary'>{allTabsCompositionCount}</span>
            </div>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Agrupamentos:</span>
              <span className='shrink-0 text-primary'>{allTabsGroupingCount}</span>
            </div>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Custo Total:</span>
              <span className='shrink-0 text-primary'>{formatToBRL(allTabsCost)}</span>
            </div>
            <div className='flex gap-2'>
              <span className='shrink-0 text-secondary'>Custo Total (BDI):</span>
              <span className='shrink-0 text-primary'>{formatToBRL(allTabsCost + allTabsCost * bdi)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { SpreadsheetInfo }
