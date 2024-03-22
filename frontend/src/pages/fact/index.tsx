import React from 'react';
import { Form, Input } from 'antd';
import Nav from "../../layout/navbar";
import Footer from "../../layout/footer";

const Fact = () => {
  return (
    <div>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 130px)' }}>
        <Form style={{ maxHeight: '650px', overflowY: 'auto', marginTop: '20px', width: '80%', maxWidth: '600px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', fontSize: '1.5em', color: 'red' }}>
            YOUR FACT
          </div>
          <Form.Item label="Fact name1" name="fact1">
            <Input />
          </Form.Item>
          <Form.Item label="Description1" name="description1">
            <Input />
          </Form.Item>
          <Form.Item label="Fact name2" name="fact2">
            <Input />
          </Form.Item>
          <Form.Item label="Description2" name="description2">
            <Input />
          </Form.Item>
          <Form.Item label="Fact name3" name="fact3">
            <Input />
          </Form.Item>
          <Form.Item label="Description3" name="description3">
            <Input />
          </Form.Item>
          <Form.Item label="Fact name4" name="fact4">
            <Input />
          </Form.Item>
          <Form.Item label="Description4" name="description4">
            <Input />
          </Form.Item>
          <Form.Item label="Fact name5" name="fact5">
            <Input />
          </Form.Item>
          <Form.Item label="Description5" name="description5">
            <Input />
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Fact;
