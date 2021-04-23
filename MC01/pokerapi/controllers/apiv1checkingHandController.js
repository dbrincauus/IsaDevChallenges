'use strict'

var varapiv1checkingHandController = require('./apiv1checkingHandControllerService');

module.exports.handCheck = function handCheck(req, res, next) {
  varapiv1checkingHandController.handCheck(req.swagger.params, res, next);
};

module.exports.handCheckOptions = function handCheckOptions(req, res, next) {
  varapiv1checkingHandController.handCheckOptions(req.swagger.params, res, next);
};