import { useState } from 'react'
import { useQuery } from 'react-query'

import { Space, Table, Typography } from 'antd'
import { Row } from 'antd'
import type { TablePaginationConfig, TableProps } from 'antd'
import { getIps } from 'services/ipServices'

const { Title: AntTitle, Text } = Typography

interface DataType {
  key: string
  name: string
  url: string
}

export interface TableParams {
  pagination?: TablePaginationConfig
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'No.',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: 'ICP',
    dataIndex: 'icp',
    key: 'icp',
  }
]

export default function IpPage() {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      total: 0,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
  })

  const { data: ipData, isFetching } = useQuery(
    ['ipData', tableParams],
    () => getIps(tableParams),
    {
      select: (data) => {

        if (!data) {
          return {
            total: 0,
            results: [],
          };
        }

        const mappedData = data.map((item: any, index: number) => ({
          key: item.id,
          ip: item.title,
          icp: item.body,
        }))

        return {
          total: data?.count || 0,
          results: mappedData,
        };
      }
    }
  );

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  return (
    <>
      <Row style={{ marginLeft: '8px', justifyContent: 'space-between' }}>
        <Space direction='vertical'>
          <AntTitle style={{ margin: 0 }}>Ip Page</AntTitle>
        </Space>
      </Row>

      <Row style={{ margin: '12px 0px' }}>
        <Table
          className='w-100'
          dataSource={ipData?.results || []}
          columns={columns}
          pagination={{
            ...tableParams.pagination,
            total: ipData?.total || 0,
          }}
          loading={isFetching}
          onChange={handleTableChange}
        />
      </Row>
    </>
  )
}
