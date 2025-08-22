import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

import { get } from 'lodash'

import { ClockCircleOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, DatePicker, DatePickerProps, Select, Space, Typography } from 'antd'
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
import { getMyIp, getSpeedtest } from 'services/metricServices'
import { formatPing, formatSpeed } from 'utils/helper'

const { Title: AntTitle, Text } = Typography
const { RangePicker } = DatePicker

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

export type unitType = 'bps' | 'Kbps' | 'Mbps' | 'Gbps'

export default function HomePage() {
  const [downloadSpeed, setDownloadSpeed] = React.useState<number>(0)
  const [uploadSpeed, setUploadSpeed] = React.useState<number>(0)
  const [ping, setPing] = React.useState<number>(0)
  const [isCompare, setIsCompare] = React.useState<boolean>(false)
  const [displayUnit, setDisplayUnit] = React.useState<unitType>('Mbps')
  const [chartFilters, setChartFilters] = React.useState({
    orderDir: 'asc',
    from: '',
    to: '',
  })

  const { data: latestData } = useQuery(
    'getSpeedtestLatest',
    () =>
      getSpeedtest({
        orderBy: 'created_at',
        orderDir: 'desc',
        limit: 1,
      }),
    {
      select({ data }) {
        if (!data || !data.length) {
          return null
        }

        return data[0]
      },
    }
  )

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setChartFilters({
      ...chartFilters,
      from: dateString[0],
      to: dateString[1],
    })
  }

  const { data: chartData } = useQuery(
    ['getCharts', chartFilters],
    () => getSpeedtest(chartFilters),
    {
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
          downloadData: data.map((item: any) =>
            formatSpeed(item.download_speed, false, displayUnit, false)
          ),
          uploadData: data.map((item: any) =>
            formatSpeed(item.upload_speed, false, displayUnit, false)
          ),
          pingData: data.map((item: any) =>
            formatPing(item.ping.latency, false, false)
          ),
        }
      },
    }
  )

  const { data: myIp } = useQuery('getMyIp', getMyIp, {
    select({ data }) {
      if (data) {
        return data.ip
      }

      return null
    },
  })

  useEffect(() => {
    if (latestData) {
      const downloadSpeed = get(latestData, 'download_speed', 0)
      const uploadSpeed = get(latestData, 'upload_speed', 0)
      const ping = get(latestData, 'ping.latency', 0)
      setDownloadSpeed(downloadSpeed)
      setUploadSpeed(uploadSpeed)
      setPing(ping)
    }
  }, [latestData])

  return (
    <>
      <Row style={{ marginLeft: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <Text type='secondary'>Your IP: { myIp }</Text>
          <AntTitle style={{ margin: 0 }}>Homepage</AntTitle>
          <Text type='secondary'>Next speed test at: 27 Nov 2022, 22:06</Text>
        </Space>
      </Row>

      <Row style={{ marginLeft: '8px', marginTop: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <RangePicker onChange={onChange} />
        </Space>
        <Space direction='horizontal'>
          <Text type='secondary'>Unit</Text>
          <Select
            defaultValue={displayUnit}
            onChange={value => setDisplayUnit(value)}
            style={{ width: 120 }}>
            <Select.Option value='bps'>bps</Select.Option>
            <Select.Option value='Kbps'>Kbps</Select.Option>
            <Select.Option value='Mbps'>Mbps</Select.Option>
            <Select.Option value='Gbps'>Gbps</Select.Option>
          </Select>
        </Space>
      </Row>

      <Row style={{ margin: '12px 0px' }}>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard
            downloadSpeed={downloadSpeed}
            title='Latest download'
            icon={<DownloadOutlined />}
            formatFunction={speed => formatSpeed(speed, true, displayUnit)}
          />
        </Col>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard
            downloadSpeed={uploadSpeed}
            title='Latest upload'
            icon={<UploadOutlined />}
            formatFunction={speed => formatSpeed(speed, true, displayUnit)}
          />
        </Col>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard
            downloadSpeed={ping}
            title='Latest ping'
            icon={<ClockCircleOutlined />}
            formatFunction={speed => formatPing(speed, true)}
          />
        </Col>
      </Row>

      {!isCompare ? (
        <>
          <Chart
            labels={chartData?.labels}
            actionButton={
              <Space>
                <Button
                  onClick={() => {
                    setIsCompare(!isCompare)
                  }}>
                  {isCompare ? 'Combined' : 'Separated'}
                </Button>
              </Space>
            }
            downloadChartData={chartData?.downloadData}
            title={'Download'}
            displayUnit={displayUnit}
          />
          <Chart
            labels={chartData?.labels}
            uploadChartData={chartData?.uploadData}
            title={'Upload'}
            displayUnit={displayUnit}
            actionButton={
              <Space>
                <Button
                  onClick={() => {
                    setIsCompare(!isCompare)
                  }}>
                  {isCompare ? 'Combined' : 'Separated'}
                </Button>
              </Space>
            }
          />
        </>
      ) : (
        <Chart
          labels={chartData?.labels}
          actionButton={
            <Space>
              <Button
                onClick={() => {
                  setIsCompare(!isCompare)
                }}>
                {isCompare ? 'Combined' : 'Separated'}
              </Button>
            </Space>
          }
          downloadChartData={chartData?.downloadData}
          uploadChartData={chartData?.uploadData}
          title={'Download & Upload'}
          displayUnit={displayUnit}
        />
      )}

      <Chart
        labels={chartData?.labels}
        pingChartData={chartData?.pingData}
        title={'Ping'}
        displayUnit={'ms'}
      />
    </>
  )
}
