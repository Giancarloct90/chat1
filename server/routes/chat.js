const express = require('express');
const router = express.Router();

router.get('/chat', (req, res) => {
    // let nombre = req.query.nombre;
    // console.log(nombre);
    res.render('chat');
});

module.exports = router;