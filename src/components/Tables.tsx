import { Table } from 'antd';


export default function Tables(props: {

}) {
const dataSource = [
  {
    key: '1',
    ipAddress: '192.168.1.1',
    createdAt: '2023-01-01',
  },
  {
    key: '2',
    ipAddress: '192.168.1.2',
    createdAt: '2023-01-01',
  },
];

const columns = [
  {
    title: 'IP Address',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];
  
  return (
    <Table dataSource={dataSource} columns={columns} style={{ marginTop: '20px' }}/>
  )
}
