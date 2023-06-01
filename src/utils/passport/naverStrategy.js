const passport = require('passport');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient

module.exports = () => {
    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.NAVER_ID,
                clientSecret: process.env.NAVER_SECRET,
                callbackURL: '/api/auth/naver/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('naver profile : ', profile);
                try {
                    const exUser = await prisma.users.findFirst(
                        {where : {email : profile.email}}
                    )
                    // 이미 가입된 카카오 프로필이면 성공
                    if (exUser) {
                        done(null, exUser); // 로그인 인증 완료
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await prisma.users.create({
                            data : {
                                email: profile.email,
                                name : profile.name,
                                provider : 'naver'
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
