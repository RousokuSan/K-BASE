import { useState, useEffect } from "react"
import { GetUser } from "../../service/https";
import { UserInterface } from "../../interface";
import Nav from "../../layout/navbar";
import Footers from "../../layout/footer";
import { Content } from "antd/es/layout/layout";
import '../style/styleAdmin.css';
export default function Admin() {

    // const [dataUser, setDataUser] = useState<UserInterface[]>([]);

    // const getUser = async () => {
    //     let res = await GetUser();
    //     if (res) {
    //         setDataUser(res);
    //         console.log(res)
    //     }
    //   };
    
    //   useEffect(() => {
    //     getUser();
    //   }, []);

    return (
        <>
            <Nav />
            <Content className="content">
                0000
            </Content>
            <Footers />
        </>
    );
}
  