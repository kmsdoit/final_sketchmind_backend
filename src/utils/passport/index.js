const passport = require('passport');
const kakao = require('./kakaoStrategy');
const  {PrismaClient} = require("@prisma/client"); // 카카오서버로 로그인할때

const prisma = new PrismaClient()

module.exports = () => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    //
    passport.deserializeUser(async (id, done) => {
        await prisma.users.findFirst({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    //
    // local();
    kakao(); // 구글 전략 등록
};
