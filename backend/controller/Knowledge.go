package controller

import (
	"net/http"

	"github.com/NaruebeTh1/K-BASE/entity"
	"github.com/gin-gonic/gin"
)

// SetupDatabase เรียกใช้ SetupDatabase() ในไฟล์ entity เพื่อสร้างตารางใหม่ในฐานข้อมูล
func SetupDatabase() {
    entity.SetupDatabase()
}

// POST
func CreateKnowledge(c *gin.Context) {
    // เรียกใช้งาน SetupDatabase() เพื่อให้ตารางถูกสร้างขึ้นใหม่ (ถ้ามีการเปลี่ยนแปลงโครงสร้างของตาราง)
    SetupDatabase()

    var knowledge entity.Knowledge
    var user entity.User

    // bind เข้าตัวแปร Knowledge
    if err := c.ShouldBindJSON(&knowledge); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // กำหนดให้ ID ของผู้ใช้เป็น 1 เสมอ (ยังไม่มีระบบล็อกอิน)
    if tx := entity.DB().Where("id = 1").First(&user); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
        return
    }

    // สร้าง Knowledge จากข้อมูลที่รับเข้ามา
    knowledges := entity.Knowledge{
        UserID: &user.ID,
        Title:  knowledge.Title,
        State: "0", // กำหนดค่า State เป็น 0 เสมอ
    }

    // บันทึกข้อมูล Knowledge ลงในฐานข้อมูล
    if err := entity.DB().Create(&knowledges).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": knowledges})
}
// ฟังก์ชันลบรายการ knowledges
func DeleteKnowledge(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM knowledges WHERE id = ?", id); tx.RowsAffected == 0 {
		// if tx := entity.DB().Exec("DELETE FROM knowledges WHERE id = ? AND state = 1", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "knowledges not found"})
		return
	}
	// ส่งคำตอบกลับเมื่อสร้างข้อมูลสำเร็จ
	c.JSON(http.StatusOK, gin.H{"data": id})
}
