const express = require('express');
const { User, Post, Action } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {
    try {
        if(req.user) {
            const user = await User.findOne({
                where: { id: req.user.id }
            })
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }, {
                    model: Action,
                    attributes: ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        } else {
            return res.status(200).json(null);
        }
    } catch(err) {
        console.log(err);
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if(exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12); // 두 번째 인자 숫자로는 1초 걸리는 숫자로 맞추면 좋다.
        await User.create({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname,
            description: req.body.description,
        })
        res.status(201).json('ok');
    } catch(err) {
        console.log(err);
        next(err);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => passport.authenticate('local', (err, user, info) => {
    if(err) {
        console.log(err);
        return next(err);
    }
    if(info) {
        return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => { // passport login -> serializeUser, deserializeUser
        if(loginErr) {
            console.log(loginErr);
            return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({
            where: { id: user.id },
            attributes: {
                exclude: ['password'],
            },
            include: [{
                model: Post,
            }, {
                model: User,
                as: 'Followings',
            }, {
                model: User,
                as: 'Followers',
            }, {
                model: Action,
            }]
        })
        // res.setHeader('Cookie', 'cxlxy');
        return res.status(200).json(fullUserWithoutPassword);
    })
})(req, res, next));

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
})

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
            description: req.body.description,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname, description: req.body.description });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if (!user) {
            res.status(403).send('없는 사람을 찾으려고 하시네요?');
        }
        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'],
            // limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if (!user) {
            res.status(403).send('없는 사람을 찾으려고 하시네요?');
        }
        const followings = await user.getFollowings({
            attributes: ['id', 'nickname'],
            // limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (!user) {
            res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if (!user) {
            res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;