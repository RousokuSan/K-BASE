export interface Knowledge {
    ID:         number;
    Title:      string;
    User?:   UserInterface;
    UserID:     number;
}
export interface UserInterface {
    ID?:         number;
    Username?:   string;
    Password:   string;
    Phone:      string;
}