import { FaFilePdf } from 'react-icons/fa'
import { useSpreadsheetTabs } from '../../../helpers/hooks/useSpreadsheetTabs'
import { Font, Document, Page, Text, Image, View } from '@react-pdf/renderer'
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table'
import { formatToBRL } from '../../../helpers/functions/formatToBRL'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import logo from '../../../assets/images/logo.png'
import { useBDI } from '../../../helpers/hooks/useBDI'

function ExportToPDF() {
  const { tabData, tabs, activeTab } = useSpreadsheetTabs()
  const { bdi } = useBDI()
  const [loading, setLoading] = useState(false)

  return (
    <button
      className='relative top-1 flex cursor-pointer items-center gap-1 transition-all hover:brightness-responsive active:scale-90'
      onMouseUp={async () => {
        setLoading(true)
        const blob = await pdf(<PDFContent tabData={tabData} tabs={tabs} activeTab={activeTab} bdi={bdi} />).toBlob()
        const url = URL.createObjectURL(blob)

        const response = await fetch(url)
        const blobData = await response.blob()
        const blobUrl = window.URL.createObjectURL(blobData)

        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `${tabs[activeTab]}.pdf`
        link.click()

        url && URL.revokeObjectURL(url)
        setLoading(false)
      }}
    >
      <FaFilePdf size={26} className='shrink-0' />
      <span className='e relative top-0.5 shrink-0 text-sm font-semibold'>Salvar PDF</span>
      <ClipLoader
        size={20}
        color='var(--primary)'
        className={`relative left-1 shrink-0 transition-all ${loading ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />
    </button>
  )
}

export { ExportToPDF }

const PDFContent = ({ tabData, tabs, activeTab, bdi }) => {
  let formattedToPDF = []
  const isItemized = tabData[activeTab]?.[0]?.code?.K == ''

  if (!isItemized) {
    let total = 0
    const compositions = Object.values(tabData[activeTab]).filter(row => row.code.WWW != 0)
    for (const composition of compositions) {
      total += composition.total
    }

    formattedToPDF.push({
      description: tabs[activeTab],
      total: total,
    })
  }

  formattedToPDF = formattedToPDF.concat(Object.values(tabData[activeTab]))

  Font.registerHyphenationCallback(word => {
    return [word]
  })
  return (
    <Document>
      <Page size={'A4'} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }} wrap={false}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 8,
            backgroundColor: '#1d2731',
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 6,
              color: 'white',
            }}
          >
            SOFTWARE ORSO
          </Text>
          <Image src={logo} style={{ height: 10, borderRadius: 1 }} />
        </View>

        <Table
          style={{ overflow: 'hidden', borderRadius: 4 }}
          tdStyle={{
            fontSize: 4,
            border: 0,
            padding: 4,
          }}
          weightings={[
            1.25, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 10, 1.25, 0.75, 0.75, 0.75, 0.75, 0.75, 2, 2, 3, 3,
          ]}
        >
          <TH style={{ backgroundColor: '#1d2731' }}>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Item</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Área</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Sub Área</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Frente</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>K</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>TT</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>UU</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>VVV</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>WWW</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Descrição</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Unidade</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>CMS</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>K</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>TT</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>UU</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Seq</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Quantidade</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Preço</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Total</TD>
            <TD style={{ justifyContent: 'center', color: 'white' }}>Total(BDI)</TD>
          </TH>
          {formattedToPDF.map((item, index) => {
            let itemColor
            if (!item?.code?.K && !item?.code?.TT && !item?.code?.UU && !item?.code?.VVV && !item?.code?.WWW) {
              itemColor = '#b86e00'
            }
            if (
              item?.code?.K != 0 &&
              item?.code?.TT == 0 &&
              item?.code?.UU == 0 &&
              item?.code?.VVV == 0 &&
              item?.code?.WWW == 0
            ) {
              itemColor = '#ff9900'
            }
            if (
              item?.code?.K != 0 &&
              item?.code?.TT != 0 &&
              item?.code?.UU == 0 &&
              item?.code?.VVV == 0 &&
              item?.code?.WWW == 0
            ) {
              itemColor = '#ffcc00'
            }
            if (
              item?.code?.K != 0 &&
              item?.code?.TT != 0 &&
              item?.code?.UU != 0 &&
              item?.code?.VVV == 0 &&
              item?.code?.WWW == 0
            ) {
              itemColor = '#ffff99'
            }
            if (
              item?.code?.K != 0 &&
              item?.code?.TT != 0 &&
              item?.code?.UU != 0 &&
              item?.code?.VVV != 0 &&
              item?.code?.WWW == 0
            ) {
              itemColor = '#ffffcc'
            }
            if (
              item?.code?.K != 0 &&
              item?.code?.TT != 0 &&
              item?.code?.UU != 0 &&
              item?.code?.VVV != 0 &&
              item?.code?.WWW != 0
            ) {
              itemColor = '#ffffff'
            }
            return (
              <TR style={{ backgroundColor: itemColor }} key={index}>
                <TD style={{ justifyContent: 'left' }}>{item?.item}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.wbs?.area}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.wbs?.subArea}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.wbs?.front}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.code?.K}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.code?.TT}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.code?.UU}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.code?.VVV}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.code?.WWW}</TD>
                <TD style={{ justifyContent: 'left' }}>{item?.description}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.unity}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.measurementCriteria?.CMS}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.measurementCriteria?.K}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.measurementCriteria?.TT}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.measurementCriteria?.UU}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.measurementCriteria?.Seq}</TD>
                <TD style={{ justifyContent: 'center' }}>{item?.quantity}</TD>
                <TD style={{ justifyContent: 'center' }}>{formatToBRL(item?.cost)}</TD>
                <TD style={{ justifyContent: 'center' }}>{formatToBRL(item?.total)}</TD>
                <TD style={{ justifyContent: 'center' }}>{formatToBRL(item?.total + item?.total * bdi)}</TD>
              </TR>
            )
          })}
        </Table>
      </Page>
    </Document>
  )
}
