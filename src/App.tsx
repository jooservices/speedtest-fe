import React, { useState } from 'react'

import './App.css'
import PageRoutes from './routes'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Button, Layout, Space, theme } from 'antd'
import UserInfo from 'components/UserInfo'
import SideBarContainer from 'containers/SideBarContainer'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { executeSpeedtest } from 'services/metricServices'

const { Header, Content } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const {isLoading, mutate: execute} = useMutation(
    executeSpeedtest,
    {
      onSuccess: () => {
        toast.success('Speedtest executed successfully!')
      },
      onError: (error) => {
        toast.error('Error executing speedtest: ' + error?.message)
      },
    }
  )

  const handleExecuteSpeedtest = () => {
    execute()
  }

  return (
    <Layout style={{ minHeight: '98vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <p className='font-bold' style={{ color: 'white' }}>JOO-SPEED</p>
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
          <Button type='primary' loading={isLoading} onClick={handleExecuteSpeedtest}>Execute</Button>
          
          {/* <UserInfo isAuthenticated />
          <UserInfo isAuthenticated = {false} /> */}
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
