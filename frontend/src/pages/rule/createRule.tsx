import React, { useState } from "react";
import { Button, Modal } from 'antd';

export default function CreateRules({ handleOpenModal }: { handleOpenModal: () => void }) {
    const [visible, setVisible] = useState(false); // สถานะของ modal

    // เมื่อคลิกที่ปุ่ม "Create Knowledge" เปิด Modal
    const handleOpenModalInPage = () => {
        handleOpenModal(); // เรียกใช้ฟังก์ชันจากหน้าหลัก
    };

    // เมื่อคลิกที่ปุ่ม "Cancel" ปิด Modal
    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <div className="btnbox">
                <Button 
                    type="primary" 
                    className="createbtn"
                    onClick={handleOpenModalInPage}>
                    Create Knowledge
                </Button>
            </div>
            <Modal
                visible={visible}
                title="Add Knowledge"
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={handleCancel}>Submit</Button>,
                ]}
            >
                <p>Content of the modal</p>
                <p>Content of the modal</p>
                <p>Content of the modal</p>
            </Modal>
        </>
    );
}
