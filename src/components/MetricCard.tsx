import { Card, Typography } from 'antd'

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
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {icon}

        <Text type='secondary' style={{ marginLeft: 8 }} strong>
          {title}
        </Text>
      </span>

      <h1>{formatFunction(downloadSpeed)}</h1>
    </Card>
  )
}
