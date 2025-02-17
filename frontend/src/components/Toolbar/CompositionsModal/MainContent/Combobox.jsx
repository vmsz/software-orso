import { IoSearch } from 'react-icons/io5'
import {
  Combobox as HeadlessCombobox,
  ComboboxInput as HeadlessComboboxInput,
  ComboboxOption as HeadlessComboboxOption,
  ComboboxOptions as HeadlessComboboxOptions,
} from '@headlessui/react'
import { useState } from 'react'
import { useCompositionModal } from '../../../../helpers/hooks/useCompositionModal'
import { useSpreadsheetTabs } from '../../../../helpers/hooks/useSpreadsheetTabs'

function Combobox({ searchType }) {
  const [search, setSearch] = useState('')
  const { tabData } = useSpreadsheetTabs()

  let compositions = []
  for (const tab of tabData) {
    compositions = compositions.concat(Object.values(tab).filter(composition => composition.code.WWW != 0))
  }

  let filteredCompositions = compositions.filter(composition => {
    let formattedSearch = search.toLowerCase()
    formattedSearch = formattedSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    if (searchType == 'code') {
      const code =
        composition.code.K + composition.code.TT + composition.code.UU + composition.code.VVV + composition.code.WWW
      let formattedCode = code.toLowerCase()
      formattedCode = formattedCode.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return formattedCode.includes(formattedSearch)
    }

    if (searchType == 'description') {
      let formattedDescription = composition.description.toLowerCase()
      formattedDescription = formattedDescription.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return formattedDescription.includes(formattedSearch)
    }
  })

  filteredCompositions = filteredCompositions.slice(0, 5)

  const {
    code,
    description,
    setCompositionTab,
    setCompositionRow,
    setCode,
    setDescription,
    setUnity,
    setInitialInputs,
    setInputs,
    setAdditionalInfo,
  } = useCompositionModal()

  return (
    <HeadlessCombobox
      value={searchType == 'code' ? code : description}
      onChange={composition => {
        if (composition) {
          setCompositionTab(composition.tab)
          setCompositionRow(composition.row)
          setCode(
            `${composition.code.K}${composition.code.TT}${composition.code.UU}${composition.code.VVV}${composition.code.WWW}`,
          )
          setDescription(composition.description)
          setUnity(composition.unity)
          setInitialInputs(JSON.parse(JSON.stringify(composition.inputs)))
          setInputs(JSON.parse(JSON.stringify(composition.inputs)))
          setAdditionalInfo(composition.additionalInfo)
        }
      }}
    >
      <div className='bg-inputs border-borderVariant flex min-w-64 flex-1 gap-2 rounded-lg border border-solid px-2 py-1 data-[open]:rounded-b-none'>
        <div className='flex items-center gap-2 text-secondary'>
          <IoSearch />
          <span>{searchType == 'code' ? 'Código:' : 'Descrição:'}</span>
        </div>
        <HeadlessComboboxInput
          displayValue={searchType == 'code' ? code : description}
          className={'w-full text-ellipsis whitespace-nowrap bg-transparent transition-all'}
          onChange={event => setSearch(event.target.value)}
          autoComplete='off'
          spellCheck={false}
        />
      </div>
      <HeadlessComboboxOptions
        transition
        anchor={{
          to: 'bottom start',
        }}
        className='border-border bg-inputs w-[calc(var(--input-width)+8px)] origin-top overflow-hidden rounded-b-lg border-b border-l border-r border-solid font-Inter text-primary transition duration-200 ease-out scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-500 empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        {filteredCompositions.length <= 0 && (
          <div className='flex h-10 w-full items-center justify-center gap-1 px-2 text-sm'>
            <span className='text-error'>Sua pesquisa não retornou resultado!</span>
          </div>
        )}

        {filteredCompositions.length > 0 &&
          filteredCompositions.map(composition => (
            <HeadlessComboboxOption
              key={`${composition.tab}_${composition.row}`}
              value={composition}
              className='hover:bg-accent data-[focus]:bg-accent flex w-full cursor-pointer flex-col justify-between rounded-md p-2 text-sm leading-normal transition-all active:scale-90'
            >
              <div className='flex w-full flex-col gap-1'>
                <span className='text-balance'>{composition.description}</span>
                <div className='flex flex-wrap gap-1'>
                  <span className='h-fit text-secondary'>Código:</span>
                  <span>
                    {composition.code.K +
                      ' ' +
                      composition.code.TT +
                      ' ' +
                      composition.code.UU +
                      ' ' +
                      composition.code.VVV +
                      ' ' +
                      composition.code.WWW}
                  </span>
                </div>
                <span className='flex w-full justify-end text-secondary'>
                  {composition.tab}, Linha {composition.row + 1}
                </span>
              </div>
            </HeadlessComboboxOption>
          ))}
      </HeadlessComboboxOptions>
    </HeadlessCombobox>
  )
}

export { Combobox }
