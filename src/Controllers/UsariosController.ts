import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";
import { sanitize } from "paliari-js-utils";
import { FindOperator, Like } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { pagination } from "typeorm-pagination";

function params(req: Request): object {
    const permitted = { login: true, senha: true }
    return sanitize(req.body, permitted)
}

type Filter = {
    nome?: string | FindOperator<string>
}

function generateQuery(q: Filter): Filter {
    const where = q
    if (q.nome) where.nome = Like(`%${q.nome}%`)
    return q
}

export async function login(req: Request, res: Response) {
    const { login, senha } = req.body
    const pagination = res.locals.pagination

    const user = await Usuario.findOne({
        where: { login },
        ...pagination    
    })

    if (user) {
        if (await bcrypt.compare(senha, user.senha)) {
            const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
                expiresIn: "1d"
            })
            const data = {
                id: user.id,
                login: user.login,
                token
            }
            res.json(data)
        } else {
            return res.status(404).json({ message: 'User not found!'})
        }
    }

}

export async function index(req: Request, res: Response): Promise<void> {
    const { q = {} } = req.query as { q: Filter }
    const where = generateQuery(q)
    const takePage = 2;
    const { page } = req.query
    const skipPage = (Number.parseInt(page as string))

    const [rows, count] = await Usuario.findAndCount({
        select: ['login', 'senha'],
        where,
        take: takePage,
        skip: (skipPage * takePage) - takePage,
        cache: true,
    })

    res.json([rows, count])

}

export async function create(req: Request, res: Response): Promise<void> {
    const { login, senha }: any = params(req)
    const passwordHash = await bcrypt.hash(senha, 8)

    const user = Usuario.create({
        login,
        senha: passwordHash
    })
    await user.save()

    res.json(user)
}
