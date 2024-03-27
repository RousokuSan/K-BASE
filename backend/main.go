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
	router.GET("/knowledges", controller.ListKnowledge) // ดึงข้อมูล knowledge มาแสดง
	router.POST("/knowledge", controller.CreateKnowledge)
	router.GET("/knowledges/:id", controller.GetKnowledge)

	router.DELETE("/knowledgeD/:id", controller.DeleteKnowledge)
	
	router.GET("/rule/:id", controller.ListRule)
	router.POST("/rules", controller.CreateRule)
	router.DELETE("/deleteRule/:id", controller.DeleteRule)
	router.GET("/Operator", controller.GetOperator)

	//fact
	router.POST("/facts1", controller.CreateFact) ///"facts1" เป็น path เฉยๆเอาไว้อ้างอิง
	router.GET("/facts2", controller.GetFact)
	router.DELETE("facts3", controller.DeleteFact)
	

	// router.GET("/fact/search/:name", controller.SearchFactByName)

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