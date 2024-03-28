package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"uniqueIndex"`
	Password string `gorm:"uniqueIndex"`
	Phone    string `gorm:"uniqueIndex"`

	Knowledges []Knowledge `gorm:"foreignKey:UserID"`
}

type Knowledge struct {
	gorm.Model
	Title string `gorm:"uniqueIndex"`
	State string

	Rules []Rule `gorm:"foreignKey:KnowledgeID"`

	UserID *uint
	User   User `gorm:"foreignKey:UserID"`
}

type Rule struct {
	gorm.Model

	Node1 string 
	Node2   string 

	Result1 string 
	Result2   string 

	KnowledgeID *uint
	Knowledge   Knowledge `gorm:"foreignKey:KnowledgeID"`
	
	OperatorID *uint
	Operator   Operator `gorm:"foreignKey:OperatorID"`
}

type Operator struct {
	gorm.Model
	OperatorName string `gorm:"uniqueIndex"`

	Rules []Rule `gorm:"foreignKey:OperatorID"`
}

type Fact struct {
	gorm.Model
	FactName string `gorm:"unique" valid:"required~Please fill in information"`
	Description string
}