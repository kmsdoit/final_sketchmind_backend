import express, { Request, Response } from 'express'
import router  from './routers/router'
import userRouter from './routers/users.route'
import authRouter from "./routers/auth.route";
import profileRepository from "./repository/profile.repository";
import profileRouter from "./routers/profile.route";
const passportConfig = require('./utils/passport');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
class App {
    private app : express.Application = express()
    
    constructor() {
        this.app
        this.expressConfig();
        this.routerGroup();
        passportConfig();
    }

    private expressConfig() : void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:false }));
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(
            session({
                resave: false,
                saveUninitialized: false,
                secret: process.env.COOKIE_SECRET,
                cookie: {
                    httpOnly: true,
                    secure: false,
                },
            }),
        );
        this.app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
        this.app.use(passport.session());
    }

    private routerGroup() : void {
        this.app.use('/api/health', router);
        this.app.use('/api/user', userRouter);
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/profile', profileRouter)
        this.app.listen(3000, () => {
            console.log("started server with 3000")
        })
    }
}

export default App
