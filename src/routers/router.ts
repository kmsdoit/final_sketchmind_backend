import express, { Request, Response } from 'express'

const router = express.Router();

router.get('/', (req:Request, res: Response) => {
    return res.send({
        "statusCode" : 200,
        "message" : "server is running"
    })
})

export default router