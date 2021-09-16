import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) =>{

    const takePage = 2;
    const { page } = req.query
    const skipPage = (Number.parseInt(page as string))

    res.locals.pagination = {
        take: takePage,
        skip: (skipPage * takePage) - takePage,
    }
    next()
}