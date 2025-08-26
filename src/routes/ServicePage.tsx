import { useState } from 'react'

import { Select, Space, Typography } from 'antd'
import { Col, Row } from 'antd'
import ServiceCard from 'components/ServiceCard'

const { Title: AntTitle, Text } = Typography

const dummyData = [
  {
    name: 'MySQL',
    status: true,
  },
  {
    name: 'Redis',
    status: false,
  },
  {
    name: 'ElasticSearch',
    status: true,
  },
  {
    name: 'Postgres',
    status: true,
  },
  {
    name: 'Typesense',
    status: true,
  },
]

export default function ServicePage() {
  const [status, setStatus] = useState<string>('')

  return (
    <>
      <Row style={{ marginLeft: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <AntTitle style={{ margin: 0 }}>Service Page</AntTitle>
        </Space>
      </Row>

      <Row style={{ marginLeft: '8px', marginTop: '8px' }}>
        <Space direction='horizontal'>
          <Text type='secondary'>Status</Text>
          <Select defaultValue={status} onChange={value => setStatus(value)} style={{ width: 120 }}>
            <Select.Option value=''>All</Select.Option>
            <Select.Option value='0'>Active</Select.Option>
            <Select.Option value='1'>Inactive</Select.Option>
          </Select>
        </Space>
      </Row>

      <Row style={{ margin: '12px 0px' }}>
        {dummyData.map((item, index) => (
          <Col span={8} xs={24} sm={12} md={8} key={index}>
            <ServiceCard item={item} />
          </Col>
        ))}
      </Row>
    </>
  )
}
