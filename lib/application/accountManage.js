'use strict';
var _ = require('underscore');
var util = require('util');
var EventEmitter = require('events');
var Account = require('../domain/account');

function AccountManage() {
    EventEmitter.call(this);
    this.__accountRepository__ = null;
};

util.inherits(AccountManage, EventEmitter);

AccountManage.prototype.registerAccount = function (accountData, callback) {
    if (!accountData.accountID || !accountData.accountType) {
        callback(null, false);
    } else {
        var account = new Account(accountData);
        this.__accountRepository__.saveAccount(account, function (err, isSuccess) {
            if (err) {
                callback(err, false);
                return;
            }
            callback(null, isSuccess);
        });
    }
};
AccountManage.prototype.getAccount = function (accountID, callback) {
    if (!accountID) {
        callback(null, false);
    } else {
        this.__accountRepository__.getAccount(accountID, function (err, account) {
            if (err) {
                callback(err, false);
                return;
            }
            var accountData = {};
            if (account) {
                accountData.accountID = account.accountID;
                accountData.accountType = account.accountType;
                accountData.dutyStations = account.dutyStations;
            }
            callback(null, accountData);
        });
    }
};
AccountManage.prototype.accountAuth = function (authData, callback) {
    if (authData.accountType == "WeChat") {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

module.exports = AccountManage;