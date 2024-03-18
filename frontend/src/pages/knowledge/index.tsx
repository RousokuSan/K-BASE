import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Modal, Space, Steps } from 'antd';
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
    const [Addform] = Form.useForm();
    const [dataKnowledge, setDataKnowledge] = useState<Knowledge[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [knowledgeId, setKnowledgeId] = useState<number | undefined>(undefined);
    const [knowledgeTitle, setKnowledgeTitle] = useState(""); // เก็บค่าจาก Title of Knowledge Base
    const [deleteId, setDeleteId] = useState<number | undefined>();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // เพิ่ม state สำหรับ Modal การลบข้อมูล
    const [currentStep, setCurrentStep] = useState(0); // เพิ่ม state เพื่อเก็บค่าของ step ปัจจุบัน

    //แจ้งเตือนการเพิ่มลบต่าง ๆ
    const AgreeAddknowledge = async (idknowledgeues: Knowledge) => {
        let res = await CreateKnowledge(idknowledgeues);
        if (res.status) {  
            toast.success("สร้างรายการ Knowledge สำเร็จ");
            getKnowledge();
            Addform.setFieldsValue({
                'Title': undefined 
            });
        } 
    };
    const AgreeDelete = async () => {
        if (deleteId !== undefined) {
            let res = await DeleteKnowledge(deleteId);
            if (res) {
                toast.success("ลบข้อมูลสำเร็จ");
                setDeleteModalVisible(false);
                getKnowledge();
            } 
        }
    };
    const CancelDelete = () => {
        setDeleteModalVisible(false);
    };

    //แสดงค่าในตาราง
    const getKnowledge = async () => {
        let res = await GetKnowledge();
        if (res) {
            setDataKnowledge(res);
        }
    };
    
    useEffect(() => {
        getKnowledge();
    }, []);


    //กดปุ่ม
    const ClickDelete = (idknowledge: Knowledge) => {
        setDeleteId(idknowledge.ID);
        setDeleteModalVisible(true);
    };
    const ClickAddKnowledge = (record: Knowledge) => {
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
        
                  <Button className='addbtn' onClick={() =>ClickAddKnowledge(record)}>  
                      Add Knowledge
                  </Button>
        
                  <Button className='editbtn'>
                      Edit
                  </Button>
        
                  <Button onClick={() => ClickDelete(record)} className='deleteicon'>
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
                            onFinish={AgreeAddknowledge}
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
                        footer={null}>

                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <p>Title: {knowledgeTitle} - ID: {knowledgeId}</p>
                        </div>

                        <Steps current={currentStep}>
                            <Steps.Step title="Step 1" />
                            <Steps.Step title="Step 2" />
                            {/* <Steps.Step title="Step 3" /> */}
                        </Steps>

                        
                        {currentStep === 0 && (
                        <Form style={{ maxHeight: '550px', overflowY: 'auto', marginTop: '20px',maxWidth: '500px' }}>
                             <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: 'red' }}>YOUR RULE</div>
                            <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}label="Fact name1" name="fact1">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Description1" name="description1">
                                <Input />
                                {/* <Input.TextArea />  กรณีที่ต้องการพื้นที่กรอกเยอะ ๆ */}
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
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Fact name4" name="fact4">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Description4" name="description4">
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Fact name5" name="fact5">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Description5" name="description5">
                                <Input/>
                            </Form.Item>
                        </Form>
                    )}
                        {currentStep === 1 && (
                              <Form style={{ maxHeight: '550px', overflowY: 'auto', marginTop: '20px',maxWidth: '500px' }}>
                              <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: 'red' }}>YOUR FACT</div>
                             <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}label="Fact name1" name="fact1">
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
                                 <Input/>
                             </Form.Item>
                             <Form.Item label="Fact name4" name="fact4">
                                 <Input />
                             </Form.Item>
                             <Form.Item label="Description4" name="description4">
                                 <Input/>
                             </Form.Item>
                             <Form.Item label="Fact name5" name="fact5">
                                 <Input />
                             </Form.Item>
                             <Form.Item label="Description5" name="description5">
                                 <Input/>
                             </Form.Item>
                         </Form>
                        )}
                      
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        {currentStep === 1 && (
                            <Button style={{ marginRight: '10px' }} onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
                        )}
                        {currentStep === 0 && (
                            <Button type="primary" style={{ marginRight: '10px' }} onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
                        )}   
                        {currentStep === 0 && (
                            <Button type="primary" style={{ marginRight: '10px' }} onClick={() => setCurrentStep(currentStep + 1)}>Save Fact</Button>
                        )}
                        {currentStep === 0 && (
                            <Button style={{ marginRight: '10px' }} type="primary" onClick={() => setCurrentStep(currentStep + 1)}>Import Fact</Button>
                        )}
                           {currentStep === 1 && (
                            <Button type="primary" style={{ marginRight: '10px' }} onClick={() => setCurrentStep(currentStep + 1)}>Finish</Button>
                        )}
                    </div>
                    </Modal>


                    <Modal
                       visible={deleteModalVisible}
                       onOk={AgreeDelete}
                       confirmLoading={false}
                       onCancel={CancelDelete}
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
