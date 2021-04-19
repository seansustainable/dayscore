const express = require('express');
const { Action, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        const action = await Action.create({
            title: req.body.title,
            description: req.body.description,
            score: req.body.score,
            UserId: req.user.id,
        })
        res.status(201).json(action);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

router.delete('/:actionId', isLoggedIn, async (req, res, next) => { // DELETE /post/10
    try {
        await Action.destroy({
            where: {
                id: req.params.actionId,
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.actionId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;