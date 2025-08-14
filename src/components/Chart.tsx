import { Button, Flex } from 'antd'
import { ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'

export default function Chart(props: {
  chartJsData: ChartData<'line'>
  options: any
  isCompare: boolean
  showButtonCompare: boolean
  setIsCompare: (isCompare: boolean) => void
}) {
  const { chartJsData, isCompare, options, setIsCompare, showButtonCompare } = props

  return (
    <div
      className='mt-5'
      style={{ height: '400px', background: '#111', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <Flex style={{ justifyContent: 'space-between' }}>
        <h2 style={{ color: 'white' }}>Download (Mbps)</h2>
        {
          showButtonCompare ? (
            <Button
              onClick={() => setIsCompare(!isCompare)}
              style={{
                fontSize: '16px',
                backgroundColor: 'white',
                marginLeft: 48,
                height: 32,
              }}
            >Compare</Button>
          ) : null
        }
      </Flex>
      <Line style={{ paddingBottom: '60px' }} data={chartJsData} options={options} />
    </div>
  )
}
