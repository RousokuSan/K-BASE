export interface Knowledge {
    ID:         number;
    Title:      string;
    User?:   UserInterface;
    UserID:     number;
    State:      number; // เพิ่มฟิลด์ State
}
export interface UserInterface {
    ID?:         number;
    Username?:   string;
    Password:   string;
    Phone:      string;
}
