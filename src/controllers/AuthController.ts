import bcrypt from "bcrypt";
import { IUser } from "../models/User";
import { createUser, findByEmail } from "../services/UserService";
import { TypedRequest, TypedResponse } from "../utils/TypeController";


export const register = async (
    req: TypedRequest<Record<string, never>, IUser>,
    res: TypedResponse<{ message: string }>
) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("missing parameters");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    createUser({username, email, password: hashPass});
    return res.json({ message: 'succesfully registered'})
};

export const login = async (
    req: TypedRequest<Record<string, never>, Omit<IUser, "username">>,
    res: TypedResponse<{ message: string }>
) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("missing parameters");
    }
    const user = await findByEmail(email);
    if(!user) {
        return res.status(400).send("email not found");
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return res.status(400).send("wrong password");
    }

    const accessTokenExpiresIn = process.env.ACCESS_TOKEN_JWT_EXPIRE ?? "";
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_JWT_EXPIRE ?? "";

    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }
    const accessToken
};