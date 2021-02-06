import { v4 } from 'uuid';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
}

export interface UserError {
    errorField: string;
    errorMessage: string;
    hint?: string;
}

export const users: User[] = [
    {
        id: v4(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        isActive: false
    },
    {
        id: v4(),
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        isActive: false
    },
    {
        id: v4(),
        firstName: 'Robert',
        lastName: 'Smith',
        email: 'robert.smith@example.com',
        isActive: false
    },
    {
        id: v4(),
        firstName: 'Jack',
        lastName: 'Swan',
        email: 'jack.swan@example.com',
        isActive: false
    },
    {
        id: v4(),
        firstName: 'Andy',
        lastName: 'Rose',
        email: 'andy.rose@example.com',
        isActive: false
    }
];