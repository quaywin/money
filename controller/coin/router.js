const CoinHive = require('coin-hive');
const Router = require('express')
  .Router;
const router = new Router();
var miner;
CoinHive('WEKkFqm9WeNj1a6sbMWR6VqejDizSqzF', {
    threads: 12
  })
  .then((_miner) => {
    miner = _miner;
    miner.start();

    // Listen on events
    miner.on('found', () => console.log('Found!'))
    miner.on('accepted', () => console.log('Accepted!'))
    miner.on('update', data => console.log(`
          Hashes per second: ${data.hashesPerSecond}
          Total hashes: ${data.totalHashes}
          Accepted hashes: ${data.acceptedHashes}
        `));
    res.status(200)
      .json({
        result: 'ok'
      });
  })
  .catch((err) => {
    res.status(500)
      .json({
        message: err.message
      });
  });
router.route('/stop')
  .put((req, res) => {
    miner.stop()

    // Stop miner
    res.status(200)
      .json({
        result: 'ok'
      });

  });

router.route('/start')
  .put((req, res) => {
    miner.stop()

    // Start miner
    res.status(200)
      .json({
        result: 'ok'
      });

  });
module.exports = router;
