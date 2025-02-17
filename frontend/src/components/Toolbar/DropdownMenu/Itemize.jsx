import { IoList } from 'react-icons/io5'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { useState } from 'react'
import { MdPlaylistAddCheck } from 'react-icons/md'
import { api } from '../../../helpers/configs/api'
import { ClipLoader } from 'react-spinners'

function Itemize({ type }) {
  const { tabs, tabData, setTabData, activeTab, tabScrollIndex, setTabScrollIndex } = useSpreadsheetTabs()
  const [loading, setLoading] = useState(false)

  if (type == 'allTabs') {
    return (
      <button
        className='relative top-4 flex cursor-pointer items-center gap-1 transition-all hover:brightness-responsive active:scale-90'
        onMouseUp={async () => {
          setLoading(true)
          await itemizeTab('allTabs', tabs, tabData, setTabData, tabScrollIndex, setTabScrollIndex, activeTab)
          setLoading(false)
        }}
      >
        <MdPlaylistAddCheck size={32} className='shrink-0' />
        <span className='relative right-0.5 shrink-0 text-sm font-semibold'>Consolidar</span>
        <ClipLoader
          size={20}
          color='var(--primary)'
          className={`relative left-1 shrink-0 transition-all ${loading ? 'visible opacity-100' : 'invisible opacity-0'}`}
        />
      </button>
    )
  }
  if (type == 'ownTab') {
    return (
      <button
        className='relative top-2.5 flex cursor-pointer items-center gap-1 transition-all hover:brightness-responsive active:scale-90'
        onMouseUp={async () => {
          setLoading(true)
          await itemizeTab('ownTab', tabs, tabData, setTabData, tabScrollIndex, setTabScrollIndex, activeTab)
          setLoading(false)
        }}
      >
        <IoList size={26} className='shrink-0' />
        <span className='relative left-0.5 shrink-0 text-sm font-semibold'>Itemizar</span>
        <ClipLoader
          size={20}
          color='var(--text-primary)'
          className={`relative left-1 shrink-0 transition-all ${loading ? 'visible opacity-100' : 'invisible opacity-0'}`}
        />
      </button>
    )
  }
}

export { Itemize }

const itemizeTab = async (type, tabs, tabData, setTabData, tabScrollIndex, setTabScrollIndex, activeTab) => {
  let compositions = []
  let groupings = []

  if (type == 'allTabs') {
    for (const data of tabData) {
      compositions = compositions.concat(Object.values(data).filter(row => row.code.WWW != 0))
    }
  }

  if (type == 'ownTab') {
    compositions = Object.values(tabData[activeTab]).filter(row => row.code.WWW != 0)
  }

  if (compositions.length == 0) {
    return
  }

  for (const composition of compositions) {
    groupings.push({
      K: composition.code.K,
      TT: composition.code.TT,
      UU: composition.code.UU,
      VVV: composition.code.VVV,
    })
    groupings.push({ K: composition.code.K, TT: composition.code.TT, UU: composition.code.UU, VVV: 0 })
    groupings.push({ K: composition.code.K, TT: composition.code.TT, UU: 0, VVV: 0 })
    groupings.push({ K: composition.code.K, TT: 0, UU: 0, VVV: 0 })
  }

  groupings = groupings.filter(
    (value, index, self) =>
      index === self.findIndex(t => t.K === value.K && t.TT == value.TT && t.UU == value.UU && t.VVV == value.VVV),
  )

  groupings = await api
    .post('/grouping/get', {
      groupings: groupings,
    })
    .then(response => response.data)

  const firstLevel = Object.groupBy(
    groupings,
    grouping => grouping.code.K != 0 && grouping.code.TT == 0 && grouping.code.UU == 0 && grouping.code.VVV == 0,
  ).true

  const secondLevel = Object.groupBy(
    groupings,
    grouping => grouping.code.K != 0 && grouping.code.TT != 0 && grouping.code.UU == 0 && grouping.code.VVV == 0,
  ).true

  const thirdLevel = Object.groupBy(
    groupings,
    grouping => grouping.code.K != 0 && grouping.code.TT != 0 && grouping.code.UU != 0 && grouping.code.VVV == 0,
  ).true

  const fourthLevel = Object.groupBy(
    groupings,
    grouping => grouping.code.K != 0 && grouping.code.TT != 0 && grouping.code.UU != 0 && grouping.code.VVV != 0,
  ).true

  let rowCount = 0
  let firstLevelItemCount = 0
  let secondLevelItemCount = 0
  let thirdLevelItemCount = 0
  let fourthLevelItemCount = 0
  let compositionsItemCount = 0

  let consolidatedList = []

  const totalRow = {
    item: '',
    code: {
      K: '',
      TT: '',
      UU: '',
      VVV: '',
      WWW: '',
    },
    description: tabs[activeTab],
    total: getGroupTotal(0, 0, 0, 0, compositions),
  }

  consolidatedList.push(totalRow)

  for (const firstLevelItem of firstLevel) {
    firstLevelItemCount++
    secondLevelItemCount = 0
    rowCount++

    consolidatedList.push({
      item: firstLevelItemCount,
      code: {
        K: firstLevelItem.code.K,
        TT: '000',
        UU: '000',
        VVV: '000',
        WWW: '000',
      },
      description: firstLevelItem.description,
      total: getGroupTotal(
        firstLevelItem.code.K,
        firstLevelItem.code.TT,
        firstLevelItem.code.UU,
        firstLevelItem.code.VVV,
        compositions,
      ),
    })

    for (const secondLevelItem of secondLevel) {
      if (secondLevelItem.code.K == firstLevelItem.code.K) {
        secondLevelItemCount++
        thirdLevelItemCount = 0
        rowCount++

        consolidatedList.push({
          item: `${firstLevelItemCount}.${secondLevelItemCount}`,
          code: {
            K: secondLevelItem.code.K,
            TT: secondLevelItem.code.TT,
            UU: '000',
            VVV: '000',
            WWW: '000',
          },
          description: secondLevelItem.description,
          total: getGroupTotal(
            secondLevelItem.code.K,
            secondLevelItem.code.TT,
            secondLevelItem.code.UU,
            secondLevelItem.code.VVV,
            compositions,
          ),
        })

        for (const thirdLevelItem of thirdLevel) {
          if (thirdLevelItem.code.K == firstLevelItem.code.K && thirdLevelItem.code.TT == secondLevelItem.code.TT) {
            thirdLevelItemCount++
            fourthLevelItemCount = 0
            rowCount++

            consolidatedList.push({
              item: `${firstLevelItemCount}.${secondLevelItemCount}.${thirdLevelItemCount}`,
              code: {
                K: thirdLevelItem.code.K,
                TT: thirdLevelItem.code.TT,
                UU: thirdLevelItem.code.UU,
                VVV: '000',
                WWW: '000',
              },
              description: thirdLevelItem.description,
              total: getGroupTotal(
                thirdLevelItem.code.K,
                thirdLevelItem.code.TT,
                thirdLevelItem.code.UU,
                thirdLevelItem.code.VVV,
                compositions,
              ),
            })

            for (const fourthLevelItem of fourthLevel) {
              if (
                fourthLevelItem.code.K == firstLevelItem.code.K &&
                fourthLevelItem.code.TT == secondLevelItem.code.TT &&
                fourthLevelItem.code.UU == thirdLevelItem.code.UU
              ) {
                fourthLevelItemCount++
                compositionsItemCount = 0
                rowCount++

                consolidatedList.push({
                  item: `${firstLevelItemCount}.${secondLevelItemCount}.${thirdLevelItemCount}.${fourthLevelItemCount}`,
                  code: {
                    K: fourthLevelItem.code.K,
                    TT: fourthLevelItem.code.TT,
                    UU: fourthLevelItem.code.UU,
                    VVV: fourthLevelItem.code.VVV,
                    WWW: '000',
                  },
                  description: fourthLevelItem.description,
                  total: getGroupTotal(
                    fourthLevelItem.code.K,
                    fourthLevelItem.code.TT,
                    fourthLevelItem.code.UU,
                    fourthLevelItem.code.VVV,
                    compositions,
                  ),
                })

                for (const composition of compositions) {
                  if (
                    composition.code.K == firstLevelItem.code.K &&
                    composition.code.TT == secondLevelItem.code.TT &&
                    composition.code.UU == thirdLevelItem.code.UU &&
                    composition.code.VVV == fourthLevelItem.code.VVV
                  ) {
                    compositionsItemCount++
                    rowCount++

                    consolidatedList.push({
                      tab: tabs[activeTab],
                      row: rowCount,

                      item: `${firstLevelItemCount}.${secondLevelItemCount}.${thirdLevelItemCount}.${fourthLevelItemCount}.${compositionsItemCount}`,
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
                      quantity: composition.quantity,
                      cost: composition.cost,
                      total: composition.total,

                      inputs: composition.inputs,
                      additionalInfo: composition.additionalInfo,
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  consolidatedList = Object.assign({}, consolidatedList)

  const updatedTabData = tabData
  updatedTabData[activeTab] = consolidatedList

  const updatedTabScrollIndex = tabScrollIndex
  updatedTabScrollIndex[activeTab] = 0

  setTabScrollIndex(updatedTabScrollIndex)
  return setTabData(updatedTabData)
}

const getGroupTotal = (K, TT, UU, VVV, compositions) => {
  let total = 0

  if (K == 0 && TT == 0 && UU == 0 && VVV == 0) {
    for (const composition of compositions) {
      total = total + composition.total
    }
  }

  if (K != 0 && TT == 0 && UU == 0 && VVV == 0) {
    for (const composition of compositions) {
      if (composition.code.K == K) {
        total = total + composition.total
      }
    }
  }

  if (K != 0 && TT != 0 && UU == 0 && VVV == 0) {
    for (const composition of compositions) {
      if (composition.code.K == K && composition.code.TT == TT) {
        total = total + composition.total
      }
    }
  }

  if (K != 0 && TT != 0 && UU != 0 && VVV == 0) {
    for (const composition of compositions) {
      if (composition.code.K == K && composition.code.TT == TT && composition.code.UU == UU) {
        total = total + composition.total
      }
    }
  }

  if (K != 0 && TT != 0 && UU != 0 && VVV != 0) {
    for (const composition of compositions) {
      if (
        composition.code.K == K &&
        composition.code.TT == TT &&
        composition.code.UU == UU &&
        composition.code.VVV == VVV
      ) {
        total = total + composition.total
      }
    }
  }

  return total
}
