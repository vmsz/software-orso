import { create } from 'zustand'

const useSpreadsheetTabs = create(set => ({
  activeTab: 0,
  setActiveTab: activeTab =>
    set({
      activeTab: activeTab,
    }),

  tabs: ['Guia 1'],
  setTabs: tabs => {
    set({
      tabs: tabs,
    })
  },

  tabScrollIndex: [0],
  setTabScrollIndex: tabScrollIndex =>
    set({
      tabScrollIndex: tabScrollIndex,
    }),

  tabData: [{}],
  setTabData: tabData =>
    set({
      tabData: tabData,
    }),
}))

export { useSpreadsheetTabs }
