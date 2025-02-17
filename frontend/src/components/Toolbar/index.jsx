import { CompositionsModal } from './CompositionsModal'
import { SpreadsheetInfo } from './SpreadsheetInfo'
import { Tabs } from './Tabs'
import { BDIModal } from './BDIModal'
import { DropdownMenu } from './DropdownMenu/Index'

function Toolbar() {
  return (
    <div className='bg-toolbar z-10 flex h-14 shrink-0 items-center justify-between gap-2 rounded-2xl pl-4 pr-8 text-secondary shadow-xl'>
      <Tabs />
      <div className='flex items-center gap-4'>
        <SpreadsheetInfo />
        <CompositionsModal />
        <BDIModal />
        <DropdownMenu />
      </div>
    </div>
  )
}

export { Toolbar }
