import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BarChartOutlined, BlockOutlined, CustomerServiceOutlined, DashboardOutlined, HomeOutlined } from '@ant-design/icons'
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
        defaultSelectedKeys={selectedKeys.length ? selectedKeys : ['dashboard']}
        style={{ height: '100%', borderInlineEnd: 0, paddingTop: 16 }}
        items={[
          // {
          //   key: `dashboard`,
          //   icon: <HomeOutlined />,
          //   label: <Link to={'/'}>Dashboard</Link>,
          // },
          {
            key: `dashboard`,
            icon: <DashboardOutlined />,
            label: <Link to={'/'}>Dashboard</Link>,
          },
          {
            key: `ip`,
            icon: <BarChartOutlined />,
            label: <Link to={'/ip'}>Ip</Link>,
          },
          {
            key: `service`,
            icon: <CustomerServiceOutlined />,
            label: <Link to={'/service'}>Service</Link>,
          },
          {
            key: `site`,
            icon: <BlockOutlined />,
            label: <Link to={'/site'}>Site</Link>,
          },
        ]}
      />
    </Sider>
  )
}
