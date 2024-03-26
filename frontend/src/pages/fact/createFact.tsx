import React, { useState, useEffect } from 'react';
import { Content } from 'antd/es/layout/layout';
import Footers from '../../layout/footer';
import Nav from '../../layout/navbar';
import { Button, Card, Form, Input, Layout, Table, Space, message } from 'antd';
import { Fact } from '../../interface';
import { DeleteOutlined } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const FactPage = () => {
  const [factData, setFactData] = useState<Fact[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [addForm] = Form.useForm();
  const [, contextHolder] = message.useMessage();

  const onFinish = async (values: Fact) => {
    try {
      const response = await axios.post('/api/fact', values);
      const newFact = response.data;
      setFactData([...factData, newFact]);
      addForm.resetFields();
      toast.success('Fact created successfully');
    } catch (error) {
      console.error('Error creating fact:', error);
      toast.error('Failed to create fact');
    }
  };

  const handleSearchFact = async (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/fact');
        setFactData(response.data);
      } catch (error) {
        console.error('Error fetching facts:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (record: Fact) => {
    try {
      await axios.delete(`/api/fact/${record.ID}`);
      const newData = factData.filter((fact) => fact.ID !== record.ID);
      setFactData(newData);
      toast.success('Fact deleted successfully');
    } catch (error) {
      console.error('Error deleting fact:', error);
      toast.error('Failed to delete fact');
    }
  };

  return (
    <>
      <Nav />
      <Content className="content">
        <Card>
          {contextHolder}
          <Layout style={{ padding: '10px', marginBottom: '10px' }}>
            <div style={{ fontSize: '20px', textAlign: 'center' }}>YOUR FACT</div>
          </Layout>
          <Form
            form={addForm}
            onFinish={onFinish}
            autoComplete="off"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {[...Array(3)].map((_, index) => (
              <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                <Form.Item
                  name={`factName${index + 1}`}
                  label={`Fact ${index + 1}`}
                  rules={[{ required: true, message: 'Please input Fact Name!' }]}
                  style={{ flex: 1, marginRight: '10px !important' }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={`description${index + 1}`}
                  label={`Description ${index + 1}`}
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="" style={{ marginTop: '10px', textAlign: 'center' }} title="FACT LIST">
          <Table dataSource={factData} pagination={{ pageSize: 8 }}>
            <Table.Column title="Fact Name" dataIndex="factName" key="factName" />
            <Table.Column title="Description" dataIndex="description" key="description" />
            <Table.Column
              title="Action"
              dataIndex=""
              key="action"
              render={(record: Fact) => (
                <Space>
                  <Button onClick={() => handleDelete(record)} className="deleteicon">
                    <DeleteOutlined />
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Card>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Content>
      <Footers />
    </>
  );
};

export default FactPage;
