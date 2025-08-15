import { Card, Typography } from 'antd'
import { formatSpeed } from 'utils/helper'

const { Text } = Typography

export default function MetricCard(props: {
  downloadSpeed: number
  title: string
  icon: React.ReactNode
}) {
  const { downloadSpeed, title, icon } = props

  return (
    <Card className='metric-card'>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {icon}

        <Text type='secondary' style={{ marginLeft: 8 }} strong>
          {title}
        </Text>
      </span>

      <h1>{formatSpeed(downloadSpeed)}</h1>
    </Card>
  )
}
