const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.send('post')
})

router.delete('/', (req, res) => {
    res.send('delete')
})


module.exports = router;