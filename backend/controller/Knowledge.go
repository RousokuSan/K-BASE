package controller

import (
	"net/http"
	"github.com/NaruebeTh1/K-BASE/entity"
	"github.com/gin-gonic/gin"
)

// POST 
func CreateKnowledge(c *gin.Context) {
	var knowledge entity.Knowledge
	var user entity.User

	// bind เข้าตัวแปร ParcelList
	if err := c.ShouldBindJSON(&knowledge); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


// กำหนดให้ ไอดีของผู้ใช้เป็น 1 เสมอ // เพราะยังไม่ทำล็อกอิน
	if tx := entity.DB().Where("id = 1").First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found"})
		return
	}

	knowledges := entity.Knowledge{
		UserID:     &user.ID,         
		Title:   	knowledge.Title,   
	}

	// บันทึก
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "knowledges not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}