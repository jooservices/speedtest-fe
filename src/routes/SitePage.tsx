import { useState } from 'react'
import { useQuery } from 'react-query'

import { Button, Space, Table, Typography } from 'antd'
import { Row } from 'antd'
import type { TablePaginationConfig, TableProps } from 'antd'
import { getSites } from 'services/siteServices'

const { Title: AntTitle, Text } = Typography

interface DataType {
  key: string
  name: string
  url: string
}

export interface TableParams {
  pagination?: TablePaginationConfig
  // sortField?: SorterResult<any>['field'];
  // sortOrder?: SorterResult<any>['order'];
  // filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'No.',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Status',
    dataIndex: 'url',
    key: 'url',
    render: () => <Text>Active</Text>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Button type='primary'>Check</Button>
      </Space>
    ),
  },
]

export default function SitePage() {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      total: 0,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
  })

  const { data: siteData, isFetching } = useQuery(
    ['siteData', tableParams],
    () => getSites(tableParams),
    {
      select: (data) => {

        if (!data) {
          return {
            total: 0,
            results: [],
          };
        }

        const mappedData = data.results.map((item: any, index: number) => ({
          key: index,
          name: item.name,
          url: item.url,
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
          <AntTitle style={{ margin: 0 }}>Site Page</AntTitle>
        </Space>
      </Row>

      <Row style={{ margin: '12px 0px' }}>
        <Table
          className='w-100'
          dataSource={siteData?.results || []}
          columns={columns}
          pagination={{
            ...tableParams.pagination,
            total: siteData?.total || 0,
          }}
          loading={isFetching}
          onChange={handleTableChange}
        />
      </Row>
    </>
  )
}
