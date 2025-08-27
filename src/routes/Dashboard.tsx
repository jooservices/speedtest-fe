import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

import { get } from 'lodash'

import { unitType } from './HomePage'
import { DownloadOutlined, StockOutlined, UploadOutlined } from '@ant-design/icons'
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
import { getMyIp, getSpeedtest, getSpeedtestByDate } from 'services/metricServices'
import { formatPing, formatSpeed } from 'utils/helper'
import BarBasic from 'components/BarBasic'
import dayjs from 'dayjs'

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

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

export default function Dashboard() {
  const [downloadSpeed, setDownloadSpeed] = React.useState<number>(0)
  const [uploadSpeed, setUploadSpeed] = React.useState<number>(0)
  const [ping, setPing] = React.useState<number>(0)
  const [isCompare, setIsCompare] = React.useState<boolean>(false)
  const [isCompareMinMax, setIsCompareMinMax] = React.useState<boolean>(false)
  const [displayUnit, setDisplayUnit] = React.useState<unitType>('Mbps')
  const [chartFilters, setChartFilters] = React.useState({
    orderDir: 'asc',
    from: today.toISOString().slice(0, 10),
    to: tomorrow.toISOString().slice(0, 10),
  })

  const { data: latestData, refetch: refetchLastestData } = useQuery(
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

  const { data: chartData, refetch: refetchChartData } = useQuery('getCharts', () => getSpeedtest(chartFilters), {
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
        pingData: data.map((item: any) => formatPing(item.ping.latency, false, false)),
      }
    },
  })

  const { data: minMaxData, refetch: refetchMinMaxData } = useQuery(
    'getSpeedtestByDate',
    () =>
      getSpeedtestByDate({
        ...chartFilters,
      }),
    {
      select({ data }) {
        if (!data || !data.length) {
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
          maxDownloadSpeed: data.map((item: any) =>
            formatSpeed(item.max_download_speed, false, displayUnit, false)
          ),
          maxUploadSpeed: data.map((item: any) =>
            formatSpeed(item.max_upload_speed, false, displayUnit, false)
          ),
          maxPacketLoss: data.map((item: any) =>
            formatSpeed(item.max_packet_loss, false, displayUnit, false)
          ),
          minDownloadSpeed: data.map((item: any) =>
            formatSpeed(item.min_download_speed, false, displayUnit, false)
          ),
          minUploadSpeed: data.map((item: any) => 
            formatSpeed(item.min_upload_speed, false, displayUnit, false)
          ),
          minPacketLoss: data.map((item: any) =>
            formatSpeed(item.min_packet_loss, false, displayUnit, false)
          ),
          averageDownloadSpeed: data.map((item: any) =>
            formatSpeed(item.average_download_speed, false, displayUnit, false)
          ),
          averageUploadSpeed: data.map((item: any) =>
            formatSpeed(item.average_upload_speed, false, displayUnit, false)
          ),
          averagePacketLoss: data.map((item: any) =>
            formatSpeed(item.average_packet_loss, false, displayUnit, false)
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

  useEffect(() => {
    if (chartFilters) {
      refetchChartData()
      refetchLastestData()
      refetchMinMaxData()
    }
  }, [chartFilters])

  return (
    <>
      <Row style={{ marginLeft: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <AntTitle style={{ margin: 0 }}>Dashboard</AntTitle>
          <Text type='secondary'>Next speed test at: 27 Nov 2022, 22:06</Text>
        </Space>

          <Text type='secondary'>Your IP: { myIp }</Text>
      </Row>

      <Row style={{ marginLeft: '8px', marginTop: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <RangePicker 
            defaultValue={[dayjs(), dayjs().add(1, 'day')]}
            onChange={onChange} 
          />
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
            <Select.Option value='Bps'>Bps</Select.Option>
            <Select.Option value='KBps'>KBps</Select.Option>
            <Select.Option value='MBps'>MBps</Select.Option>
            <Select.Option value='GBps'>GBps</Select.Option>
          </Select>
        </Space>
      </Row>

      <Row style={{ margin: '12px 0px' }}>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard
            downloadSpeed={downloadSpeed}
            title='Download'
            icon={<DownloadOutlined className='fs-24' style={{ color: 'blue' }} />}
            formatFunction={speed => formatSpeed(speed, true, displayUnit)}
          />
        </Col>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard
            downloadSpeed={uploadSpeed}
            title='Upload'
            icon={<UploadOutlined className='fs-24' style={{ color: 'green' }} />}
            formatFunction={speed => formatSpeed(speed, true, displayUnit)}
          />
        </Col>
        <Col span={8} xs={24} sm={12} md={8}>
          <MetricCard
            downloadSpeed={ping}
            title='Ping'
            icon={<StockOutlined className='fs-24'  style={{ color: 'red' }} />}
            formatFunction={speed => formatPing(speed, true)}
          />
        </Col>
      </Row>

      <Row style={{ margin: '12px 0px' }}>  
        <Col span={12} xs={24} sm={24} md={12} style={{ paddingRight: '6px' }}>
          <Chart
            labels={chartData?.labels}
            downloadChartData={chartData?.downloadData}
            uploadChartData={chartData?.uploadData}
            title={'Download & Upload'}
            displayUnit={displayUnit}
          />
        </Col>
        <Col span={12} xs={24} sm={24} md={12} style={{ paddingLeft: '6px' }}>
          <Chart
            labels={chartData?.labels}
            pingChartData={chartData?.pingData}
            title={'Ping'}
            displayUnit={'ms'}
          />
        </Col>
      </Row>

      <Row style={{ margin: '12px 0px' }}>  
        <Col span={12} xs={24} sm={24} md={12} style={{ paddingRight: '6px' }}>
          <BarBasic 
            labels={minMaxData?.labels} 
            datasets={[
              { label: "Download", data: minMaxData?.averageDownloadSpeed, backgroundColor: "#00bfff" },
              { label: "Upload", data: minMaxData?.averageUploadSpeed, backgroundColor: "#00ff62ff" },
            ]} 
            height={360}  
            title="Average Download & Upload" 
            displayUnit = {displayUnit}
          />
        </Col>
        <Col span={12} xs={24} sm={24} md={12} style={{ paddingLeft: '6px' }}>
          <BarBasic 
            labels={minMaxData?.labels} 
            datasets={[
              { label: "Ping", data: minMaxData?.averageDownloadSpeed, backgroundColor: "#ff0000ff" },
            ]} 
            height={360}  
            title="Average Ping" 
            displayUnit = {displayUnit}
          />
        </Col>
      </Row>

      <Row style={{ margin: '12px 0px' }}>  
        <Col span={12} xs={24} sm={24} md={12} style={{ paddingRight: '6px' }}>
          <BarBasic 
            labels={minMaxData?.labels} 
            datasets={[
              { label: "Max Download", data: minMaxData?.maxDownloadSpeed, backgroundColor: "#00bfff" },
              { label: "Min Download", data: minMaxData?.maxUploadSpeed, backgroundColor: "#00ff62ff" },
              { label: "Max Upload", data: minMaxData?.minDownloadSpeed, backgroundColor: "#4447eaff" },
              { label: "Min Upload", data: minMaxData?.minUploadSpeed, backgroundColor: "#ead640ff" },
            ]} 
            height={360}  
            title="Max & Min" 
            displayUnit = {displayUnit}
          />
        </Col>
        <Col span={12} xs={24} sm={24} md={12} style={{ paddingLeft: '6px' }}>
          <BarBasic 
            labels={minMaxData?.labels} 
            datasets={[
              { label: "Max", data: minMaxData?.maxPacketLoss, backgroundColor: "#ff0000ff" },
              { label: "Min", data: minMaxData?.minPacketLoss, backgroundColor: "#d6f511ff" },
            ]} 
            height={360}  
            title="Max & Min Ping" 
            displayUnit = {displayUnit}
          />
        </Col>
      </Row>
    </>
  )
}
