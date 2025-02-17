import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { useCompositionModal } from '../../../../helpers/hooks/useCompositionModal'
import { formatToBRL } from '../../../../helpers/functions/formatToBRL'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function BarChart() {
  const { initialInputs, inputs } = useCompositionModal()

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        ticks: {
          callback: value => {
            return formatToBRL(value)
          },
        },
      },
    },

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

  const inputDescription = []

  let data = {
    labels: [],
    datasets: [
      {
        label: 'Antes',
        data: [],
        backgroundColor: '#212121',
      },
      {
        label: 'Depois',
        data: [],
        backgroundColor: 'darkgreen',
      },
    ],
  }

  for (const initialInput of initialInputs) {
    inputDescription.push(initialInput.description)
    data.labels.push(initialInput.code)
    data.datasets[0].data.push(initialInput.resourceTotal * initialInput.cost)
  }

  for (const input of inputs) {
    data.datasets[1].data.push(input.resourceTotal * input.cost)
  }

  return (
    <div className='bg-modalContainer flex h-full w-full'>
      <Bar options={options} data={data} />
    </div>
  )
}

export { BarChart }
