'use strict';
var Account = require('../../lib/domain/account');

function AccountRepository() {
};

AccountRepository.prototype.saveAccount = function (account, callback) {
    callback(null, true);
};

AccountRepository.prototype.getAccount = function (accountID, callback) {
    callback(null, new Account({
        accountID: "WeChatAccount",
        accountType: "WeChat",
        dutyStations: []
    }));
};

module.exports = AccountRepository;