package controller

import (
    "net/http"

    "github.com/NaruebeTh1/K-BASE/entity"
    "github.com/gin-gonic/gin"
)

// POST
func CreateFact(c *gin.Context) {
    var fact entity.Fact

    // bind เข้าตัวแปร fact
    if err := c.ShouldBindJSON(&fact); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	myfact := entity.Fact{
		Node: fact.Node,
		Description: fact.Description,

	}
    // เพิ่ม fact เข้าฐานข้อมูล
    if err := entity.DB().Create(&myfact).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "failed to create fact"})
        return
		
    }
    c.JSON(http.StatusOK, gin.H{"data": fact})
}

// DELETE
func DeleteFact(c *gin.Context) {
    id := c.Param("id")

    // ลบ fact จากฐานข้อมูล
    if err := entity.DB().Exec("DELETE FROM facts WHERE id = ?", id).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "failed to delete fact"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": id})
}
