import { Toolbar } from '../components/Toolbar'
import { HeaderItem } from '../components/HeaderItem'
import { spreadsheetConfig } from '../helpers/configs/spreadsheetConfig'
import { Row } from '../components/Row'
import { useSpreadsheetTabs } from '../helpers/hooks/useSpreadsheetTabs'
import { AutoSizer, List } from 'react-virtualized'

function Spreadsheet() {
  return (
    <div className='flex h-full w-full flex-col gap-4 overflow-hidden p-2'>
      <Toolbar />
      <div className='border-borderVariant flex h-full flex-col overflow-hidden rounded-xl border border-solid shadow-xl'>
        <div className='bg-header flex overflow-hidden' id='spreadsheetHeader'>
          <div className='flex h-[64px] w-12 shrink-0' />
          <HeaderItem
            columns={[
              {
                title: 'Item',
                width: spreadsheetConfig.item.width,
              },
            ]}
          />
          <HeaderItem
            mainTitle='EAP'
            columns={[
              {
                title: 'Área',
                width: spreadsheetConfig.wbs.area.width,
              },
              {
                title: 'Sub Área',
                width: spreadsheetConfig.wbs.subArea.width,
              },
              {
                title: 'Frente',
                width: spreadsheetConfig.wbs.front.width,
              },
            ]}
          />
          <HeaderItem
            mainTitle='Código Atividade'
            columns={[
              {
                title: 'K',
                width: spreadsheetConfig.code.K.width,
              },
              {
                title: 'TT',
                width: spreadsheetConfig.code.TT.width,
              },
              {
                title: 'UU',
                width: spreadsheetConfig.code.UU.width,
              },
              {
                title: 'VVV',
                width: spreadsheetConfig.code.VVV.width,
              },
              {
                title: 'WWW',
                width: spreadsheetConfig.code.WWW.width,
              },
            ]}
          />
          <div className='flex-1' style={{ minWidth: spreadsheetConfig.description.minWidth }}>
            <HeaderItem
              columns={[
                {
                  title: 'Descrição da Atividade',
                  width: '100%',
                },
              ]}
            />
          </div>
          <HeaderItem
            columns={[
              {
                title: 'Unidade',
                width: spreadsheetConfig.unity.width,
              },
            ]}
          />
          <HeaderItem
            mainTitle='Critérios de Medição'
            columns={[
              {
                title: 'CMS',
                width: spreadsheetConfig.measurementCriteria.CMS.width,
              },
              {
                title: 'K',
                width: spreadsheetConfig.measurementCriteria.K.width,
              },
              {
                title: 'TT',
                width: spreadsheetConfig.measurementCriteria.TT.width,
              },
              {
                title: 'UU',
                width: spreadsheetConfig.measurementCriteria.UU.width,
              },
              {
                title: 'Seq',
                width: spreadsheetConfig.measurementCriteria.Seq.width,
              },
            ]}
          />
          <HeaderItem
            columns={[
              {
                title: 'Quantidade',
                width: spreadsheetConfig.quantity.width,
              },
            ]}
          />
          <HeaderItem
            columns={[
              {
                title: 'Preço',
                width: spreadsheetConfig.cost.width,
              },
            ]}
          />
          <HeaderItem
            columns={[
              {
                title: 'Total',
                width: spreadsheetConfig.total.width,
              },
            ]}
          />
          <HeaderItem
            columns={[
              {
                title: 'Total (BDI)',
                width: spreadsheetConfig.bdi.width,
              },
            ]}
          />
          <div className='flex h-[64px] w-[15px] shrink-0' />
        </div>
        <RowRenderer />
      </div>
    </div>
  )
}

export { Spreadsheet }

const RowRenderer = () => {
  const { activeTab, tabScrollIndex } = useSpreadsheetTabs()

  return (
    <div className='w-full flex-1'>
      <AutoSizer>
        {({ width, height }) => (
          <List
            id={'spreadsheetVirtualizedList'}
            key={`${Math.random()}${Math.random()}${Math.random()}${Math.random()}${Math.random()}`}
            className='scrollbar-track-header scrollbar-thumb-secondary scrollbar'
            width={width}
            height={height}
            rowCount={10000}
            rowHeight={32}
            onRowsRendered={() => {
              const spreadsheetVirtualizedList = document.getElementById('spreadsheetVirtualizedList')
              const spreadsheetVirtualizedSubList = spreadsheetVirtualizedList.childNodes[0]
              const spreadsheetHeader = document.getElementById('spreadsheetHeader')

              spreadsheetVirtualizedSubList.style.overflow = 'visible'

              spreadsheetVirtualizedList.scrollTop = tabScrollIndex[activeTab]

              spreadsheetHeader.scrollLeft = spreadsheetVirtualizedList.scrollLeft

              spreadsheetVirtualizedList.addEventListener('scroll', () => {
                tabScrollIndex[activeTab] = spreadsheetVirtualizedList.scrollTop
                spreadsheetHeader.scrollLeft = spreadsheetVirtualizedList.scrollLeft
              })
            }}
            rowRenderer={({ key, index, style }) => (
              <div key={key} style={style}>
                <Row row={index} />
              </div>
            )}
          />
        )}
      </AutoSizer>
    </div>
  )
}
