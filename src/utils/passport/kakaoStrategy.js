const passport = require('passport');
const {PrismaClient} = require("@prisma/client");
const KakaoStrategy = require('passport-kakao').Strategy;

const prisma = new PrismaClient()

module.exports = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
                callbackURL: '/api/auth/kakao/callback', // 카카오 로그인 Redirect URI 경로
            },
            /*
             * clientID에 카카오 앱 아이디 추가
             * callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
             * accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
             * profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
             */
            async (accessToken, refreshToken, profile, done) => {
                console.log('kakao profile', profile);
                try {
                    const exUser = await prisma.users.findFirst(
                        {where : {email : profile._json.kakao_account.email}}
                    )
                    // 이미 가입된 카카오 프로필이면 성공
                    if (exUser) {
                        done(null, exUser); // 로그인 인증 완료
                    } else {
                        const newUser = await prisma.users.create({
                            data : {
                                email: profile._json && profile._json.kakao_account.email,
                                name : profile.username,
                                provider : 'kakao'
                            }
                        })
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
};
