import { AppDataSource } from "./data-source"
import router from "./route"
import * as express from 'express'
import * as cors from 'cors'

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(express.json())
    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
    }))
    app.use(router)

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}).catch(error => console.log(error))
