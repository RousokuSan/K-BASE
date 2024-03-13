export interface UserInterface {
    ID:         number;
    Username:   string;
    Password:   string;
    Phone:      string;
}

export interface Knowledge {
    ID:         number;
    Title:      string;
    Username:   UserInterface;
    UserID:     number;
}