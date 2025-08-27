import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { Button, Card, Row, Space, Typography } from 'antd'

const { Text } = Typography

export default function ServiceCard(props: {
  name?: string
  status?: string
  lastCheck?: string
  time?: string
}) {
  const { name, status, lastCheck, time = '4:00m' } = props

  return (
    <Card className='service-card' style={{ backgroundColor: 'aliceblue' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1>{name}</h1>
          {status == 'active' ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 24, marginLeft: 8 }} />
          ) : (
            <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 24, marginLeft: 8 }} />
          )}
        </div>
        <Button color={status == 'inactive' ? 'red' : 'green'} variant="solid">{status == 'active' ? 'Active' : 'Inactive'}</Button>
      </div>
      <span>Last check {lastCheck} {`(${time} ago)`}</span>
    </Card>
  )
}
