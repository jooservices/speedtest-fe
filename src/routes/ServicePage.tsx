import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { Col, Select, Space, Typography } from 'antd'
import { Row } from 'antd'
import ServiceCard from 'components/ServiceCard'

const { Title: AntTitle } = Typography

export default function ServicePage() {
  const services = [
    {
      name: 'MySql',
      status: 'active',
      lastCheck: "4:00",
    },
    {
      name: 'Postgres',
      status: 'inactive',
      lastCheck: "4:00",
    },
    {
      name: 'Redis',
      status: 'active',
      lastCheck: "4:00",
    },
    {
      name: 'MongoDB',
      status: 'inactive',
      lastCheck: "4:00",
    },
  ]
  const [displayUnit, setDisplayUnit] = React.useState< 'All' | 'Active' | 'Inactive' >('All')

  return (
    <>
      <Row style={{ marginLeft: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <AntTitle style={{ margin: 0 }}>Service Page</AntTitle>
        </Space>
      </Row>

      <Row style={{ marginLeft: '8px', marginTop: '8px', display: 'flex', justifyContent: 'end' }}>
        <Space direction='horizontal'>
          <Select
            defaultValue={displayUnit}
            onChange={value => setDisplayUnit(value)}
            style={{ width: 120 }}>
            <Select.Option value=''>All</Select.Option>
            <Select.Option value='active'>Active</Select.Option>
            <Select.Option value='inactive'>Inactive</Select.Option>
          </Select>
        </Space>
      </Row>

      <Row style={{ margin: '12px 0px' }}>
        {services && services.map((service, index) => (
          <Col span={8} xs={24} sm={12} md={8} key={index}>
            <ServiceCard
              name={service.name}
              status={service.status}
              lastCheck={service.lastCheck}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
