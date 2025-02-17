import { formatToBRL } from '../../../helpers/functions/formatToBRL'
import { useBDI } from '../../../helpers/hooks/useBDI'

let directCosts = 0

function CostTable() {
  const {
    civilWorks,
    setCivilWorks,
    personnelMobilizationMOI,
    setPersonnelMobilizationMOI,
    personnelMobilizationMOD,
    setPersonnelMobilizationMOD,
    equipmentMobilization,
    setEquipmentMobilization,
    centralSite,
    setCentralSite,
    advancedSite,
    setAdvancedSite,
    spsSite,
    setSpsSite,
    siteMaintenance,
    setSiteMaintenance,
    localAdministration,
    setLocalAdministration,
    personnelDemobilizationMOI,
    setPersonnelDemobilizationMOI,
    personnelDemobilizationMOD,
    setPersonnelDemobilizationMOD,
    equipmentDemobilization,
    setEquipmentDemobilization,

    centralAdministration,
    setCentralAdministration,
    financialExpenses,
    setFinancialExpenses,
    insurance,
    setInsurance,
    risks,
    setRisks,
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

  const percentages = {
    civilWorks: (civilWorks / directCosts) * 100,
    personnelMobilizationMOI: (personnelMobilizationMOI / directCosts) * 100,
    personnelMobilizationMOD: (personnelMobilizationMOD / directCosts) * 100,
    equipmentMobilization: (equipmentMobilization / directCosts) * 100,
    centralSite: (centralSite / directCosts) * 100,
    advancedSite: (advancedSite / directCosts) * 100,
    spsSite: (spsSite / directCosts) * 100,
    siteMaintenance: (siteMaintenance / directCosts) * 100,
    localAdministration: (localAdministration / directCosts) * 100,
    personnelDemobilizationMOI: (personnelDemobilizationMOI / directCosts) * 100,
    personnelDemobilizationMOD: (personnelDemobilizationMOD / directCosts) * 100,
    equipmentDemobilization: (equipmentDemobilization / directCosts) * 100,
    indirectExpenses: centralAdministration + financialExpenses + insurance + risks,
  }

  const costs = {
    indirectExpenses: (directCosts * (centralAdministration + financialExpenses + insurance + risks)) / 100,
    centralAdministration: (directCosts * centralAdministration) / 100,
    financialExpenses: (directCosts * financialExpenses) / 100,
    insurance: (directCosts * insurance) / 100,
    risks: (directCosts * risks) / 100,
  }

  return (
    <div className='h-full overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-500'>
      <div className='bg-accentVariant sticky top-0 flex h-9 items-center text-xs font-bold max-lg:h-12 max-[883px]:w-fit'>
        <span className='border-border flex h-full w-[280px] shrink-0 items-center justify-center border-r border-solid px-2 leading-none'>
          DISCRIMINAÇÃO CUSTOS
        </span>
        <span className='border-border flex h-full w-16 shrink-0 items-center justify-center border-r border-solid'>
          %
        </span>
        <span className='border-border flex h-full w-32 shrink-0 items-center justify-center border-r border-solid'>
          R$
        </span>
        <span className='flex h-full min-w-[300px] flex-1 shrink-0 items-center justify-center px-2 leading-none'>
          REFERÊNCIA
        </span>
      </div>
      <Item
        item={1}
        description={'CUSTO DIRETO'}
        percentage={100}
        cost={directCosts}
        reference={''}
        bgColor={'bg-accent'}
      />
      <CostEditableItem
        item={1.1}
        description={'Obras Civis, Terraplenagem, Drenagem e Pavimentação'}
        cost={civilWorks}
        percentage={percentages.civilWorks}
        onChange={event => setCivilWorks(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra '}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.2}
        description={'Mobilização de Pessoal (MOI)'}
        cost={personnelMobilizationMOI}
        percentage={percentages.personnelMobilizationMOI}
        onChange={event => setPersonnelMobilizationMOI(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.3}
        description={'Mobilização de Pessoal (MOD)'}
        cost={personnelMobilizationMOD}
        percentage={percentages.personnelMobilizationMOD}
        onChange={event => setPersonnelMobilizationMOD(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.4}
        description={'Mobilização de Equipamento'}
        cost={equipmentMobilization}
        percentage={percentages.equipmentMobilization}
        onChange={event => setEquipmentMobilization(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.5}
        description={'Canteiro Central'}
        cost={centralSite}
        percentage={percentages.centralSite}
        onChange={event => setCentralSite(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.6}
        description={'Canteiro Avançado'}
        cost={advancedSite}
        percentage={percentages.advancedSite}
        onChange={event => setAdvancedSite(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.7}
        description={'Canteiro SPS'}
        cost={spsSite}
        percentage={percentages.spsSite}
        onChange={event => setSpsSite(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.8}
        description={'Manutenção do Canteiro'}
        cost={siteMaintenance}
        percentage={percentages.siteMaintenance}
        onChange={event => setSiteMaintenance(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={1.9}
        description={'Administração Local'}
        cost={localAdministration}
        percentage={percentages.localAdministration}
        onChange={event => setLocalAdministration(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={'1.10'}
        description={'Desmobilização de Pessoal (MOI)'}
        cost={personnelDemobilizationMOI}
        percentage={percentages.personnelDemobilizationMOI}
        onChange={event => setPersonnelDemobilizationMOI(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={'1.11'}
        description={'Desmobilização de Pessoal (MOD)'}
        cost={personnelDemobilizationMOD}
        percentage={percentages.personnelDemobilizationMOD}
        onChange={event => setPersonnelDemobilizationMOD(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <CostEditableItem
        item={'1.12'}
        description={'Desmobilização de Equipamento'}
        cost={equipmentDemobilization}
        percentage={percentages.equipmentDemobilization}
        onChange={event => setEquipmentDemobilization(parseFloat(event.target.value))}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
      <Item
        item={'2'}
        description={'DESPESAS INDIRETAS'}
        percentage={percentages.indirectExpenses}
        cost={costs.indirectExpenses}
        reference={''}
        bgColor={'bg-accent'}
      />
      <PercentageEditableItem
        item={'2.1'}
        description={'Administração central (AC)'}
        cost={costs.centralAdministration}
        percentage={centralAdministration}
        onChange={event => {
          setCentralAdministration(parseFloat(event.target.value))
        }}
        reference={
          'Alíquota média utilizada pelo TCU (ACÓRDÃO Nº 2622/2013) para obras do tipo CONSTRUÇÃO DE EDIFÍCIOS'
        }
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'2.2'}
        description={'Despesas Financeiras (DF)'}
        cost={costs.financialExpenses}
        percentage={financialExpenses}
        onChange={event => {
          setFinancialExpenses(parseFloat(event.target.value))
        }}
        reference={
          'Fluxo de caixa para simulação de uma contrato de 12 meses, primeira medição em 90 dias - Juros mensais de 4% a.m.'
        }
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'2.3'}
        description={'Seguros/ Responsabilidade Civil (S)'}
        cost={costs.insurance}
        percentage={insurance}
        onChange={event => {
          setInsurance(parseFloat(event.target.value))
        }}
        reference={'Premissa de Mercado / Média dos contratos firmados com a VALE'}
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'2.4'}
        description={'Riscos (R)'}
        cost={costs.risks}
        percentage={risks}
        onChange={event => {
          setRisks(parseFloat(event.target.value))
        }}
        reference={'Valores obtidos através do estudo do custo direto de cada obra'}
        bgColor={'bg-thirdLevelItem'}
      />
    </div>
  )
}

function Item({ item, description, percentage, cost, reference, bgColor }) {
  percentage = percentage.toFixed(2)
  percentage = percentage.toString()
  percentage = percentage.replace('.', ',')

  return (
    <div
      className={`flex h-9 text-xs max-lg:h-12 max-[883px]:w-fit ${bgColor} border-border items-center border-t border-solid`}
    >
      <span className='border-border flex h-full w-10 shrink-0 items-center justify-center border-r border-solid'>
        {item}
      </span>
      <span className='border-border flex h-full w-60 shrink-0 items-center border-r border-solid px-2 leading-none'>
        {description}
      </span>
      <span className='border-border flex h-full w-16 shrink-0 items-center justify-center border-r border-solid'>
        {percentage}%
      </span>
      <span className='border-border flex h-full w-32 shrink-0 items-center justify-center border-r border-solid'>
        {formatToBRL(cost)}
      </span>
      <span className='flex h-full min-w-[300px] flex-1 shrink-0 items-center px-2 leading-none'>{reference}</span>
    </div>
  )
}

function CostEditableItem({ item, description, percentage, cost, reference, bgColor, onChange }) {
  percentage = percentage.toFixed(2)
  percentage = isNaN(percentage) ? '0,00' : percentage.replace('.', ',')
  return (
    <div
      className={`flex h-9 text-xs max-lg:h-12 max-[883px]:w-fit ${bgColor} border-border items-center border-t border-solid`}
    >
      <span
        className={`flex h-full w-10 shrink-0 items-center ${bgColor && bgColor} border-border justify-center border-r border-solid`}
      >
        {item}
      </span>
      <span
        className={`flex h-full w-60 shrink-0 items-center ${bgColor && bgColor} border-border border-r border-solid px-2 leading-none`}
      >
        {description}
      </span>
      <span
        className={`flex h-full w-16 shrink-0 items-center ${bgColor && bgColor} border-border justify-center border-r border-solid`}
      >
        {percentage}%
      </span>
      <div
        className={`${bgColor && bgColor} border-border flex h-full w-32 shrink-0 items-center gap-1 border-r border-solid px-1`}
      >
        <span>R$</span>
        <input type='number' value={cost} onChange={onChange} className='bg-inputs w-full rounded-lg p-1' />
      </div>

      <span
        className={`flex h-full min-w-[300px] flex-1 shrink-0 ${bgColor && bgColor} items-center px-2 leading-none`}
      >
        {reference}
      </span>
    </div>
  )
}

function PercentageEditableItem({ item, description, percentage, cost, reference, bgColor, onChange }) {
  return (
    <div
      className={`flex h-9 text-xs max-lg:h-12 max-[883px]:w-fit ${bgColor} border-border items-center border-t border-solid`}
    >
      <span
        className={`flex h-full w-10 shrink-0 items-center ${bgColor && bgColor} border-border justify-center border-r border-solid`}
      >
        {item}
      </span>
      <span
        className={`flex h-full w-60 shrink-0 items-center ${bgColor && bgColor} border-border border-r border-solid px-2 leading-none`}
      >
        {description}
      </span>
      <div
        className={`${bgColor && bgColor} border-border flex h-full w-16 shrink-0 items-center gap-1 border-r border-solid px-1`}
      >
        <input type='number' value={percentage} onChange={onChange} className='bg-inputs w-full rounded-lg p-1' />
        <span>%</span>
      </div>
      <span
        className={`flex h-full w-32 shrink-0 items-center ${bgColor && bgColor} border-border justify-center border-r border-solid`}
      >
        {formatToBRL(cost)}
      </span>

      <span
        className={`flex h-full min-w-[300px] flex-1 shrink-0 ${bgColor && bgColor} items-center px-2 leading-none`}
      >
        {reference}
      </span>
    </div>
  )
}

export { CostTable }
