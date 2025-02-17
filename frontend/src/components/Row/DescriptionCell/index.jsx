import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { spreadsheetConfig } from '../../../helpers/configs/spreadsheetConfig'
import { deselectCell, selectCell, cellHandleOnKeyDown } from '../../../helpers/functions/cellFunctions'
import { useSearchComposition } from '../../../helpers/hooks/useSearchComposition'
import { TbServerOff } from 'react-icons/tb'
import { MenuItem } from './MenuItem'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { PulseLoader } from 'react-spinners'
import { EditIcon } from './EditIcon'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'motion/react'

function DescriptionCell({ column, row, value, setRowData }) {
  const { tabData, activeTab } = useSpreadsheetTabs()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { compositions, compositionsStatus } = useSearchComposition(search, 'description')

  return (
    <div
      className='relative flex-1'
      style={{ minWidth: spreadsheetConfig.description.minWidth }}
      tabIndex={-1}
      onBlur={event => {
        if (event.target.parentElement.parentElement.contains(event.relatedTarget)) {
          return
        }
        setMenuOpen(false)
      }}
    >
      <div className='border-borderSpreadsheet focus-within:border-accent focus-within:bg-cellHovered hover:bg-cellHovered flex h-8 w-full items-center border-b border-r border-solid bg-transparent focus-within:border-2'>
        <IoSearch size={28} className='bg-transparent p-1' color='var(--secondary)' />
        <input
          className='h-full flex-1 cursor-cell text-ellipsis bg-transparent px-1 text-sm font-bold placeholder:text-secondary'
          type='text'
          id={`cell_${column}${row}`}
          data-column={column}
          data-row={row}
          readOnly={true}
          spellCheck={false}
          value={value ? value : search}
          onChange={event => {
            setRowData(null)
            delete tabData[activeTab][row]
            setSearch(event.target.value)
            if (event.target.value) setMenuOpen(true)
          }}
          onDoubleClick={event => {
            selectCell(event)
            if (event.target.value) setMenuOpen(true)
          }}
          onTouchStart={event => {
            selectCell(event)
            if (event.target.value) setMenuOpen(true)
          }}
          onBlur={event => deselectCell(event)}
          onKeyDown={event => cellHandleOnKeyDown(event, row, setRowData, tabData, activeTab, setSearch)}
        />
        {tabData[activeTab]?.[row]?.code?.WWW && tabData[activeTab]?.[row]?.code?.WWW != 0 && <EditIcon row={row} />}
      </div>
      <AnimatePresence>
        {menuOpen && (
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className={`bg-menu border-border absolute z-10 w-full origin-top rounded-b-xl border-b border-l border-r border-solid shadow-xl`}
            >
              {compositionsStatus == 'error' && (
                <div className='flex h-10 w-full items-center justify-center gap-1 px-2 text-sm'>
                  <span>Servidor indisponível, tente novamente mais tarde!</span>
                  <TbServerOff size={24} color='var(--error)' />
                </div>
              )}

              {compositionsStatus == 'pending' && (
                <div className='flex h-10 w-full items-center justify-center px-2 text-sm'>
                  <PulseLoader size={10} margin={3} color='var(--secondary)' />
                </div>
              )}

              {compositionsStatus == 'success' && compositions.length <= 0 && (
                <div className='flex h-10 w-full items-center justify-center gap-1 px-2 text-sm'>
                  <span className='text-error'>Sua pesquisa não retornou resultado!</span>
                </div>
              )}

              {compositionsStatus == 'success' &&
                compositions.length > 0 &&
                compositions.map(composition => {
                  return (
                    <MenuItem
                      key={composition.id}
                      composition={composition}
                      setRowData={setRowData}
                      setMenuOpen={setMenuOpen}
                      row={row}
                    />
                  )
                })}
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </div>
  )
}

export { DescriptionCell }
