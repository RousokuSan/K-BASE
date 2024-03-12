package main

import (
	"github.com/NaruebeTh1/K-Base/controller"
	"github.com/NaruebeTh1/K-Base/entity"
	"github.com/gin-gonic/gin"
)


func main() {
	entity.SetupDatabase()
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/users", controller.ListUser)

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