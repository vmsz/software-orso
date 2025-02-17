import { useCompositionModal } from '../../../../helpers/hooks/useCompositionModal'
import { Combobox } from './Combobox'
import ImgPlaceholder from '../../../../assets/images/img.webp'
import { FiUpload } from 'react-icons/fi'
import { formatToBRL } from '../../../../helpers/functions/formatToBRL'

function MainContent() {
  const { unity, inputs, additionalInfo, setAdditionalInfo } = useCompositionModal()

  let teamProduction
  let work
  let teamCost
  let cost

  if (inputs.length > 0) {
    teamProduction = 0
    work = 0
    teamCost = 0
    cost = 0

    const IHInputs = inputs.filter(input => input.code.includes('IH'))

    if (IHInputs.length > 0) {
      const highestResourceTotalIHInput = IHInputs.reduce((maxIndex, obj, index, arr) => {
        return obj.resourceTotal > arr[maxIndex].resourceTotal ? index : maxIndex
      }, 0)

      teamProduction = parseFloat(
        1 / (IHInputs[highestResourceTotalIHInput].resourceTotal / IHInputs[highestResourceTotalIHInput].quantity),
      )

      for (const IHInput of IHInputs) {
        work += parseFloat(IHInput.resourceTotal)
        teamCost += parseFloat(IHInput.cost * IHInput.resourceTotal)
      }

      teamCost = parseFloat(teamCost / work)
    }

    for (const input of inputs) {
      cost += parseFloat(input.cost * input.resourceTotal)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <div className='flex w-full flex-wrap gap-2'>
          <Combobox searchType={'code'} />
          <Combobox searchType={'description'} />
        </div>
        <div className='bg-inputs border-borderVariant inline-flex w-32 items-center gap-1 rounded-md border border-solid p-2'>
          <span className='whitespace-nowrap text-secondary'>Unidade:</span>
          <span className='flex-1 text-ellipsis text-nowrap bg-transparent'>{unity}</span>
        </div>
      </div>

      <div className='flex w-full gap-2'>
        <div className='w-full space-y-4'>
          <div className='flex w-full flex-wrap gap-2'>
            <div className='bg-inputs border-borderVariant h-fit flex-1 items-center space-x-1 rounded-md border border-solid p-2'>
              <span className='whitespace-nowrap text-secondary'>Trabalho:</span>
              <span className='flex-1 text-ellipsis text-nowrap bg-transparent'>{work}</span>
            </div>
            <div className='bg-inputs border-borderVariant h-fit flex-1 items-center space-x-1 rounded-md border border-solid p-2'>
              <span className='whitespace-nowrap text-secondary'>Produção Equipe:</span>
              <span className='flex-1 text-ellipsis text-nowrap bg-transparent'>{teamProduction}</span>
            </div>
            <div className='bg-inputs border-borderVariant h-fit flex-1 items-center space-x-1 rounded-md border border-solid p-2'>
              <span className='whitespace-nowrap text-secondary'>Custo Equipe:</span>
              <span className='flex-1 text-ellipsis text-nowrap bg-transparent'>{formatToBRL(teamCost)}</span>
            </div>
            <div className='bg-inputs border-borderVariant h-fit flex-1 items-center space-x-1 rounded-md border border-solid p-2'>
              <span className='whitespace-nowrap text-secondary'>Custo Total:</span>
              <span className='flex-1 text-ellipsis text-nowrap bg-transparent'>{formatToBRL(cost)}</span>
            </div>
          </div>

          <textarea
            id='messageTextArea'
            placeholder='Informações adicionais...'
            className='bg-inputs border-borderVariant h-[120px] w-full resize-none rounded-lg border border-solid p-2 placeholder:text-secondary'
            value={additionalInfo}
            onChange={event => setAdditionalInfo(event.target.value)}
          />
        </div>

        <div className='flex h-fit flex-col items-center justify-center gap-3'>
          <div
            className='h-[112px] w-[200px] shrink-0 rounded-xl bg-cover'
            style={{ backgroundImage: `url("${ImgPlaceholder}")` }}
          />
          <label
            htmlFor='compositionImgInput'
            className='bg-inputs flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 transition-all hover:brightness-responsive active:scale-90'
          >
            <FiUpload size={18} />
            <span>Enviar Imagem</span>
          </label>
          <input type='file' id='compositionImgInput' className='hidden' />
        </div>
      </div>
    </div>
  )
}

export { MainContent }
