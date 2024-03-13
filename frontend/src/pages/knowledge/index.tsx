import React from 'react';
import { Button, Form, Input } from 'antd';
import Nav from "../../layout/navbar";
import Footers from "../../layout/footer";
import { Content } from "antd/es/layout/layout";
import '../style/styleAdmin.css';
import { Card, Table } from "antd";
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { CreateKnowledge } from '../../service/https';
import { Knowledge } from '../../interface';
export default function Knowledges() {

    const [Addform] = Form.useForm();
 
    const onFinish = async (values: Knowledge) => {
    
        let res = await CreateKnowledge(values);
        if (res.status) {  
       
        } else {
    
        }
    };

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'my data',
            dataIndex: 'address',
            key: 'address',
          },
      ];

    return (
        <>
            <Nav/>
                <Content className="content">
                    <Card className="">
                        <Form
                            name="wrap"
                            labelCol={{ flex: '110px' }}
                            labelAlign="left"
                            labelWrap
                            wrapperCol={{ flex: 1 }}
                            colon={false}
                            style={{ maxWidth: 600}}
                            onFinish={onFinish}
                            form={Addform}
                        >
                            <Form.Item 
                                label="Title" 
                                name="Title" // ตัวแปรที่จะส่งไปหลังบ้าน
                                rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item >
                                <Button 
                                    type="primary" 
                                    htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card className="" style={{marginTop:'10px'}}>  
                        <Table 
                            dataSource={dataSource} 
                            columns={columns} />
                    </Card>

                </Content>
            <Footers/>
        </>
    );
}


// แสดงรายการ โดยรวมของ Knowledge ในตาราง
// มีปุ่มการกดสร้างรายการ Knowledge