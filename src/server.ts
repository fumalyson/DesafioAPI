import './config/env'
import 'reflect-metadata'
import * as express  from "express"
import './database/connect'
import routes from "./routes"


const app = express()


app.use(express.json())
app.use(routes)
app.listen(3000, ()=> console.log('Server Running at http://localhost:3000'))