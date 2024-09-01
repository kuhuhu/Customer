import React from 'react';
import { Breadcrumb, Button, Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useCustomers, useDeleteCustomer } from './utils/customer-hooks'; // Adjust path as needed

const CustomerList: React.FC = () => {
  const { data, isLoading, isError } = useCustomers();
  const { mutate: deleteCustomer, contextHolder } = useDeleteCustomer();

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'sdt',
      title: 'Phone',
      dataIndex: 'sdt',
    },
    {
      key: 'diemth',
      title: 'Điểm thưởng',
      dataIndex: 'diemth',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_: any, customer: any) => (
        <>
          <Popconfirm
            title="Are you sure to delete this customer?"
            onConfirm={() => deleteCustomer(customer.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={`/admin/customer/edit/${customer.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
        </>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading customers</div>;

  return (
    <>
      {contextHolder}
      <div className="">
        <Breadcrumb
          style={{
            fontSize: '24px',
            margin: '28px 0',
          }}
          items={[
            {
              title: 'Dashboard',
            },
            {
              title: <h1 className="font-bold">Danh mục</h1>,
            },
          ]}
        />
      </div>
      <div>
        <Link to={`/admin/customer/add`}>
          <Button type='primary'>Add Customer</Button>
        </Link>
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  );
};

export default CustomerList;
