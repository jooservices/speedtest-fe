import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

import { get } from 'lodash'

import { ClockCircleOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { DatePicker, DatePickerProps, Select, Space, Typography } from 'antd'
import { Col, Row } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import Chart from 'components/Chart'
import MetricCard from 'components/MetricCard'
import Tables from 'components/Tables'
import { getCharts, getLatestDownload, getSpeedtestLatest } from 'services/metricServices'
import { formatSpeed } from 'utils/helper'

const { Title: AntTitle, Text } = Typography

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
)

type unitType = 'bps' | 'kbps' | 'mbps' | 'gbps'

export default function HomePage() {
  const [downloadSpeed, setDownloadSpeed] = React.useState<number>(0)
  const [uploadSpeed, setUploadSpeed] = React.useState<number>(0)
  const [ping, setPing] = React.useState<number>(0)
  const [isCompare, setIsCompare] = React.useState<boolean>(false)
  const [unit, setUnit] = React.useState<unitType>('mbps')

  const { data: latestData } = useQuery(
    'getSpeedtestLatest',
    getSpeedtestLatest
  )

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }
  const { data: chartData } = useQuery('getCharts', getCharts, {
    cacheTime: 1000 * 60 * 30, // cache for 30 mins
    refetchInterval: 1000 * 60 * 30, // refreshes every 30 mins
    refetchOnWindowFocus: false,
    select({ data }) {
      if (!data) {
        return null
      }

      return {
        labels: data.map((item: any) =>
          new Date(item.created_at).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
        downloadData: data.map((item: any) => formatSpeed(item.download_speed, false)),
        uploadData: data.map((item: any) => formatSpeed(item.upload_speed, false)),
        pingData: data.map((item: any) => formatSpeed(item.ping.latency, false)),
      }
    },
  })

  useEffect(() => {
    if (latestData) {
      const downloadSpeed = get(latestData, 'data.download_speed', 0)
      const uploadSpeed = get(latestData, 'data.upload_speed', 0)
      const ping = get(latestData, 'data.ping.latency', 0)
      setDownloadSpeed(downloadSpeed)
      setUploadSpeed(uploadSpeed)
      setPing(ping)
    }
  }, [latestData])

  return (
    <>
      <Row style={{ marginLeft: '8px' }}>
        <Space direction='vertical'>
          <AntTitle style={{ margin: 0 }}>Homepage</AntTitle>
          <Text type='secondary'>Next speed test at: 27 Nov 2022, 22:06</Text>
        </Space>
      </Row>

      <Row style={{ marginLeft: '8px', marginTop: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <DatePicker onChange={onChange} />
        </Space>
        <Space direction='horizontal'>
          <Text type='secondary'>Unit</Text>
          <Select defaultValue={unit} onChange={value => setUnit(value)} style={{ width: 120 }}>
            <Select.Option value='bps'>bps</Select.Option>
            <Select.Option value='kbps'>Kbps</Select.Option>
            <Select.Option value='mbps'>Mbps</Select.Option>
            <Select.Option value='gbps'>Gbps</Select.Option>
          </Select>
        </Space>
      </Row>

      <Row style={{ margin: '12px 0px' }}>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard
            downloadSpeed={downloadSpeed}
            title='Latest download'
            icon={<DownloadOutlined />}
          />
        </Col>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard downloadSpeed={uploadSpeed} title='Latest upload' icon={<UploadOutlined />} />
        </Col>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard downloadSpeed={ping} title='Latest ping' icon={<ClockCircleOutlined />} />
        </Col>
      </Row>

      {!isCompare ? (
        <>
          <Chart
            labels={chartData?.labels}
            actionButton={
              <Space>
                <button
                  onClick={() => {
                    setIsCompare(!isCompare)
                  }}>
                  {isCompare ? 'Combined' : 'Separated'}
                </button>
              </Space>
            }
            downloadChartData={chartData?.downloadData}
            title={'Download'}
          />
          <Chart
            labels={chartData?.labels}
            uploadChartData={chartData?.uploadData}
            title={'Upload'}
          />
        </>
      ) : (
        <Chart
          labels={chartData?.labels}
          actionButton={
            <Space>
              <button
                onClick={() => {
                  setIsCompare(!isCompare)
                }}>
                {isCompare ? 'Combined' : 'Separated'}
              </button>
            </Space>
          }
          downloadChartData={chartData?.downloadData}
          uploadChartData={chartData?.uploadData}
          title={'Download & Upload'}
        />
      )}

      <Chart labels={chartData?.labels} pingChartData={chartData?.pingData} title={'Ping'} />

      <Tables />
    </>
  )
}
