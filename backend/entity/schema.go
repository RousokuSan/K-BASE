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
	Title string

	Rules []Rule `gorm:"foreignKey:KnowledgeID"`

	UserID *uint
	User   User `gorm:"foreignKey:UserID"`
}

type Rule struct {
	gorm.Model

	KnowledgeID *uint
	Knowledge   Knowledge `gorm:"foreignKey:KnowledgeID"`

	CaseID *uint
	Case   Case `gorm:"foreignKey:CaseID"`

	ResultID *uint
	Result   Result `gorm:"foreignKey:ResultID"`
}

type Case struct {
	gorm.Model
	FirstCase 	string
	SecCase  	string

	Rules []Rule `gorm:"foreignKey:CaseID"`

	OperatorID *uint
	Operator   Operator `gorm:"foreignKey:OperatorID"`
}

type Result struct {
	gorm.Model
	FirstResult string
	SecResult 	string

	Rules []Rule `gorm:"foreignKey:ResultID"`

	OperatorID *uint
	Operator   Operator `gorm:"foreignKey:OperatorID"`
}

type Operator struct {
	gorm.Model
	OperatorName string `gorm:"uniqueIndex"`

	Cases   []Case   `gorm:"foreignKey:OperatorID"`
	Results []Result `gorm:"foreignKey:OperatorID"`
}
