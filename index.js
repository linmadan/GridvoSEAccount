'use strict';
var bearcat = require('bearcat');
var bearcatContextPath = require.resolve('./bcontext.json');
bearcat.createApp([bearcatContextPath]);
var createAccountManage;
bearcat.start(function () {
    createAccountManage = function () {
        return bearcat.getBean('accountManage');
    };
});
module.exports.createAccountManage = createAccountManage;
