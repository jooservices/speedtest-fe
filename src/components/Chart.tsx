import { JSX, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

import { Flex } from 'antd'
import { ChartOptions } from 'chart.js'



export default function Chart(props: {
  labels: any
  uploadChartData?: string[]
  downloadChartData?: string[]
  pingChartData?: string[]
  actionButton?: JSX.Element
  title?: string
  displayUnit: string
}) {
  const { actionButton, downloadChartData, uploadChartData, pingChartData, labels, title, displayUnit } = props
  const [chartData, setChartData] = useState<any>({
    labels,
    datasets: [],
  })

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#ffffff' },
      },
      tooltip: {
        callbacks: {
          title: () => '',
          label: (context) => {
            const value = context.raw as number;
            return value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { 
          color: '#ffffff', 
          callback: function (val) {
            const label = this.getLabelForValue(Number(val));
            const [date, time] = label.split(',').map(s => s.trim());
            const now = new Date();
            const [day, month] = date.split('/');
            const [hour, minute] = time.split(':');
            const d = new Date(
              now.getFullYear(),
              Number(month) - 1,
              Number(day),
              Number(hour),
              Number(minute),
              0,
              0
            );

            const pad = (n: number, len = 2) => String(n).padStart(len, '0');
            return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ` +
                  `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
          },
        },
        grid: { color: '#333333' },
      },
      y: {
        ticks: { 
          color: '#ffffff',
        },
        grid: { color: '#333333' },
      },
    },
  }

  useEffect(() => {
    const newChartDataAsset = []
    if (downloadChartData) {
      newChartDataAsset.push({
        label: 'Download',
        data: downloadChartData,
        borderColor: '#00bfff',
        backgroundColor: '#00bfff',
        tension: 0.3,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      })
    }

    if (uploadChartData) {
      newChartDataAsset.push({
        label: 'Upload',
        borderColor: '#00ff62ff',
        backgroundColor: '#00ff62ff',
        data: uploadChartData,
        tension: 0.3,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      })
    }

    if (pingChartData) {
      newChartDataAsset.push({
        label: 'Ping',
        borderColor: '#ff0000ff',
        backgroundColor: '#ff0000ff',
        data: pingChartData,
        tension: 0.3,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
      })
    }

    setChartData({
      labels,
      datasets: newChartDataAsset,
    })
  }, [uploadChartData, downloadChartData, pingChartData, labels])

  return (
    <div
      className='mt-5'
      style={{
        height: '400px',
        background: '#111',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px',
      }}>
      <Flex style={{ justifyContent: 'space-between' }}>
        <h2 style={{ color: 'white' }}>{title} ({displayUnit})</h2>
        {actionButton ? actionButton : null}
      </Flex>
      <Line style={{ paddingBottom: '60px' }} data={chartData} options={options} />
    </div>
  )
}
