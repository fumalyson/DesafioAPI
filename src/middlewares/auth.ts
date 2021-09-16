import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

export async function auth (req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({ message: 'Token is required!'})

    }
    const token = authHeader.replace('Bearer ', '')
    

    try {
        jwt.verify(token, process.env.APP_SECRET) 
        next()
    
    } catch(err){
        return res.status(401).json({ message: 'Token required!'})

    }
}