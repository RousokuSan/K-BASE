package controller

import (
    "net/http"

    "github.com/NaruebeTh1/K-BASE/entity"
    "github.com/gin-gonic/gin"
)

// CreateRule สร้าง Rule ใหม่
func CreateRule(c *gin.Context) {
    var rule entity.Rule

    // bind ข้อมูลเข้าตัวแปร Rule
    if err := c.ShouldBindJSON(&rule); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // บันทึกข้อมูล Rule ลงในฐานข้อมูล
    if err := entity.DB().Create(&rule).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": rule})
}

// ListRules แสดงรายการ Rule ทั้งหมด
func ListRules(c *gin.Context) {
    var rules []entity.Rule

    // ค้นหาและดึงข้อมูล Rule ทั้งหมดจากฐานข้อมูล
    if err := entity.DB().Find(&rules).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": rules})
}
