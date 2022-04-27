const express = require('express')
const coin = require('../controllers/mycontrollers.js')
const flip = express.Router();

// one flip
flip.route('/app/flip').get(function (req, res, next) {
    res.status(200).json({ 'flip': coin.coinFlip() })
})

// multiple flips
flip.route('/app/flips/:number').get(function (req, res, next) {
    const flips = coin.coinFlips(req.params.number)
    const sum = coin.countFlips(flips)
    res.status(200).json({ 'raw': flips, 'summary': sum })
})

// match flip
flip.route('/app/flip/call/heads').get(function (req, res, next) {
    const guess = coin.flipACoin('heads')
    res.status(200).json({ 'call': guess.call, 'flip': guess.flip, 'result': guess.result })
})

flip.route('/app/flip/call/tails').get(function (req, res, next) {
    const guess = coin.flipACoin('tails')
    res.status(200).json({ 'call': guess.call, 'flip': guess.flip, 'result': guess.result })
})

module.exports = flip