import { useState } from 'react'
import { formatToBRL } from '../../../helpers/functions/formatToBRL'
import { useBDI } from '../../../helpers/hooks/useBDI'

let directCosts = 0

function FinalTable() {
  const [error, setError] = useState('')
  const {
    setModalOpen,

    civilWorks,
    personnelMobilizationMOI,
    personnelMobilizationMOD,
    equipmentMobilization,
    centralSite,
    advancedSite,
    spsSite,
    siteMaintenance,
    localAdministration,
    personnelDemobilizationMOI,
    personnelDemobilizationMOD,
    equipmentDemobilization,

    centralAdministration,
    financialExpenses,
    insurance,
    risks,

    netProfit,
    pis,
    cofins,
    iss,
    cprb,
    irpj,
    csll,

    setBdi,
  } = useBDI()

  directCosts =
    civilWorks +
    personnelMobilizationMOI +
    personnelMobilizationMOD +
    equipmentMobilization +
    centralSite +
    advancedSite +
    spsSite +
    siteMaintenance +
    localAdministration +
    personnelDemobilizationMOI +
    personnelDemobilizationMOD +
    equipmentDemobilization

  const indirectExpensesAndDirectCost =
    directCosts + directCosts * ((centralAdministration + financialExpenses + insurance + risks) / 100)
  const taxesAndGrossMargin = netProfit + pis + cofins + iss + cprb + irpj + csll

  const sellingPrice = indirectExpensesAndDirectCost / (1 - taxesAndGrossMargin / 100)

  const bdiCost = directCosts * (sellingPrice / directCosts - 1)

  return (
    <div className='flex h-full flex-col gap-4 overflow-hidden'>
      <div className='overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-500'>
        <div className='bg-accentVariant flex h-9 items-center text-xs font-bold max-[1121px]:w-fit max-lg:h-12'>
          <span className='border-border flex h-full w-[540px] shrink-0 items-center justify-center border-r border-solid px-2 leading-none'>
            FECHAMENTO
          </span>
          <span className='flex h-full w-[470px] shrink-0 items-center justify-center px-2 leading-none'>
            REFÊRENCIA
          </span>
        </div>
        <Item item={1} description={'MEMÓRIA DE CALCULO'} reference={'OBRAS PRIVADAS'} bgColor={'bg-accent'} />
        <Item item={1.1} description={'PREÇO DE VENDA'} reference={''} bgColor={'bg-secondLevelItem'} />
        <Item
          item={'1.1.1'}
          description={
            <div className='flex items-center justify-center gap-2'>
              <div className='flex flex-col items-center gap-1'>
                <span>Custo Direto + Despesas Indiretas</span>
                <div className='h-0.5 w-full rounded-full bg-neutral-500'></div>
                <span>(1 - (Impostos + Margem Bruta) / 100</span>
              </div>
              <span>=</span>
              <div className='flex flex-col items-center gap-1'>
                <span>{formatToBRL(indirectExpensesAndDirectCost)}</span>
                <div className='h-0.5 w-full rounded-full bg-neutral-500'></div>
                <span>{(100 - taxesAndGrossMargin).toString().replace('.', ',')}%</span>
              </div>
            </div>
          }
          reference={formatToBRL(sellingPrice)}
          bgColor={'bg-thirdLevelItem'}
        />
        <Item item={1.2} description={'BDI(%)'} reference={''} bgColor={'bg-secondLevelItem'} />
        <Item
          item={'1.2.1'}
          description={
            <div className='flex items-center gap-1'>
              <div className='flex flex-col items-center'>
                <span>Preço de Venda</span>
                <div className='h-0.5 w-full rounded-full bg-neutral-500'></div>
                <span>Custo Direto</span>
              </div>
              <span>- 1 = {((sellingPrice / directCosts - 1) * 100).toFixed(2).replace('.', ',')}%</span>
            </div>
          }
          reference={<span>{formatToBRL(bdiCost)}</span>}
          bgColor={'bg-thirdLevelItem'}
        />
      </div>

      <div className='flex w-full gap-2'>
        <p className='flex-1'>{error}</p>
        <button
          className='bg-accent h-8 w-24 rounded-md transition-all hover:brightness-responsive active:scale-90'
          onClick={() => {
            const bdi = parseFloat((sellingPrice / directCosts - 1).toFixed(4))
            if (isNaN(bdi)) {
              return setError('Erro ao aplicar do BDI, cheque os campos novamente!')
            }
            setError('')
            setBdi(bdi)
            setModalOpen(false)
          }}
        >
          Aplicar BDI
        </button>
      </div>
    </div>
  )
}

function Item({ item, description, reference, bgColor }) {
  return (
    <div className={`flex h-12 text-xs max-[1121px]:w-fit ${bgColor} border-border items-center border-t border-solid`}>
      <span className='border-border flex h-full w-10 shrink-0 items-center justify-center border-r border-solid'>
        {item}
      </span>
      <span className='border-border flex h-full w-[500px] shrink-0 items-center border-r border-solid px-2 leading-none'>
        {description}
      </span>
      <span className='flex h-full w-[470px] shrink-0 items-center px-2 leading-none'>{reference}</span>
    </div>
  )
}

export { FinalTable }
