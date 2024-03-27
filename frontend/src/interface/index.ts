export interface Knowledge {
    ID?:      number;
    Title:   string;
    User?:   UserInterface;
    UserID:  number;
    State:   string;
}
export interface UserInterface {
    ID?:        number;
    Username?:  string;
    Password:   string;
    Phone:      string;
}

export interface RuleInterface {
    ID:    number;
    Node1: string;
    Node2: string;
    Result1: string;
    Result2: string;

    OperatorID:     number;
    KnowledgeID:    number;
    Operator:       OperatorInterface;
    Knowledge:  Knowledge;
}

export interface OperatorInterface {
    ID:             number;
    OperatorName:   string
}

export interface FactInterface {
    ID:             number;
    FactName:   string
}