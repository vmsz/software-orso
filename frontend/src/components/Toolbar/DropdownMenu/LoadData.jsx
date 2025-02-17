import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { IoIosSave } from 'react-icons/io'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { useBDI } from '../../../helpers/hooks/useBDI'

function LoadData() {
  const { setTabs, setTabData, setActiveTab, setTabScrollIndex } = useSpreadsheetTabs()
  const [loading, setLoading] = useState(false)
  const {
    setCivilWorks,
    setPersonnelMobilizationMOI,
    setPersonnelMobilizationMOD,
    setEquipmentMobilization,
    setCentralSite,
    setAdvancedSite,
    setSpsSite,
    setSiteMaintenance,
    setLocalAdministration,
    setPersonnelDemobilizationMOI,
    setPersonnelDemobilizationMOD,
    setEquipmentDemobilization,
    setCentralAdministration,
    setFinancialExpenses,
    setInsurance,
    setRisks,
    setNetProfit,
    setPis,
    setCofins,
    setIss,
    setCprb,
    setIrpj,
    setCsll,
    setBdi,
  } = useBDI()

  return (
    <div>
      <label
        htmlFor='savedDataFileInput'
        className='relative top-1.5 flex cursor-pointer items-center gap-1 text-center transition-all hover:brightness-responsive active:scale-90'
      >
        <IoIosSave size={26} className='shrink-0' />
        <span className='relative right-0.5 shrink-0 text-sm font-semibold'>Carregar</span>
        <ClipLoader
          size={20}
          color='var(--primary)'
          className={`relative left-1 shrink-0 transition-all ${loading ? 'visible opacity-100' : 'invisible opacity-0'}`}
        />
      </label>

      <input
        type='file'
        id='savedDataFileInput'
        className='hidden'
        accept='.sod'
        onChange={async event => {
          setLoading(true)
          const file = event.target.files[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = e => {
              let jsonData = JSON.parse(e.target.result)
              const tabs = jsonData.tabs
              const tabData = jsonData.tabData
              const tabScrollIndex = jsonData.tabScrollIndex
              const activeTab = jsonData.activeTab
              const bdiSettings = jsonData.bdiSettings

              setTabs(tabs)
              setTabData(tabData)
              setActiveTab(activeTab)
              setTabScrollIndex(tabScrollIndex)

              setCivilWorks(bdiSettings.civilWorks)
              setPersonnelMobilizationMOI(bdiSettings.personnelMobilizationMOI)
              setPersonnelMobilizationMOD(bdiSettings.personnelMobilizationMOD)
              setEquipmentMobilization(bdiSettings.equipmentMobilization)
              setCentralSite(bdiSettings.centralSite)
              setAdvancedSite(bdiSettings.advancedSite)
              setSpsSite(bdiSettings.spsSite)
              setSiteMaintenance(bdiSettings.siteMaintenance)
              setLocalAdministration(bdiSettings.localAdministration)
              setPersonnelDemobilizationMOI(bdiSettings.personnelDemobilizationMOI)
              setPersonnelDemobilizationMOD(bdiSettings.personnelDemobilizationMOD)
              setEquipmentDemobilization(bdiSettings.equipmentDemobilization)
              setCentralAdministration(bdiSettings.centralAdministration)
              setFinancialExpenses(bdiSettings.financialExpenses)
              setInsurance(bdiSettings.insurance)
              setRisks(bdiSettings.risks)
              setNetProfit(bdiSettings.netProfit)
              setPis(bdiSettings.pis)
              setCofins(bdiSettings.cofins)
              setIss(bdiSettings.iss)
              setCprb(bdiSettings.cprb)
              setIrpj(bdiSettings.irpj)
              setCsll(bdiSettings.csll)
              setBdi(bdiSettings.bdi)
            }
            reader.readAsText(file)
          }
          setLoading(false)
        }}
      />
    </div>
  )
}
export { LoadData }
