import { formatToBRL } from '../../../helpers/functions/formatToBRL'
import { useBDI } from '../../../helpers/hooks/useBDI'

let directCosts = 0

function TaxesTable() {
  const {
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
    setNetProfit,
    pis,
    setPis,
    cofins,
    setCofins,
    iss,
    setIss,
    cprb,
    setCprb,
    irpj,
    setIrpj,
    csll,
    setCsll,
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
    taxesAndGrossMargin: netProfit + pis + cofins + iss + cprb + irpj + csll,
    bonusAndProfit: netProfit,
    taxes: pis + cofins + iss + cprb + irpj + csll,
  }

  const indirectExpensesAndDirectCost =
    directCosts + directCosts * ((centralAdministration + financialExpenses + insurance + risks) / 100)

  const sellingPrice = indirectExpensesAndDirectCost / (1 - percentages.taxesAndGrossMargin / 100)

  const costs = {
    bonusAndProfit: (directCosts * percentages.bonusAndProfit) / 100,
    netProfit: (directCosts * netProfit) / 100,

    taxes: (sellingPrice * percentages.taxes) / 100,
    pis: (sellingPrice * pis) / 100,
    cofins: (sellingPrice * cofins) / 100,
    iss: (sellingPrice * iss) / 100,
    cprb: (sellingPrice * cprb) / 100,
    irpj: (sellingPrice * irpj) / 100,
    csll: (sellingPrice * csll) / 100,
  }

  const taxesAndGrossMarginCost = costs.taxes + costs.bonusAndProfit

  return (
    <div className='h-full overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-500'>
      <div className='bg-accentVariant sticky top-0 flex h-9 w-full items-center text-xs font-bold max-lg:h-12 max-[867px]:w-fit'>
        <span className='border-border flex h-full w-[264px] shrink-0 items-center justify-center border-r border-solid px-2 leading-none'>
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
        item={'1'}
        description={'IMPOSTOS + MARGEM BRUTA'}
        percentage={percentages.taxesAndGrossMargin}
        cost={taxesAndGrossMarginCost}
        reference={''}
        bgColor={'bg-accent'}
      />
      <Item
        item={'1.1'}
        description={'BONIFICAÇÃO/LUCRO'}
        percentage={percentages.bonusAndProfit}
        cost={costs.bonusAndProfit}
        reference={''}
        bgColor={'bg-secondLevelItem'}
      />
      <PercentageEditableItem
        item={'1.1.1'}
        description={'Lucro Líquido (LL)'}
        percentage={netProfit}
        cost={costs.netProfit}
        onChange={event => setNetProfit(parseFloat(event.target.value))}
        reference={
          'No Lucro Presumido o LL a ser considerado é de livre arbítrio do empreendedor - Premissa de Mercado / Média dos contratos firmados com a VALE'
        }
        bgColor={'bg-thirdLevelItem'}
      />
      <Item
        item={'1.2'}
        description={'IMPOSTOS E TAXAS'}
        percentage={percentages.taxes}
        cost={costs.taxes}
        reference={
          'No Lucro Presumido o LL a ser considerado é de livre arbítrio do empreendedor - Premissa de Mercado / Média dos contratos firmados com a VALE'
        }
        bgColor={'bg-secondLevelItem'}
      />
      <PercentageEditableItem
        item={'1.2.1'}
        description={'PIS'}
        percentage={pis}
        cost={costs.pis}
        onChange={event => setPis(parseFloat(event.target.value))}
        reference={'Regime de Lucro Presumido'}
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'1.2.2'}
        description={'COFINS'}
        percentage={cofins}
        cost={costs.cofins}
        onChange={event => setCofins(parseFloat(event.target.value))}
        reference={'Regime de Lucro Presumido'}
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'1.2.3'}
        description={'ISS'}
        percentage={iss}
        cost={costs.iss}
        onChange={event => setIss(parseFloat(event.target.value))}
        reference={'Maior alíquota dentre os municípios'}
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'1.2.4'}
        description={'CPRB - Contribuição Previdenciária sobre a Receita Bruta'}
        percentage={cprb}
        cost={costs.cprb}
        onChange={event => setCprb(parseFloat(event.target.value))}
        reference={
          'Lei 13.670/2018 - Tabela 5.1.1 - Para empresas do setor de Construção Civil (http://sped.rfb.gov.br/arquivo/show/2773)'
        }
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'1.2.5'}
        description={'IRPJ'}
        percentage={irpj}
        cost={costs.irpj}
        onChange={event => setIrpj(parseFloat(event.target.value))}
        reference={'15% do Regime de Lucro Presumido'}
        bgColor={'bg-thirdLevelItem'}
      />
      <PercentageEditableItem
        item={'1.2.6'}
        description={'CSLL'}
        percentage={csll}
        cost={costs.csll}
        onChange={event => setCsll(parseFloat(event.target.value))}
        reference={'9% de 12% da Receita para empresas no Regime de Lucro Presumido'}
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
      className={`flex h-9 w-full text-xs max-lg:h-16 max-[867px]:w-fit ${bgColor} border-border items-center border-t border-solid`}
    >
      <span className='border-border flex h-full w-10 shrink-0 items-center justify-center border-r border-solid'>
        {item}
      </span>
      <span className='border-border flex h-full w-56 shrink-0 items-center border-r border-solid px-2 leading-none'>
        {description}
      </span>
      <span className='border-border flex h-full w-16 shrink-0 items-center justify-center border-r border-solid'>
        {percentage}%
      </span>
      <div className='border-border flex h-full w-32 shrink-0 items-center justify-center border-r border-solid'>
        {formatToBRL(cost)}
      </div>
      <span className='flex h-full min-w-[300px] flex-1 shrink-0 items-center px-2 leading-none'>{reference}</span>
    </div>
  )
}

function PercentageEditableItem({ item, description, percentage, cost, reference, bgColor, onChange }) {
  return (
    <div
      className={`flex h-9 w-full shrink-0 text-xs max-lg:h-16 max-[867px]:w-fit ${bgColor} border-border items-center border-t border-solid`}
    >
      <span
        className={`flex h-full w-10 shrink-0 items-center ${bgColor && bgColor} border-border justify-center border-r border-solid`}
      >
        {item}
      </span>
      <span
        className={`flex h-full w-56 shrink-0 items-center ${bgColor && bgColor} border-border border-r border-solid px-2 leading-none`}
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
export { TaxesTable }
