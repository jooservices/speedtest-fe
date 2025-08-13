import React, { useState } from 'react'

import './App.css'
import PageRoutes from './routes'
import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps, Space, theme } from 'antd'

const { Header, Sider, Content } = Layout

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1)

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      type: 'group',
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1
        return {
          key: subKey,
          label: `option${subKey}`,
        }
      }),
    }
  }
)

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '98vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <div style={{ color: 'white' }}>JOO-SPEED</div>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            backgroundColor: 'white',
            marginLeft: 48,
            width: 32,
            height: 32,
          }}
        />
        </Space>

        <Space style={{ marginLeft: 'auto' }}>
          <Button type='primary'>Execute</Button>

          <Button>Login</Button>
        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          trigger={null}
          collapsible
          collapsed={collapsed}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderInlineEnd: 0, paddingTop: 16 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <PageRoutes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
