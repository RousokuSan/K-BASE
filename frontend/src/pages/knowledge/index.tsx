import Nav from "../../layout/navbar";
import Footers from "../../layout/footer";
import { Content } from "antd/es/layout/layout";
import '../style/styleAdmin.css';
import { Card, Table } from "antd";
import type { ColumnType, ColumnsType } from 'antd/es/table';
export default function Knowledges() {

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
            //align: 'center',
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
                    <Card className=""> การสร้าง Knowledge </Card>

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