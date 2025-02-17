import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { useCompositionModal } from '../../../../helpers/hooks/useCompositionModal'
import { formatToBRL } from '../../../../helpers/functions/formatToBRL'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

function PieChart() {
  const { initialInputs, inputs } = useCompositionModal()

  const datasetSettings = {
    backgroundColor: [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'cyan',
      'Tan',
      'Teal',
      'pink',
      'DarkOliveGreen',
      'SlateGray',
      'RosyBrown',
    ],
    borderWidth: 0.5,
    borderColor: 'DarkGray',
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      tooltip: {
        callbacks: {
          title: ctx => {
            return inputDescription[ctx[0].dataIndex]
          },
          label: function (tooltipItem) {
            return (tooltipItem.formattedValue = formatToBRL(tooltipItem.raw))
          },
        },
      },
    },
  }

  const labels = []
  const inputDescription = []

  let initialData = {
    labels: labels,
    datasets: [
      {
        data: [],
        ...datasetSettings,
      },
    ],
  }

  let data = {
    labels: labels,
    datasets: [
      {
        data: [],
        ...datasetSettings,
      },
    ],
  }

  for (const initialInput of initialInputs) {
    labels.push(initialInput.code)
    inputDescription.push(initialInput.description)
    initialData.datasets[0].data.push(initialInput.resourceTotal * initialInput.cost)
  }

  for (const input of inputs) {
    data.datasets[0].data.push(input.resourceTotal * input.cost)
  }

  return (
    <div className='bg-modalContainer flex h-full w-full'>
      <div className='h-full w-1/2'>
        <Pie
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                display: true,
                text: 'Antes',
                font: {
                  family: 'Inter',
                  size: '16rem',
                },
              },
            },
          }}
          data={initialData}
        />
      </div>
      <div className='h-full w-1/2'>
        <Pie
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                display: true,
                text: 'Depois',
                font: {
                  family: 'Inter',
                  size: '16rem',
                },
              },
            },
          }}
          data={data}
        />
      </div>
    </div>
  )
}

export { PieChart }
