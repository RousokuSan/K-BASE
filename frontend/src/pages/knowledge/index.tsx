import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Modal, Space } from 'antd';
import Nav from "../../layout/navbar";
import Footers from "../../layout/footer";
import { Content } from "antd/es/layout/layout";
import '../style/styleBtn.css';
import { Card, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { CreateKnowledge, DeleteKnowledge, GetKnowledge } from '../../service/https';
import { Knowledge } from '../../interface';
import { DeleteOutlined } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function Knowledges() {
   
    const navigate = useNavigate();
    
    const [Addform] = Form.useForm();
    const [dataKnowledge, setDataKnowledge] = useState<Knowledge[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [knowledgeId, setKnowledgeId] = useState<number | undefined>(undefined);
    const [knowledgeTitle, setKnowledgeTitle] = useState(""); // เก็บค่าจาก Title of Knowledge Base
    const [deleteId, setDeleteId] = useState<number | undefined>();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // เพิ่ม state สำหรับ Modal การลบข้อมูล

  
    const onFinish = async (values: Knowledge) => {
        let res = await CreateKnowledge(values);
        if (res.status) {  
            toast.success("สร้างรายการ Knowledge สำเร็จ");
            getKnowledge();
            Addform.setFieldsValue({
                'Title': undefined 
            });
        } else {
            toast.error("เกิดข้อผิดพลาด ! " + res.message);
        }
    };

    const getKnowledge = async () => {
        let res = await GetKnowledge();
        if (res) {
            setDataKnowledge(res);
        }
    };
    
    useEffect(() => {
        getKnowledge();
    }, []);

    const showModal = (val: Knowledge) => {
        setDeleteId(val.ID);
        setDeleteModalVisible(true);
    };

    const handleOk = async () => {
        if (deleteId !== undefined) {
            let res = await DeleteKnowledge(deleteId);
            if (res) {
                toast.success("ลบข้อมูลสำเร็จ");
                setDeleteModalVisible(false);
                getKnowledge();
            } else {    
                toast.error("เกิดข้อผิดพลาด ! " + res.message);
                setDeleteModalVisible(false);
            }
        } else {
            toast.error("ไม่พบ ID ที่ต้องการลบ");
            setDeleteModalVisible(false);
        }
    };
    
    const handleCancel = () => {
        setDeleteModalVisible(false);
    };

    const handleAddKnowledge = (record: Knowledge) => {
        setKnowledgeId(record.ID);
        setKnowledgeTitle(record.Title);
        setDeleteId(record.ID); // เก็บค่า ID ของรายการที่ต้องการลบ
        setModalVisible(true);
    };

    
    const columns: ColumnsType<Knowledge> = [
       
        {
            title: 'State',
            width: '10%',
            align: 'center',
            render: (record) => (
                <Checkbox checked={record.State === '1'} />
            )
        },
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            width: '10%',
            align: 'center',
        },
        {
            title: 'TITLE OF KNOWLEDGE BASE',
            dataIndex: 'Title',
            key: 'Title',
            width: '50%',
            align: 'center',
        },
        {
            title: 'Data Management',
            width: '40%',
            align: 'center',
            render: (record) => (
                <Space style={{flexWrap: 'wrap', justifyContent: 'center'}}>              
        
                  <Button className='addbtn' onClick={() => handleAddKnowledge(record)}>  
                      Add Knowledge
                  </Button>
        
                  <Button className='editbtn'>
                      Edit
                  </Button>
        
                  <Button onClick={() => showModal(record)} className='deleteicon'>
                    <DeleteOutlined />
                  </Button>
                </Space>
        
              ),
        },
    ];

    return (
        <>
            <Nav/>           
                <Content className="content">                    
                    <Card className="CardCreate">                 
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
                                label={
                                    <div>
                                        <span style={{fontWeight:'bold'}}> 
                                            TITLE OF KNOWLEDGE BASE
                                        </span>
                                    </div>
                                } 
                                labelCol={{span: 24}}
                                name="Title" 
                                rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <div className="btnbox">
                                <Button 
                                    type="primary" 
                                    className="createbtn"
                                    htmlType="submit">
                                    Create Knowledge
                                </Button>
                            </div>
                        </Form>
                    </Card>

                    <Card className="" style={{marginTop:'10px'}}>  
                        <Table 
                            dataSource={dataKnowledge} 
                            columns={columns} 
                            pagination={{pageSize:8}}/>
                    </Card>

                    <Modal
                        visible={modalVisible}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                    >
                        <p>{`Title: ${knowledgeTitle} - ID: ${knowledgeId}`}</p>
                    </Modal>

                    <Modal
                       visible={deleteModalVisible}
                       onOk={handleOk}
                       confirmLoading={false}
                       onCancel={handleCancel}
                       title="คำเตือน !!"
                       okText="ลบข้อมูล"
                       okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                       cancelText="ยกเลิก"
                       cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                      <p>เมิงจะลบจริง ๆ หรือ คิดดี ๆ นะจ๊ะ</p>
                    </Modal>


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
                    theme="light"/> 

                </Content>
            <Footers/>
        </>
    );
}
