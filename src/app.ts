import express, { Request, Response } from 'express'
import router  from './routers/router'
import userRouter from './routers/users.route'
class App {
    private app : express.Application = express()
    
    constructor() {
        this.app
        this.routerGroup()
    }

    private routerGroup() : void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:false }));
        this.app.use('/api/health', router);
        this.app.use('/api/user', userRouter)
        this.app.listen(3000, () => {
            console.log("started server with 3000")
        })
    }
}

export default App
