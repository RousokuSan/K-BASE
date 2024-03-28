package controller

import (
	"net/http"

	"github.com/NaruebeTh1/K-BASE/entity"
	"github.com/gin-gonic/gin"
)

// POST
func CreateRule(c *gin.Context) {
	var rule entity.Rule
	var knowledge entity.Knowledge
	var operator entity.Operator

	// bind เข้าตัวแปร rule
	if err := c.ShouldBindJSON(&rule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ถ้ามีการอ้าง ForenKey จะต้องมีบรรทัดพวกนี้ด้วย แต่ใน Fact ไม่มี เลยไม่ต้องมี
	if tx := entity.DB().Where("id = ?", rule.KnowledgeID).First(&knowledge); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "knowledge not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", rule.OperatorID).First(&operator); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "operator not found"})
		return
	}
/////////////////////////////////////////

	myrule := entity.Rule{
		KnowledgeID: rule.KnowledgeID,
		OperatorID: rule.OperatorID,

		Node1: rule.Node1,
		Node2: rule.Node2,
		Result1: rule.Result1,
		Result2: rule.Result2,
	}

	//อยากให้ state เริ่มที่ 1
	if err := entity.DB().Model(&knowledge).Update("State", "1").Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"err":err.Error()})
		return
	}

	if err := entity.DB().Create(&myrule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rule already exists"})
		return
	} 
	
	c.JSON(http.StatusOK, gin.H{"data": myrule})	
}

// ฟังก์ชันลบรายการ rule
func DeleteRule(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM rules WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rules not found"})
		return
	}
	// ส่งคำตอบกลับเมื่อสร้างข้อมูลสำเร็จ
	c.JSON(http.StatusOK, gin.H{"data": id})
}

