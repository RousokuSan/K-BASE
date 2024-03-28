import React, { useState, useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import Footers from "../../layout/footer";
import Nav from "../../layout/navbar";
import { Button, Card, Form, Layout, Modal, Select, Space, message } from "antd";
import { Fact, Knowledge, OperatorInterface, RuleInterface } from "../../interface";
import { DeleteOutlined, EditSharp} from "@mui/icons-material";
import Table, { ColumnsType } from "antd/es/table";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { CreateRule, DeleteRule, GetKnowledgeByID, GetOperator, GetRuleById, SearchFact } from "../../service/https";


export default function CreateRulesPage() {

    const [dataRule, setDataRule] = useState<RuleInterface[]>([]);
    const [dataOperater, setDataOperator] = useState<OperatorInterface[]>([]);
    let { id } = useParams();
    const [Addform] = Form.useForm();
    const {Option} = Select;
    const [dataKnowledge, setDataKnowledge] = useState<Knowledge[]>([]);
    const [, contextHolder] = message.useMessage();

    const onFinish = async (values: RuleInterface) => {
        try {
          values.KnowledgeID = Number(id);
          const res = await CreateRule(values);
      
          if (res.status) {
            getRuleByID();
            Addform.resetFields();
            toast.success("บันทึกข้อมูลสำเร็จ");
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          toast.error("เกิดข้อผิดพลาด ! " + error);
        }
      };
      

    const getRuleByID = async () => {
        try {
          let res = await GetRuleById(Number(id));
          if (res) {
            setDataRule(res);
          }
        } catch (error) {
        }
    };
    const getoperator = async () => {
        try {
          let res = await GetOperator();
          if (res) {
            setDataOperator(res);
          }
        } catch (error) {
        }
    };

    const getKnowledge = async () => {
        try {
          let res = await GetKnowledgeByID(Number(id));
          if (res) {
            setDataKnowledge(res);
          }
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };

    const [searchResults, setSearchResults] = useState<Fact[]>([]);
    const [searchText] = useState<string>('');
    const [fact] = useState<Partial<Fact & { Record?: string }>>({});
    const handleSearchFact = async (value: string) => {
        try {
          const results = await SearchFact(value);
          setSearchResults(results || []);
        } catch (error) {
            // console.error("Error searching for facts:", error);
        
        }
      };
    useEffect(() => {
        if (searchText.trim() !== '') {
            handleSearchFact(searchText.trim());
        } else {
          setSearchResults([]);
        }
    }, [searchText]);

    const handleResetFields = async () => {
        Addform.resetFields();
    }
    
    useEffect(() => {
        getRuleByID();
        getoperator();
        getKnowledge();
    }, []);
    
    const showModal = (val: RuleInterface) => {
        setModalText(
            `เมิงจะลบจริง ๆ หรอ คิดดี ๆ นะจ๊ะ`
        );
        setDeleteId(val.ID);
        setOpen(true);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteRule(deleteId);
        if (res) {
            toast.success("ลบข้อมูลสำเร็จ");
            setOpen(false);
            getRuleByID();
        } else {    
            toast.error("เกิดข้อผิดพลาด ! " + res.message);
            setOpen(false);
        }
        setConfirmLoading(false);
    };
    
    const handleCancel = () => {
        setOpen(false);
    };
    const [deleteId, setDeleteId] = useState<Number>();
    const [modalText, setModalText] = useState<String>();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const columns: ColumnsType<RuleInterface> = [
        {
            title: 'Node 1',
            dataIndex: 'Node1',
            key: 'Node1',
            width: '20%',
            align: 'center',
            render: (item) => `${item.Node1.FactName} (${item.Node1.Description})`
        },
        {
            title: 'Operator',
            dataIndex: 'Operator',
            key: 'Operator',
            width: '5%',
            align: 'center',
            render: (item) => Object.values(item.OperatorName)
        },
        {
            title: 'Node 2',
            dataIndex: 'Node2',
            key: 'Node2',
            width: '20%',
            align: 'center',
            render: (item) => `${item.Node2.FactName} (${item.Node2.Description})`
        },
        {
            title: 'Result 1',
            dataIndex: 'Result1',
            key: 'Result1',
            width: '20%',
            align: 'center',
            render: (item) => `${item.Result1.FactName} (${item.Result1.Description})`
        },
        {
            title: 'Result 2',
            dataIndex: 'Result2',
            key: 'Result2',
            width: '20%',
            align: 'center',
            render: (item) => `${item.Result2.FactName} (${item.Result2.Description})`
        },
        {
            title: 'Data Management',
            align: 'center',
            render: (record) => (
                <Space style={{flexWrap: 'wrap', justifyContent: 'center'}}>     
                    <Button className='deleteicon'>
                        <EditSharp />
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
                {contextHolder}

                    <Layout style={{padding:'10px', marginBottom:'10px'}}>
                        <div style={{fontSize:'20px', textAlign:'center'}}> 
                            {dataKnowledge[0]?.Title} 
                        </div>                   
                    </Layout>                

                    <Form 
                        layout="vertical" 
                        name="form" 
                        form={Addform} 
                        onFinish={onFinish} 
                        autoComplete="off"
                        style={{ display: 'flex', flexDirection: 'column' }} 
                        >
                        <div style={{ display: 'flex', justifyContent:'center'}}>
                        <Form.Item name="Node1" label="node 1" style={{ flexBasis: '20%', marginRight: '10px' }}>
    <Select
        placeholder="Search"
        value={searchText}
        showSearch
        onSearch={handleSearchFact}
        filterOption={false}                                
    >
        {searchResults.length > 0 ? (
            searchResults.map((item: Fact) => (
            <Option key={item.ID} value={item.FactName} >
                {`${item.FactName} (${item.Description})`}
            </Option>
            ))
        ) : (<Option> </Option>)}
    </Select>
</Form.Item>


                            <Form.Item name="OperatorID" label="operator" style={{ flexBasis: '10%', marginRight: '10px' }}>
                                <Select placeholder="Select operator" >
                                    {dataOperater.map((item) => (
                                        <Option value={item.ID} key={item.ID}>
                                            {`${item.OperatorName}`}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item name="Node2" label="node 2" style={{ flexBasis: '20%' }}>
                                <Select
                                    placeholder="Search"
                                    value={fact.Record || undefined}
                                    showSearch
                                    onSearch={handleSearchFact}
                                    filterOption={false}
                                    >
                                    {searchResults.length > 0 ? (
                                        searchResults.map((item: Fact) => (
                                        <Option key={item.ID} value={item.FactName}>
                                            {`${item.FactName} (${item.Description})`}
                                        </Option>
                                        ))
                                    ) : (<Option> </Option>)}
                                </Select>
                            </Form.Item>
                        </div>

                        <div style={{ display: 'flex',justifyContent:'center'}}>
                            <Form.Item name="Result1" label="result 1" style={{ flexBasis: '25%', marginRight:10}}>
                                <Select
                                    placeholder="Search"
                                    value={fact.Record || undefined}
                                    showSearch
                                    onSearch={handleSearchFact}
                                    filterOption={false}
                                    >
                                    {searchResults.length > 0 ? (
                                        searchResults.map((item: Fact) => (
                                        <Option key={item.ID} value={item.FactName}>
                                            {`${item.FactName} (${item.Description})`}
                                        </Option>
                                        ))
                                    ) : (<Option> </Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item name="Result2" label="result 2" style={{ flexBasis: '25%' }}>
                                <Select
                                    placeholder="Search"
                                    value={fact.Record || undefined}
                                    showSearch
                                    onSearch={handleSearchFact}
                                    filterOption={false}
                                    >
                                    {searchResults.length > 0 ? (
                                        searchResults.map((item: Fact) => (
                                        <Option key={item.ID} value={item.FactName}>
                                            {`${item.FactName} (${item.Description})`}
                                        </Option>
                                        ))
                                    ) : (<Option> </Option>)}
                                </Select>
                            </Form.Item>
                        </div>

                        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center' }}>          
                                <div>
                                    <Button htmlType="submit" style={{marginRight:'10px'}}>
                                        SAVE RULE
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={handleResetFields}>
                                        RESET
                                    </Button>
                                </div>                           
                        </div>
                    </Form>
                </Card>

                <Card   className="" 
                        style={{marginTop:'10px', textAlign:'center'}} 
                        title="THE TABLE LISTS THE RULES">
                    <Table
                        dataSource={dataRule} 
                        columns={columns} 
                        size="middle"
                        pagination={{pageSize:5}}/>
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