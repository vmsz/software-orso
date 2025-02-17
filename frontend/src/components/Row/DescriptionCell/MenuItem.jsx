import { useState } from 'react'
import { formatToBRL } from '../../../helpers/functions/formatToBRL'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'motion/react'

function MenuItem({ composition, setRowData, setMenuOpen, row }) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const { tabs, tabData, activeTab } = useSpreadsheetTabs()

  let cost = 0
  for (const input of composition.inputs) {
    cost += input.cost * input.resourceTotal
  }

  const compositionData = {
    tab: tabs[activeTab],
    row: row,
    item: '',
    wbs: {
      area: composition.wbs.area,
      subArea: composition.wbs.subArea,
      front: composition.wbs.front,
    },
    code: {
      K: composition.code.K,
      TT: composition.code.TT,
      UU: composition.code.UU,
      VVV: composition.code.VVV,
      WWW: composition.code.WWW,
    },
    description: composition.description,
    unity: composition.unity,
    measurementCriteria: {
      CMS: composition.measurementCriteria.CMS,
      K: composition.measurementCriteria.K,
      TT: composition.measurementCriteria.TT,
      UU: composition.measurementCriteria.UU,
      Seq: composition.measurementCriteria.Seq,
    },
    inputs: composition.inputs,
    cost: cost,
    quantity: 1,
    total: cost,
    additionalInfo: '',
  }

  return (
    <div
      className='relative flex w-full'
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      <button
        className='hover:bg-accent w-full cursor-pointer text-balance rounded-md p-2 text-sm leading-normal text-primary transition-all'
        onMouseUp={() => {
          tabData[activeTab][row] = compositionData
          setRowData(compositionData)
          setMenuOpen(false)
        }}
      >
        {composition.description}
      </button>
      <AnimatePresence>
        {tooltipOpen && (
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className='absolute -right-[390px] h-full w-fit origin-top-left bg-transparent text-sm'
            >
              <div
                className={`border-border bg-menu ml-4 w-96 space-y-1 rounded-xl border border-solid p-3 shadow-xl transition-all`}
              >
                <div className='flex gap-1'>
                  <span className='text-secondary'>Código EAP:</span>
                  {composition.wbs.area} {composition.wbs.subArea} {composition.wbs.front}
                </div>
                <div className='flex gap-1'>
                  <span className='text-secondary'>Código Atividade:</span>
                  {composition.code.K} {composition.code.TT} {composition.code.UU} {composition.code.VVV}{' '}
                  {composition.code.WWW}
                </div>
                <div className='flex gap-1'>
                  <span className='text-secondary'>Unidade:</span>
                  {composition.unity}
                </div>
                <div className='flex gap-1'>
                  <span className='text-secondary'>Critério de medição:</span>
                  {composition.measurementCriteria.CMS} {composition.measurementCriteria.K}{' '}
                  {composition.measurementCriteria.TT} {composition.measurementCriteria.UU}{' '}
                  {composition.measurementCriteria.Seq}
                </div>
                <div className='flex gap-1'>
                  <span className='text-secondary'>Preço:</span>
                  {formatToBRL(cost)}
                </div>
                <div className='flex gap-1'>
                  <span className='text-secondary'>Insumos:</span>
                  <div className='flex max-h-32 w-full flex-col overflow-y-auto overscroll-contain pr-2 scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-500'>
                    {composition.inputs.map(input => {
                      return (
                        <span
                          className='border-border text-balance border-solid pb-1 [&:not(:first-child)]:pt-1 [&:not(:last-child)]:border-b'
                          key={`${composition.id}${input.code}`}
                        >
                          {input.description}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </div>
  )
}

export { MenuItem }
