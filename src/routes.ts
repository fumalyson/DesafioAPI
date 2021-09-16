import { Router, Request, Response } from "express";
import * as VeiculosController from './Controllers/VeiculosController'
import * as TiposDeCarroController from './Controllers/TiposDeCarroController'
import * as UsuariosController from './Controllers/UsariosController'

import { auth } from "./middlewares/auth"
import pagination from "./middlewares/pagination";

const routes = Router()


routes.get('/', (req: Request, res: Response)=>{
    return res.json({ message: 'Hello World'})
})

//* Rota de login com autenticacao.
routes.post('/login', UsuariosController.login)

routes.use(auth, pagination)

//* Rotas de Usuarios, com autenticacao, login, e criacao de usuarios.
routes.post('/usuarios', UsuariosController.create)
routes.get('/usuarios', UsuariosController.index)

//* Rotas dos tipos de veiculo
routes.get('/veiculos/tipos/:tipoId', TiposDeCarroController.show)
routes.get('/veiculos/tipos', TiposDeCarroController.index)
routes.post('/veiculos/tipos', TiposDeCarroController.create)
routes.put('/veiculos/tipos/:tipoId', TiposDeCarroController.update)
routes.delete('/veiculos/tipos/:tipoId', TiposDeCarroController.del)

//* Rotas dos veiculos, com funcoes de Listar, Exibir pelo ID, Criar, Editar pelo ID e  Excluir pelo ID
routes.get('/veiculos', VeiculosController.index)
routes.get('/veiculos/:carroId', VeiculosController.show)
routes.post('/veiculos', VeiculosController.create)
routes.put('/veiculos/:carroId', VeiculosController.update)
routes.delete('/veiculos/:carroId', VeiculosController.del)



export default routes