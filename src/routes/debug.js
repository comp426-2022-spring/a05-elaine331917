const express = require("express")
const db = require('../services/database.js')
const debug = express.Router();

// Route (endpoint) definitions go in this directory
debug.route('/app/log/access').get(function (req, res, next) {
    const stmt = db.prepare('SELECT * FROM accesslog').all()
    res.status(200).json(stmt)
});

debug.route('/app/error').get(function (req, res, next) {
    throw new Error('Error test successful.')
});

module.exports = debug