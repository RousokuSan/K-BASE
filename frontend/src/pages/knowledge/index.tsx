import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Space } from 'antd';
import Nav from "../../layout/navbar";
import Footers from "../../layout/footer";
import { Content } from "antd/es/layout/layout";
import '../style/styleBtn.css';
import { Card, Table, Checkbox } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { CreateKnowledge, DeleteKnowledge, GetKnowledge } from '../../service/https';
import { Knowledge } from '../../interface';
import { DeleteOutlined } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Knowledges() {
    const [Addform] = Form.useForm();
    const [dataKnowledge, setDataKnowledge] = useState<Knowledge[]>([]);
    const [deleteId, setDeleteId] = useState<Number>();
    const [modalText, setModalText] = useState<String>();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [checkedStates, setCheckedStates] = useState<{ [key: number]: boolean }>({}); // เปลี่ยนชื่อตัวแปรเป็น checkedStates

    const onFinish = async (values: Knowledge) => {
        let res = await CreateKnowledge(values);
        if (res.status) {  
            getKnowledge(); 
            Addform.setFieldsValue({
                'Title': undefined 
            });
        } else {
    
        }
    };

    const getKnowledge = async () => {
        let res = await GetKnowledge();
        if (res) {
            setDataKnowledge(res);
            console.log(res)
        }
    };
    
    useEffect(() => {
        getKnowledge();
    }, []);

    const showModal = (val: Knowledge) => {
        setModalText(
            `เมิงจะลบจริง ๆ หรอ คิดดี ๆ นะจ๊ะ`
        );
        setDeleteId(val.ID);
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteKnowledge(deleteId);
        if (res) {
            toast.success("ลบข้อมูลสำเร็จ");
            setOpen(false);
            getKnowledge();
        } else {    
            toast.error("เกิดข้อผิดพลาด ! " + res.message);
            setOpen(false);
        }
        setConfirmLoading(false);
    };
    
    const handleCancel = () => {
        setOpen(false);
    };

    const handleCheckboxChange = (isChecked: boolean, id: number) => {
        setCheckedStates(prevState => ({ ...prevState, [id]: isChecked }));
        let updatedDataKnowledge = dataKnowledge.map(knowledge => {
            if (knowledge.ID === id) {
                return { ...knowledge, State: isChecked ? 1 : 0 }; // อัปเดตค่า State ของแถวที่เปลี่ยนแปลง
            }
            return knowledge;
        });
        setDataKnowledge(updatedDataKnowledge);
    };
    
    const columns: ColumnsType<Knowledge> = [
        {
            title: 'State',
            dataIndex : 'State',
            key: 'State',
            width: '10%',
            align: 'center',
            render: (_, record) => ( // ใช้ _ เนื่องจากไม่ต้องการใช้ค่านี้ในการแสดงผล
                <Checkbox checked={checkedStates[record.ID]} onChange={(e) => handleCheckboxChange(e.target.checked, record.ID)} /> // ใช้ ID เป็นคีย์ในการเข้าถึง state ของ checkbox
            ),
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
        
                  <Button className='addbtn'>
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
                        open={open}
                        onOk={handleOk} 
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        title={<span style={{ color: '#FF4B4B', fontSize:20 }}> คำเตือน !! </span>}
                        style={{fontSize: '16px', minWidth: '400px'}}
                        okText= {<span style={{ color: 'white'}}> ลบข้อมูล </span>}
                        okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                        cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                        cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}
                    >
                        <p>{modalText}</p>
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
