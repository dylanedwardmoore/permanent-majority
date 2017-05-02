const async = require('async');
const request = require('request');
const Conversation = require('../models/Conversation');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

/**
 * GET /
 * Home page.
 */
exports.safelogin = (req, res) => {
  res.render('safelogin', {
    title: 'Secure Login'
  });
};

/**
 * GET /
 * Analysis
 */
exports.getAnalysis = (req, res) => {
  res.render('analysis', {
    title: 'Analysis'
  });
};

exports.postSafeLogin = (req, res, next) => {
  if(req.body.passphrase === 'demo!') {
    res.render('home', {
      title: 'Home'
    });
  } else {
    res.render('safelogin', {
      title: 'Secure Login'
    });
  }
}

/**
 * GET /
 * Analysis
 */
exports.getAllData = (req, res) => {
	console.log('get all data called');
    Conversation.find({}, function(err, all_data) {
        if (err) {
                res.status(500).send(JSON.stringify(err));
                return;
            } else {
                res.status(200).send(JSON.stringify(all_data));
            }
    });
};
