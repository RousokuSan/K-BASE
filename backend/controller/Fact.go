package controller

import (
	"net/http"
	"github.com/NaruebeTh1/K-BASE/entity"
	"github.com/gin-gonic/gin"
)

// เพิ่ม Fact ใหม่
func CreateFact(c *gin.Context) {
	var fact entity.Fact

	if err := c.ShouldBindJSON(&fact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&fact).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fact})
}

// อัปเดต Fact ที่มีอยู่แล้ว
func UpdateFact(c *gin.Context) {
	id := c.Param("id")
	var fact entity.Fact

	if err := entity.DB().Where("id = ?", id).First(&fact).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Fact not found"})
		return
	}

	var updatedFact entity.Fact
	if err := c.ShouldBindJSON(&updatedFact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Model(&fact).Updates(&updatedFact).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updatedFact})
}

// ลบ Fact จากฐานข้อมูล
func DeleteFact(c *gin.Context) {
	id := c.Param("id")
	var fact entity.Fact

	if err := entity.DB().Where("id = ?", id).First(&fact).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Fact not found"})
		return
	}

	if err := entity.DB().Delete(&fact).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
