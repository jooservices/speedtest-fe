import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  DashboardOutlined,
  LockOutlined,
  LoginOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Modal,
  Space,
  Tooltip,
  Typography,
  message,
  theme,
} from 'antd'

type User = {
  fullName?: string
  initials?: string // ví dụ: "SG"
}

type Props = {
  user?: User | null
  isAuthenticated: boolean
  onSignOut?: () => Promise<void> | void
}

const UserInfo: React.FC<Props> = ({ user, isAuthenticated, onSignOut }) => {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpenModal(true)
  }

  const initials = user?.initials || (user?.fullName ? user.fullName[0] : 'U')

  const handleLogout = async () => {
    try {
      // clear token & điều hướng
      localStorage.removeItem('token')
      await onSignOut?.()
      message.success('Logged out')
      navigate('/login')
    } catch {
      message.error('Logout failed')
    }
  }

  const items = useMemo<MenuProps['items']>(() => {
    if (!isAuthenticated) {
      return [
        {
          key: 'login',
          icon: <LoginOutlined />,
          label: <Link to='/login'>Login</Link>,
        },
      ]
    }
    return [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <Link to='/profile'>Profile</Link>,
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: <Link to='/settings'>Settings</Link>,
      },
      {
        type: 'divider',
      },
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <Link to='/dashboard'>Dashboard</Link>,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <PoweroffOutlined />,
        danger: true,
        label: 'Logout',
      },
    ]
  }, [isAuthenticated])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      handleLogout()
    }
    setOpen(false)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
      setOpenModal(false)
    }, 1500)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpenModal(false)
  }

  return (
    <>
      {isAuthenticated ? (
        <Dropdown
          trigger={['click']}
          placement='bottomRight'
          open={open}
          onOpenChange={setOpen}
          dropdownRender={menu => (
            <div style={{ minWidth: 220 }}>{React.cloneElement(menu as React.ReactElement)}</div>
          )}
          menu={{ items, onClick }}>
          <Avatar size={32} style={{ backgroundColor: token.colorSuccess, cursor: 'pointer' }}>
            {initials}
          </Avatar>
        </Dropdown>
      ) : (
        <Tooltip title='Login'>
          <Avatar
            size={32}
            icon={<LoginOutlined />}
            style={{
              backgroundColor: '#52c41a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setOpenModal(true)}
          />
        </Tooltip>
      )}
      <Modal
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            Login
          </Typography.Title>
        }
        open={openModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText='Login'
        okButtonProps={{
          icon: (
            <LoginOutlined
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ),
        }}>
        <Form layout='vertical' name='loginForm' initialValues={{ remember: true }}>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input prefix={<UserOutlined />} placeholder='Enter username' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder='Enter password' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserInfo
