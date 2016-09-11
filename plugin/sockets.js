(function (Sockets) {
    'use strict';

    var constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb'),
        settings   = require('./settings');

    var sockets = nodebb.pluginSockets;

    Sockets.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].getCalculationProperties = Sockets.getCalculationProperties;
        sockets[constants.SOCKETS].saveCalculationProperties = Sockets.saveCalculationProperties;
        callback();
    };

    Sockets.getCalculationProperties = function (socket, payload, callback) {
        controller.getCalculationProperties(callback);
    };

    Sockets.saveCalculationProperties = function (socket, payload, callback) {
        controller.saveCalculationProperties(payload, callback);
    };

})(module.exports);