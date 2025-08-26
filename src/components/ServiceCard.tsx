import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { Button, Card, Col, Row, Typography } from 'antd'

const { Text } = Typography

export default function ServiceCard(props: { item: { name: string; status: boolean } }) {
  const { item } = props

  const checkServiceStatus = (name: string) => {
    console.log(name)
  }

  return (
    <Card className='metric-card'>
      <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          {item.status ? (
            <CheckCircleTwoTone className='fs-24' twoToneColor='#52c41a' />
          ) : (
            <CloseCircleTwoTone className='fs-24' twoToneColor='#ff4d4f' />
          )}
          <Text type='secondary' style={{ marginLeft: 8 }} strong>
            {item.name}
          </Text>
        </Col>

        <Button type='primary' onClick={() => checkServiceStatus(item.name)}>
          Check
        </Button>
      </Row>

      <Text type='secondary' style={{ marginLeft: 8 }}>
        Last checked at: 2025-12-30
      </Text>
    </Card>
  )
}
