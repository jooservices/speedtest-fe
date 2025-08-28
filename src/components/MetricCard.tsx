import { Card, Space, Typography } from 'antd'

const { Text } = Typography

export default function MetricCard(props: {
  downloadSpeed: number
  title: string
  icon: React.ReactNode
  formatFunction: (speed: number) => string
}) {
  const { downloadSpeed, title, icon, formatFunction } = props

  return (
    <Card className='metric-card'>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className='my-0'>{title}</h2>

        {icon}
      </span>

      <Space size={2} direction='vertical'>
        <h2 className='my-0'>{formatFunction(downloadSpeed)} (latest)</h2>
        <Text className='fs-16' type='secondary'>
          {formatFunction(downloadSpeed)} (avg)
        </Text>
        <Text className='fs-16' type='secondary'>
          {formatFunction(downloadSpeed)} (max)
        </Text>
        <Text className='fs-16' type='secondary'>
          {formatFunction(downloadSpeed)} (min)
        </Text>
      </Space>
    </Card>
  )
}
