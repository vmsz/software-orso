import { useState } from 'react'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { FaFileDownload } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'
import { useBDI } from '../../../helpers/hooks/useBDI'

function SaveData() {
  const { tabs, tabData, tabScrollIndex, activeTab } = useSpreadsheetTabs()
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
    pis,
    cofins,
    iss,
    cprb,
    irpj,
    csll,
    bdi,
  } = useBDI()
  const [loading, setLoading] = useState(false)

  return (
    <button
      className='relative top-1.5 flex cursor-pointer items-center gap-1 text-center transition-all hover:brightness-responsive active:scale-90'
      onMouseUp={async () => {
        setLoading(true)
        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        const hour = new Date().getHours()
        const minutes = new Date().getMinutes()

        let file = {
          tabs: tabs,
          tabData: tabData,
          tabScrollIndex: tabScrollIndex,
          activeTab: activeTab,
          bdiSettings: {
            civilWorks: civilWorks,
            personnelMobilizationMOI: personnelMobilizationMOI,
            personnelMobilizationMOD: personnelMobilizationMOD,
            equipmentMobilization: equipmentMobilization,
            centralSite: centralSite,
            advancedSite: advancedSite,
            spsSite: spsSite,
            siteMaintenance: siteMaintenance,
            localAdministration: localAdministration,
            personnelDemobilizationMOI: personnelDemobilizationMOI,
            personnelDemobilizationMOD: personnelDemobilizationMOD,
            equipmentDemobilization: equipmentDemobilization,
            centralAdministration: centralAdministration,
            financialExpenses: financialExpenses,
            insurance: insurance,
            risks: risks,
            netProfit: netProfit,
            pis: pis,
            cofins: cofins,
            iss: iss,
            cprb: cprb,
            irpj: irpj,
            csll: csll,
            bdi: bdi,
          },
        }
        file = JSON.stringify(file)

        const blob = new Blob([file], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download

        const link = document.createElement('a')
        link.href = url
        link.download = `Software Orso ${day}.${month}.${year} ${hour}h${minutes}m.sod`
        link.click()

        url && URL.revokeObjectURL(url)
        setLoading(false)
      }}
    >
      <FaFileDownload size={26} className='shrink-0' />
      <span className='shrink-0 text-sm font-semibold'>Salvar</span>
      <ClipLoader
        size={20}
        color='var(--primary)'
        className={`relative left-1 shrink-0 transition-all ${loading ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />
    </button>
  )
}

export { SaveData }
