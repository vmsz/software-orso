import { MdKeyboardArrowDown } from 'react-icons/md'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Itemize } from './Itemize'
import { ExportToExcel } from './ExportToExcel'
import { ExportToPDF } from './ExportToPDF'
import { SaveData } from './SaveData'
import { LoadData } from './LoadData'
import { ResetModal } from './ResetModal'
import { ThemeToggler } from './ThemeToggler'

function DropdownMenu() {
  return (
    <div className='relative'>
      <Menu>
        <MenuButton
          className={
            'bg-button border-border rounded-lg border border-solid transition-all data-[open]:rotate-180 hover:brightness-responsive'
          }
        >
          <MdKeyboardArrowDown size={32} />
        </MenuButton>
        <MenuItems
          modal={false}
          transition
          className='border-border bg-menu absolute -right-2 top-12 origin-top space-y-3 rounded-md border border-solid pb-3 pl-2 pr-6 font-[Inter] text-primary shadow-xl transition-all data-[closed]:scale-90 data-[closed]:opacity-0'
        >
          <MenuItem>
            <Itemize type={'allTabs'} />
          </MenuItem>
          <MenuItem>
            <Itemize type={'ownTab'} />
          </MenuItem>
          <MenuItem>
            <ExportToExcel />
          </MenuItem>
          <MenuItem>
            <ExportToPDF />
          </MenuItem>
          <MenuItem>
            <SaveData />
          </MenuItem>
          <MenuItem>
            <LoadData />
          </MenuItem>
          <MenuItem>
            <ResetModal />
          </MenuItem>
          <MenuItem>
            <ThemeToggler />
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}

export { DropdownMenu }
