package main

import (

	"github.com/NaruebeTh1/K-BASE/controller"
	"github.com/NaruebeTh1/K-BASE/entity"
	"github.com/gin-gonic/gin"
)


func main() {
	entity.SetupDatabase()
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/users", controller.ListUser)
	// router.GET("/rules", controller.ListRule) // เพิ่มเส้นทางสำหรับแสดงข้อมูล Rule ในรูปแบบตาราง
	router.GET("/knowledges", controller.ListKnowledge) // ดึงข้อมูล knowledge มาแสดง
	router.POST("/knowledge", controller.CreateKnowledge)

	router.DELETE("/knowledgeD/:id", controller.DeleteKnowledge)

	  // สร้าง Rule ใหม่
	  router.POST("/rules", controller.CreateRule)

	  // แสดงรายการ Rule ทั้งหมด
	  router.GET("/rules", controller.ListRules)

	router.Run(":8080")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}