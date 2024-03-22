import React, { useState } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import Navbar from '../../layout/navbar'; 
import Footer from '../../layout/footer'; 

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const RulesForm: React.FC = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      node1: '',
      operator: '',
      node2: '',
      result1: '',
      result2: '',
    },
  ]);

  // คอลัมน์ของตาราง
  const columns = [
    {
      title: 'Node1', 
      dataIndex: 'node1',
      key: 'node1',
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Node2',
      dataIndex: 'node2',
      key: 'node2',
    },
    {
      title: 'Result1',
      dataIndex: 'result1',
      key: 'result1',
    },
    {
      title: 'Result2',
      dataIndex: 'result2',
      key: 'result2',
    },
  ];

  const onFinish = (values: any) => {
    const newData = {
      key: '1',
      node1: values.node1,
      operator: values.operator,
      node2: values.node2,
      result1: values.result1,
      result2: values.result2,
    };
    setDataSource([newData]);
    console.log('Received values:', values);
  };

  return (
    <div> <Navbar /> {/* แสดง Navbar */}
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ padding: '20px', borderRadius: '10px', width: '45%' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'red' }}>
            RULE
          </div>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}>
            <Form.Item name={['node1']} label="Node1" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['operator']} label="Operator" rules={[{ required: true }]}>
              <Select placeholder="OR / AND">
                <Option value="OR">OR</Option>
                <Option value="AND">AND</Option>
              </Select>
            </Form.Item>
            <Form.Item name={['node2']} label="Node2" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['result1']} label="Result1" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['result2']} label="Result2" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ width: '55%' }}>
          {/* แสดงตารางผลลัพธ์ */}
          <h2>Result Table</h2>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
      <div > 
    </div><Footer /> {/* แสดง Footer */} </div>
    </div>
  );
};

export default RulesForm;
