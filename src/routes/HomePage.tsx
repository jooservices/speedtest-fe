import React from 'react'
import { Line } from 'react-chartjs-2'

import { Flex, Select } from 'antd'
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
)

export default function HomePage() {
  const labels = [
    '26/11 22:06',
    '27/11 0:06',
    '27/11 2:06',
    '27/11 4:06',
    '27/11 6:06',
    '27/11 8:06',
    '27/11 10:06',
    '27/11 12:06',
    '27/11 14:06',
    '27/11 16:06',
    '27/11 18:06',
    '27/11 20:06',
  ]

  const downloadData = [82, 95, 95, 95, 95, 95, 82, 95, 95, 89, 82, 82]
  const uploadData = [20, 25, 25, 25, 25, 25, 20, 25, 25, 23, 20, 20]

  const averageValue = 90

  const data: ChartData<'line', number[], string> = {
    labels,
    datasets: [
      {
        label: 'Download',
        data: downloadData,
        borderColor: '#00bfff',
        backgroundColor: '#00bfff',
        tension: 0.3,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Average',
        data: labels.map(() => averageValue), // constant horizontal line
        borderColor: 'red',
        borderWidth: 2,
        borderDash: [6, 6],
        fill: false,
        pointRadius: 0, // no points
        tension: 0, // straight line
      },
      {
        label: 'Download',
        data: uploadData,
        borderColor: '#00ff62ff',
        backgroundColor: '#00ff62ff',
        tension: 0.3,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', // Legend at bottom
        labels: { color: '#ffffff' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#333333' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: '#333333' },
      },
    },
  }

  return (
    <div style={{ height: '400px', background: '#111', padding: '20px', borderRadius: '10px' }}>
      <Flex style={{ justifyContent: 'space-between' }}>
        <h2 style={{ color: 'white' }}>Download (Mbps)</h2>
        <Select
          style={{ width: 120 }}
          defaultValue='last24hours'
          options={[
            {
              value: 'last24hours',
              label: 'Last 24h',
            },
          ]}
        />
      </Flex>
      <Line style={{ paddingBottom: '60px' }} data={data} options={options} />
    </div>
  )
}
