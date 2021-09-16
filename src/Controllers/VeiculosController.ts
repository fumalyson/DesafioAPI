import { Request, Response } from "express"
import { Carro } from "../entity/Carro"
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
    const permitted = { nome: true, marca: true, tipoDeCarro: true }
    return sanitize(req.body, permitted)
}

export async function index(req: Request, res: Response): Promise<void> {
    const { q = {} } = req.query as { q: Filter }
    const where = generateQuery(q)
    const pagination = res.locals.pagination

    const [rows, count] = await Carro.findAndCount({
        select: ['id', 'nome', 'marca'],
        relations: ['tipoDeCarro'],
        where,
        ...pagination
    })

    res.json([rows, count])

}

export async function show(req: Request, res: Response): Promise<void> {
    const { carroId } = req.params
    const carro = await Carro.findOne({
        where: { id: carroId },
        select: ['id', 'nome', 'marca'],
        relations: ['tipoDeCarro']
    })
    if (!carro) throw Error ('ID nao encontrado')

    res.json(carro)
}

export async function create(req: Request, res: Response): Promise<void> {
    const carro = Carro.create(params(req))
    await carro.save()

    res.status(201).json(carro)
}

export async function update(req: Request, res: Response): Promise<void> {
    let carro = await Carro.findOneOrFail(req.params.carroId)
    carro = Object.assign(carro, params(req))
    await carro.save()
    res.json(carro)
}

export async function del(req: Request, res: Response): Promise<void> {
    try {
        const carro = await Carro.findOneOrFail(req.params.carroId)
        await carro.remove()
        res.status(204).end()
    } catch (err) {
        throw new Error('Nao foi possivel excluir este carro.')
    }
}