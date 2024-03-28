package controller

import (
	"net/http"
	"github.com/NaruebeTh1/K-BASE/entity"
	"github.com/gin-gonic/gin"
)

// func SearchFactByName(c *gin.Context) {
//     var fact []entity.Fact
//     name := c.Param("name")

//     // ทำการ query ข้อมูลจากฐานข้อมูลโดยค้นหาชื่อ
//     if err := entity.DB().Where("fact_name LIKE ?", "%"+name+"%").Find(&fact).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": fact})
// }



    // ทำการ query ข้อมูลจากฐานข้อมูลโดยค้นหาชื่อและคำอธิบาย
	func SearchFactByName(c *gin.Context) {
		var fact []entity.Fact
		name := c.Param("name")
	
		// ทำการ query ข้อมูลจากฐานข้อมูลโดยค้นหาชื่อนักเรียน
		if err := entity.DB().Where("fact_name LIKE ?", "%"+name+"%").Find(&fact).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	
		c.JSON(http.StatusOK, gin.H{"data": fact})
	}


func CreateFact(c *gin.Context) {
	var fact entity.Fact

	if err := c.ShouldBindJSON(&fact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	facts := entity.Fact{
		FactName: fact.FactName,
		Description: fact.Description,
	}

	if err := entity.DB().Create(&facts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": facts})
}


func ListFact(c *gin.Context) {
	var fact []entity.Fact
	if err := entity.DB().Raw("SELECT * FROM facts").Scan(&fact).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fact})
}

func DeleteFact(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM facts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fact not found"})
		return
	}
	// ส่งคำตอบกลับเมื่อสร้างข้อมูลสำเร็จ
	c.JSON(http.StatusOK, gin.H{"data": id})
}