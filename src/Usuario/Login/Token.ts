import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class Token 
{
    private static secretKey: string = process.env.SECRET_KEY || "secretKey";

    public static async createToken(id: number, name: string)
    {
        const timeExpire = "15d"
        const userDate = { id, name };
        const token = jwt.sign(userDate, Token.secretKey, { expiresIn: timeExpire });
        return token;
    }

    public static async authToke(req: Request, res: Response, next: NextFunction)
    {
        const token = req.headers["authorization"];
        const user = Token.decodeToken(token);

        if(user)
        {
            (req as Request & {user: { name: string, id: number }}).user = {
                name: user.name,
                id: user.id
            };
            next();
        }
        if (!user) res.status(401).json({message: "Not Auth"});
    }

    private static decodeToken = (token: string | any): any | boolean =>
    {
        try {
            const _token = token.replace("Bearer ", "");
            const user = jwt.verify(_token, Token.secretKey);
            return user;
        } catch (err: any) {
            return false;
        }
    }
}