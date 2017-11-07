const express = require('express');
const Router = express.Router;
const router = new Router();
const path = require('path');

const coin = require('./controller/coin/router');

router.route('/').get((req, res) => {
  res.json({ message: 'VN Coin trade' });
});

router.use(function(req, res, next) {
  req.url = req.url.replace(/\/\//, '/');
  req.path = req.path.replace(/\/\//, '/');
  next();
});
router.use('/api/coin', coin);
module.exports = router;
