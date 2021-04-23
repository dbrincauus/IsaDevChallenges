'use strict'

var varapiv1examplesController = require('./apiv1examplesControllerService');

module.exports.LCDCreate = function LCDCreate(req, res, next) {
  varapiv1examplesController.LCDCreate(req.swagger.params, res, next);
};

module.exports.LCDOptions = function LCDOptions(req, res, next) {
  varapiv1examplesController.LCDOptions(req.swagger.params, res, next);
};