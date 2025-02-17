import { formatToBRL } from '../../../../helpers/functions/formatToBRL'
import { useCompositionModal } from '../../../../helpers/hooks/useCompositionModal'
import { useRef, useEffect } from 'react'

function InputsTable() {
  const { compositionTab, compositionRow, inputs, setInputs } = useCompositionModal()
  const inputsTable = useRef()

  useEffect(() => {
    inputsTable.current.scrollTop = 0
  }, [compositionTab, compositionRow])

  return (
    <div
      className='bg-modalContainerVariant flex h-full flex-col overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-500'
      ref={inputsTable}
    >
      <div className='bg-modalContainer sticky top-0 flex py-2 max-[1245px]:w-fit'>
        <span className='w-28 shrink-0 text-center'>Código</span>
        <span className='min-w-64 flex-1 shrink-0 text-center'>Descrição</span>
        <span className='w-28 shrink-0 text-center'>Unidade</span>
        <span className='w-28 shrink-0 text-center'>Custo</span>
        <span className='w-32 shrink-0 text-center'>Hora Produtiva</span>
        <span className='w-36 shrink-0 text-center'>Quantidade</span>
        <span className='w-36 shrink-0 text-center'>Total de Recurso</span>
      </div>
      {inputs.length > 0 &&
        inputs.map(input => {
          return (
            <div
              key={`${compositionTab}_${compositionRow}_${input.code}`}
              className='border-border flex w-full items-center border-solid py-2 max-[1245px]:w-fit [&:not(:last-child)]:border-b'
            >
              <span className='w-28 shrink-0 text-center'>{input.code}</span>
              <span className='min-w-64 flex-1 shrink-0 text-balance leading-normal'>{input.description}</span>
              <span className='w-28 shrink-0 text-center'>{input.unity}</span>
              <span className='w-28 shrink-0 text-center'>{formatToBRL(input.cost)}</span>
              <span className='w-32 shrink-0 overflow-hidden text-ellipsis text-center'>
                {input.resourceTotal / input.quantity}
              </span>
              <div className='flex w-36 shrink-0 justify-center'>
                <input
                  type='number'
                  className='bg-inputs w-28 rounded-md py-1.5 text-center'
                  value={input.quantity}
                  onChange={event => {
                    const indexOfInput = inputs.indexOf(input)
                    const inputsUpdate = inputs
                    inputsUpdate[indexOfInput].quantity = event.target.value
                    setInputs(inputsUpdate)
                  }}
                />
              </div>
              <div className='flex w-36 shrink-0 justify-center'>
                <input
                  type='number'
                  className='bg-inputs w-28 rounded-md py-1.5 text-center'
                  value={input.resourceTotal}
                  onChange={event => {
                    const indexOfInput = inputs.indexOf(input)
                    const inputsUpdate = inputs
                    inputsUpdate[indexOfInput].resourceTotal = event.target.value
                    setInputs(inputsUpdate)
                  }}
                />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export { InputsTable }
