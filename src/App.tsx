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
import { Button, Layout, MenuProps, Space, theme } from 'antd'
import UserInfo from 'components/UserInfo'
import SideBarContainer from 'containers/SideBarContainer'

const { Header, Content } = Layout

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
          
          <UserInfo isAuthenticated />
          <UserInfo isAuthenticated = {false} />
        </Space>
      </Header>
      <Layout>
        <SideBarContainer isCollapsed={collapsed} />
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
