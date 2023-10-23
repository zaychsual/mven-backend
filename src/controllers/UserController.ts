import {Request, Response} from "express";

type User = {
    name: string;
    email: string;
}

export const getUsers = (req: Request, res: Response) => {
    const users: Array<User> = [
        {
            name: 'Zay',
            email: 'admin@admin.com'
        },
        {
            name: 'didi',
            email: 'didi@admin.com'
        },
    ]

    return res.json(users);
}