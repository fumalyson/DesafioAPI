import { Request, Response } from "express"
import { TiposDeCarro } from "../entity/TiposDeCarro"
import { sanitize } from 'paliari-js-utils'
import { FindOperator, Like } from "typeorm"

type Filter = {
    nome?: string | FindOperator<string>
}

function generateQuery(q: Filter): Filter {
    const where = q
    if (q.nome) where.nome = Like(`%${q.nome}%`)
    return q
}

function params(req: Request): object {
    const permitted = { nome: true }
    return sanitize(req.body, permitted)
}

export async function index(req: Request, res: Response): Promise<void> {
    const { q = {} } = req.query as { q: Filter }
    const pagination = res.locals.pagination
    const where = generateQuery(q)

    const [rows, count] = await TiposDeCarro.findAndCount({
        select: ['id', 'nome'],
        where,
        ...pagination
    })

    res.json({ rows, count })

}

export async function show(req: Request, res: Response): Promise<void> {
    const { tipoId } = req.params
    const tipo = await TiposDeCarro.findOne({
        where: { id: tipoId },
        select: ['id', 'nome']
    })
    if (!tipo) throw Error('ID nao encontrado')

    res.json(tipo)
}

export async function create(req: Request, res: Response): Promise<void> {

    const tipo = await TiposDeCarro.create(params(req))
    await tipo.save()
    res.json(tipo)
}

export async function update(req: Request, res: Response): Promise<void> {
    let tipo = await TiposDeCarro.findOneOrFail(req.params.tipoId)
    tipo = Object.assign(tipo, params(req))
    await tipo.save()
    res.json(tipo)
}

export async function del(req: Request, res: Response): Promise<void> {
    try {
        const tipo = await TiposDeCarro.findOneOrFail(req.params.tipoId)
        await tipo.remove()
        res.status(204).end()

    } catch (err) {
        res.status(500).json({
            error:500,
            message: 'Nao foi possivel excluir este tipo de carro.'
        })
        return
        // throw new Error("Nao foi possivel excluir este tipo de carro.")
    }

}