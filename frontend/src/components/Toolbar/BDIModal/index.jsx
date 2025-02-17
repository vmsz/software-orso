import { Dialog, DialogPanel } from '@headlessui/react'
import { CostTable } from './CostTable'
import { TaxesTable } from './TaxesTable'
import { FinalTable } from './FinalTable'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import { useBDI } from '../../../helpers/hooks/useBDI'

function BDIModal() {
  const { modalOpen, setModalOpen } = useBDI()

  return (
    <div>
      <button
        className='text-lg font-bold tracking-wider transition-all hover:brightness-responsive'
        onClick={() => setModalOpen(true)}
      >
        BDI
      </button>
      <Dialog
        transition
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className={`fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/40 p-10 font-[Inter] text-primary backdrop-blur-lg transition duration-150 ease-out data-[closed]:opacity-0`}
      >
        <DialogPanel
          className={
            'bg-modal flex h-full max-h-[1020px] w-full max-w-7xl flex-col gap-4 overflow-hidden rounded-xl p-4 shadow-xl'
          }
        >
          <TabGroup className={'flex flex-1 flex-col overflow-hidden'}>
            <TabList className={'rounded-t-lg text-sm'}>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-tl-lg rounded-tr-lg px-5 py-2 transition-all hover:brightness-responsive`}
              >
                Discriminação de Custos
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-tl-lg rounded-tr-lg px-5 py-2 transition-all hover:brightness-responsive`}
              >
                Discriminação de Impostos
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-tl-lg rounded-tr-lg px-5 py-2 transition-all hover:brightness-responsive`}
              >
                Calculo do BDI
              </Tab>
            </TabList>
            <TabPanels className={'flex-1 overflow-hidden'}>
              <TabPanel className={'h-full'}>
                <CostTable />
              </TabPanel>
              <TabPanel className={'h-full'}>
                <TaxesTable />
              </TabPanel>
              <TabPanel className={'h-full'}>
                <FinalTable />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <TabGroup className={'space-y-2'} defaultIndex={0}>
            <TabList className={'flex flex-wrap justify-center text-sm'}>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-xl rounded-tr-lg p-2 transition-all hover:brightness-responsive`}
              >
                BDI e TCU
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-xl rounded-tr-lg p-2 transition-all hover:brightness-responsive`}
              >
                S e G - Seguros, Riscos E Responsabilidades
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-xl rounded-tr-lg p-2 transition-all hover:brightness-responsive`}
              >
                DF - Despesas Financeiras
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-xl rounded-tr-lg p-2 transition-all hover:brightness-responsive`}
              >
                I - Impostos/Tributos
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-xl rounded-tr-lg p-2 transition-all hover:brightness-responsive`}
              >
                AC - Administração Central
              </Tab>
              <Tab
                className={`data-[selected]:bg-modalContainer rounded-xl rounded-tr-lg p-2 transition-all hover:brightness-responsive`}
              >
                LL - Lucro Líquido
              </Tab>
            </TabList>

            <TabPanels className={'bg-modalContainer h-52 rounded-xl'}>
              <TabPanel className={'flex h-full items-center justify-center gap-5'}>
                <div className='bg-modalContainerVariant flex h-fit items-center gap-2 rounded-xl p-4'>
                  <span>BDI =</span>
                  <div className='flex flex-col items-center gap-1'>
                    <span>1 + (AC + DF + S + G + R)</span>
                    <div className='h-0.5 w-full rounded-xl border bg-neutral-500'></div>
                    <span>1 - (1 + L)</span>
                  </div>
                  <span>- 1</span>
                </div>

                <table className='bg-modalContainerVariant overflow-hidden rounded-xl border border-solid text-sm'>
                  <thead>
                    <tr>
                      <th rowSpan='2' className='border-border w-36 border border-solid align-middle'>
                        Tipos de Obra
                      </th>
                      <th colSpan='3' className='border-border border border-solid py-2'>
                        Administração Central
                      </th>
                    </tr>
                    <tr>
                      <th className='border-border w-24 border border-solid py-2'>1º Quartil</th>
                      <th className='border-border w-24 border border-solid py-2'>Médio</th>
                      <th className='border-border w-24 border border-solid py-2'>3º Quartil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border-border border border-solid py-2 text-center align-middle'>
                        Construção de edifícios
                      </td>
                      <td className='border-border border border-solid py-2 text-center align-middle'>3,00%</td>
                      <td className='border-border border border-solid py-2 text-center align-middle'>4,00%</td>
                      <td className='border-border border border-solid py-2 text-center align-middle'>5,50%</td>
                    </tr>
                    <tr>
                      <td className='border-border border border-solid py-2 text-center align-middle'>
                        Construção de rodovias e ferrovias
                      </td>
                      <td className='border-border border border-solid py-2 text-center align-middle'>3,80%</td>
                      <td className='border-border border border-solid py-2 text-center align-middle'>4,01%</td>
                      <td className='border-border border border-solid py-2 text-center align-middle'>4,67%</td>
                    </tr>
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel className={'p-2'}>
                A depender das exigências, natureza e característica do contrato, a somatória deste grupo pode variar de
                1,5% a 4%.
              </TabPanel>
              <TabPanel className={'p-2'}>
                Custo do capital de giro da empresa, para referência, utilizamos um contrato simulado de 12 meses e a
                taxa atual de capital de giro por 90 dias.
              </TabPanel>
              <TabPanel className={'h-full p-2'}>
                <ul className='flex h-full list-disc flex-col justify-between text-balance px-4 max-md:text-xs'>
                  <li>
                    ISS ( municipal) valor definido por cada município, limitado em 5%, utilizamos como referência o
                    valor máximo que representa a maioria dos municipios.
                  </li>
                  <li>
                    PIS (Programa de Integração Social) + CONFINS (Contribuição para Financiamento da Seguridade Social)
                    (federal) adotamos o regime cumulatido como referência PIS = 0,65% e CONFINS = 3,00%, CPRB
                    (Contribuição Previdenciária sobre a Receita Bruta) está vinculado a opção pela redução da
                    contribuição previdenciária patronal de 20%, valor deve ficar entre 1% a 4,5% a dependender da sua
                    atividade e pela opção: CSSL (contribuição social sobre o lucro líquido) - como referência aplicamos
                    12% (serviços industriais) sobre a alicota de 9%
                  </li>
                  <li>IRPJ (Imposto de Renda Pessoa Jurídica) como regra geral adotamos 12% sobre o lucro liquido.</li>
                </ul>
              </TabPanel>
              <TabPanel className={'p-2'}>
                É o rateio do custo do escritório central entre o total de obras da empresa, é orientado pelo TCU o
                valor deve ficar entre 3% e 8%, adotaremos o valor médio da faixa para obras civis 4%.
              </TabPanel>
              <TabPanel className={'p-2'}>
                Resultado entre receita total menos as despesas totais, para obras civis a faixa pode variar entre 8% a
                15%, utilizaremos como referência o valor de 8%.
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </DialogPanel>
      </Dialog>
    </div>
  )
}

export { BDIModal }
