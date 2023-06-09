import express, {Request, Response} from "express";
import ResponseEntity from "../models/response.entity";

const authRouter = express.Router();
const passport = require('passport')

authRouter.get('/kakao', passport.authenticate('kakao',{session : false}))

authRouter.get(
    '/kakao/callback',
    //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
    passport.authenticate('kakao', {
        failureRedirect: '/api/auth/fail', // kakaoStrategy에서 실패한다면 실행
    }),
    // kakaoStrategy에서 성공한다면 콜백 실행
    (req:Request, res:Response) => {
        res.redirect('/api/auth/success');
    },
);

authRouter.get('/success', (req:Request, res:Response) => {
    const response : { Message: string; statusCode: number } = {
        statusCode : 200,
        Message : "oauth 로 로그인 성공"
    }

    res.send(response)
})

authRouter.get('/fail', (req:Request, res:Response) => {
    const response : { Message: string; statusCode: number } = {
        statusCode : 400,
        Message : "oauth 로 로그인 실패"
    }
    res.send( response)
})

authRouter.get('/naver', passport.authenticate('naver', {authType : 'reprompt'}));

authRouter.get(
    '/naver/callback',
    //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
    passport.authenticate('naver', { failureRedirect: '/api/auth/fail' }),
    (req:Request, res:Response) => {
        res.redirect('/api/auth/success');
    },
);

export default authRouter
