const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => { // 세션에 다들고 있기 무거우니까 id만 따로 저장하고,
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id }}); // id를 통해 db에서 user 복원
            done(null, user); // req.user에 접근이 가능해짐
        } catch(err) {
            console.log(err);
            done(err);
        }
    })
    local();
}