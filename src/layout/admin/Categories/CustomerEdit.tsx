import React from 'react';
import type { FormProps } from 'antd';
import { Button, Input, InputNumber, Form, Row, Col, Breadcrumb } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link, useParams } from 'react-router-dom';

import { useCust } from './utils/customer-hooks';
 // Adjust the path as necessary

type FieldType = {
  name?: string;
  sdt?: number;
  diemth?: string;
};

const CustomerEdit: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, mutate, contextHolder } = useCust(id!);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {contextHolder}
      <div>
        <Breadcrumb
          style={{
            fontSize: "24px",
            margin: "28px 0"
          }}
          items={[
            {
              title: 'Dashboard',
            },
            {
              title: <h1 className="font-bold">Chỉnh sửa khách hàng</h1>,
            },
          ]}
        />
      </div>
      <div className='bg-primary drop-shadow-primary rounded-primary'>
        <h1 className='p-6 text-2xl font-semibold'>Chỉnh sửa khách hàng</h1>

        <Row justify="start" align="top" style={{ minHeight: '100vh', padding: '16px' }}>
          <Col xs={24} sm={18} md={12} lg={8}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: '100%' }}
              initialValues={{ ...data?.data }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label={<div className='font-bold'>Name</div>}
                name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label={<div className='font-bold'>Phone</div>}
                name="sdt"
                rules={[
                  { required: true, message: 'Please input the phone number!' },
                  { type: "number", min: 0, message: "Phone number must be a positive number" }
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item<FieldType>
                name="diemth"
                label={<div className='font-bold'>Điểm thưởng</div>}
              >
                <TextArea />
              </Form.Item>

              <Form.Item style={{ paddingBottom: "24px" }}>
                <Button type="primary" htmlType="submit">
                  Sửa
                </Button>
                <Link to="/admin/customer">
                  <Button type='default' style={{ marginLeft: '8px' }}>Quay lại</Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomerEdit;
