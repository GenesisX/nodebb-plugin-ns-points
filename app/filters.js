(function (Filter) {
    'use strict';

    var async     = require('async'),
        database  = require('./database'),
        settings  = require('./settings'),
        constants = require('./constants');

    /**
     * Hook to render user profile.
     * 'userData' will be used as payload in hook handler.
     * @param params {object} Payload :{userData: userData, uid: callerUID}
     * @param callback {function}
     */
    Filter.account = function (params, callback) {
        database.getPoints(params.userData.uid, function (error, points) {
            if (error) {
                return callback(error);
            }
            params.userData.points = points || 0;
            callback(null, params);
        });
    };

    /**
     * Hook to render topic thread
     * @param payload {object} Fields: {posts: posts, uid: uid}
     * @param callback {function}
     */
    Filter.getPosts = function(payload, callback){
        async.map(payload.posts, function (post, next) {
            database.getPoints(post.uid, function (error, points) {
                if (error) {
                    return next(error);
                }
                post.points = points || 0;
                next(null, post);
            });
        }, function (error, results) {
            if (error) {
                return callback(error);
            }
            payload.posts = results;
            callback(null, payload);
        });
    };

    Filter.menuAdmin = function (header, callback) {
        header.plugins.push({
            route: '/plugins/points',
            icon : 'fa-gamepad',
            name : 'Points'
        });
        callback(null, header);
    };

    Filter.navigation = function (items, callback) {
        items.push({
            route    : "/points",
            title    : "Points",
            enabled  : true,
            iconClass: "fa-gamepad",
            textClass: "visible-xs-inline",
            text     : "Points"
        });
        callback(null, items);
    };

})(module.exports);