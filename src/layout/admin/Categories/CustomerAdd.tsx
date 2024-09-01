import React from 'react';
import { Button, Input, InputNumber, Form, Row, Col, Breadcrumb } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import { useCustomerForm } from './utils/customer-hooks'; // Adjust the path as needed

const CustomerAdd: React.FC = () => {
  const { form, loading, onFinish, onFinishFailed, contextHolder } = useCustomerForm();

  return (
    <>
      {contextHolder}
      <div className="">
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
              title: <h1 className="font-bold">Danh mục</h1>,
            },
          ]}
        />
      </div>
      <div className='bg-primary drop-shadow-primary rounded-primary'>
        <h1 className='p-6 text-2xl font-semibold'>Thêm danh mục</h1>
        <Row justify="start" align="top" style={{ minHeight: '100vh', padding: '16px' }}>
          <Col xs={24} sm={18} md={12} lg={8}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: '100%' }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={<div className='font-bold'>Name</div>}
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={<div className='font-bold'>Phone</div>}
                name="sdt"
                rules={[
                  { required: true, message: 'Please input the phone number!' },
                  { type: "number", min: 0, message: "Phone number must be a positive number" }
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                name="diemth"
                label={<div className='font-bold'>Điểm thưởng</div>}
              >
                <TextArea />
              </Form.Item>

              <Form.Item style={{ paddingBottom: "24px" }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Thêm
                </Button>
                <Link to={`/admin/customer`}><Button type='primary'>Quay lại</Button></Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomerAdd;
