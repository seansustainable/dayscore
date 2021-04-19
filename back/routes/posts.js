const express = require('express');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            // limit, offset 방식을 쓰면 로딩 중 게시글이 생성, 삭제될 경우 꼬여버린다. -> offset 대신 lastId 방식
            // where: { id: lastId },
            limit: 10,
            // offset: 100, // 101~110
            order: [['createdAt', 'DESC'], [Comment, 'createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }]
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;