const express = require('express');

const { Action } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Action.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(actions);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;