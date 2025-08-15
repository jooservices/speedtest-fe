import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BarChartOutlined, DashboardOutlined, HomeOutlined } from '@ant-design/icons'
import { Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'

export default function SideBarContainer({ isCollapsed }: { isCollapsed?: boolean }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const selectedKeys = location.pathname.split('/').filter(item => item)

  return (
    <Sider
      width={200}
      style={{ background: colorBgContainer }}
      trigger={null}
      collapsible
      collapsed={isCollapsed}>
      <Menu
        mode='inline'
        defaultSelectedKeys={selectedKeys.length ? selectedKeys : ['home']}
        style={{ height: '100%', borderInlineEnd: 0, paddingTop: 16 }}
        items={[
          {
            key: `home`,
            icon: <HomeOutlined />,
            label: <Link to={'/'}>Home</Link>,
          },
          {
            key: `dashboard`,
            icon: <DashboardOutlined />,
            label: <Link to={'/dashboard'}>Dashboard</Link>,
          },
          {
            key: `chart`,
            icon: <BarChartOutlined />,
            label: <Link to={'/chart'}>Chart</Link>,
          },
        ]}
      />
    </Sider>
  )
}
