type Address = {
    country: string;
    city: string;
    street: string;
}

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: string;
    address: Address;
    phone: string;
    email: string;
};

export type UserState = {
    data: User[];
}

export enum ActionTypes {
    FETCH_USERS = 'USERS/FETCH_USERS',
    ADD_USER = 'USERS/ADD_USER',
    EDIT_USER = 'USERS/EDIT_USER'
}

export type AddUserPayload = {
    firstName: string;
    lastName: string;
    age: string;
    address: Address;
    phone: string;
    email: string;
}
