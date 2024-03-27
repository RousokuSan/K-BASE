import React, { useState, useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import Footers from "../../layout/footer";
import Nav from "../../layout/navbar";
import { Button, Card, Form, Input, Layout, Modal, Select, Space, message } from "antd";
import { DeleteOutlined } from "@mui/icons-material";
import Table, { ColumnsType } from "antd/es/table";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { CreateFact, GetFact, SearchFact } from "../../service/https";
// import { Fact } from "../../interface";
import { get } from "http";
import { FactInterface } from "../../interface";

export default function CreateFactPage() {
    const [factData, setFactData] = useState<FactInterface[]>([]);
    const [Addform] = Form.useForm();
    const [searchResults, setSearchResults] = useState<FactInterface[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [, contextHolder] = message.useMessage();
    const { Option } = Select;
    let { id } = useParams();

    const onFinish = async (values: FactInterface) => {
        try {
        //   values.KnowledgeID = Number(id);  //ไม่ได้ใช้เพราะไม่มี foren key  
          const res = await CreateFact(values);
      
          if (res.status) {
            GetFact();  //เรียกฟังก์ชั่น getfact จาก Service มาใช้
            Addform.resetFields();
            toast.success("บันทึกข้อมูลสำเร็จ");
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          toast.error("เกิดข้อผิดพลาด ! " + error);
        }
      };

    const handleSearchFact = async (value: string) => {
        setSearchText(value);
    };

    useEffect(() => {
        if (searchText.trim() !== '') {
            handleSearchFact(searchText.trim());
        } else {
            setSearchResults([]);
        }
    }, [searchText]);

    return (
        <>
            <Nav />
            <Content className="content">
                <Card>
                    {contextHolder}
                    <Layout style={{ padding: '10px', marginBottom: '10px' }}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>CREATE FACT</div>
                    </Layout>
                    <Form
                        form={Addform}
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        {[...Array(3)].map((_, index) => (
                            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                                <Form.Item
                                    name={`node${index + 1}`}
                                    label={`Node ${index + 1}`}
                                    rules={[{ required: true, message: 'Please input Node!' }]}
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
                        <Table.Column title="Node 1" dataIndex="node1" key="node1" />
                        <Table.Column title="Node 2" dataIndex="node2" key="node2" />
                        <Table.Column title="Node 3" dataIndex="node3" key="node3" />
                        <Table.Column title="Description 1" dataIndex="description1" key="description1" />
                        <Table.Column title="Description 2" dataIndex="description2" key="description2" />
                        <Table.Column title="Description 3" dataIndex="description3" key="description3" />
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
}
