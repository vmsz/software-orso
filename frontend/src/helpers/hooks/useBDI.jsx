import { create } from 'zustand'

const useBDI = create(set => ({
  modalOpen: false,
  setModalOpen: modalOpen =>
    set({
      modalOpen: modalOpen,
    }),

  civilWorks: 64437095.43,
  setCivilWorks: civilWorks =>
    set({
      civilWorks: civilWorks,
    }),
  personnelMobilizationMOI: 0,
  setPersonnelMobilizationMOI: personnelMobilizationMOI =>
    set({
      personnelMobilizationMOI: personnelMobilizationMOI,
    }),
  personnelMobilizationMOD: 843,
  setPersonnelMobilizationMOD: personnelMobilizationMOD =>
    set({
      personnelMobilizationMOD: personnelMobilizationMOD,
    }),
  equipmentMobilization: 15,
  setEquipmentMobilization: equipmentMobilization =>
    set({
      equipmentMobilization: equipmentMobilization,
    }),
  centralSite: 0,
  setCentralSite: centralSite =>
    set({
      centralSite: centralSite,
    }),
  advancedSite: 0,
  setAdvancedSite: advancedSite =>
    set({
      advancedSite: advancedSite,
    }),
  spsSite: 0,
  setSpsSite: spsSite =>
    set({
      spsSite: spsSite,
    }),
  siteMaintenance: 0,
  setSiteMaintenance: siteMaintenance =>
    set({
      siteMaintenance: siteMaintenance,
    }),
  localAdministration: 220660.47,
  setLocalAdministration: localAdministration =>
    set({
      localAdministration: localAdministration,
    }),
  personnelDemobilizationMOI: 0,
  setPersonnelDemobilizationMOI: personnelDemobilizationMOI =>
    set({
      personnelDemobilizationMOI: personnelDemobilizationMOI,
    }),
  personnelDemobilizationMOD: 0,
  setPersonnelDemobilizationMOD: personnelDemobilizationMOD =>
    set({
      personnelDemobilizationMOD: personnelDemobilizationMOD,
    }),
  equipmentDemobilization: 0,
  setEquipmentDemobilization: equipmentDemobilization =>
    set({
      equipmentDemobilization: equipmentDemobilization,
    }),

  centralAdministration: 4,
  setCentralAdministration: centralAdministration =>
    set({
      centralAdministration: centralAdministration,
    }),
  financialExpenses: 1.25,
  setFinancialExpenses: financialExpenses =>
    set({
      financialExpenses: financialExpenses,
    }),
  insurance: 1,
  setInsurance: insurance =>
    set({
      insurance: insurance,
    }),
  risks: 0,
  setRisks: risks =>
    set({
      risks: risks,
    }),

  netProfit: 8,
  setNetProfit: netProfit =>
    set({
      netProfit: netProfit,
    }),
  pis: 0.65,
  setPis: pis =>
    set({
      pis: pis,
    }),
  cofins: 3,
  setCofins: cofins =>
    set({
      cofins: cofins,
    }),
  iss: 5,
  setIss: iss =>
    set({
      iss: iss,
    }),
  cprb: 4.5,
  setCprb: cprb =>
    set({
      cprb: cprb,
    }),
  irpj: 1.2,
  setIrpj: irpj =>
    set({
      irpj: irpj,
    }),
  csll: 1.08,
  setCsll: csll =>
    set({
      csll: csll,
    }),

  bdi: 0.3876,
  setBdi: bdi =>
    set({
      bdi: bdi,
    }),
}))

export { useBDI }
