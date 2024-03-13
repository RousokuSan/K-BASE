package entity

import (
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
    return db
}

func SetupDatabase() {
    database, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // Migrate the schema
    database.AutoMigrate(
        &User{},
        &Knowledge{},
        &Case{},
        &Result{},
        &Operator{},
    )

    // // เพิ่มคอลัม state ในตาราง knowledges โดยใช้ ALTER TABLE
    // if err := database.Exec("ALTER TABLE knowledges ADD COLUMN state VARCHAR(255)").Error; err != nil {
    //     panic("failed to add column state")
    // }

    db = database

    Operator := []Operator{
        {OperatorName: "OR"},
        {OperatorName: "AND"},
    }
    for _, Operator := range Operator {
        db.Create(&Operator)
    }
}
