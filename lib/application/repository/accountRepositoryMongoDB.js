'use strict';
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var _ = require('underscore');
var Account = require('../../domain/account');

function AccountRepository() {
    this.dBUrl = '';
};

AccountRepository.prototype.saveAccount = function (account, callback) {
    var repository = this;
    var mongoDB;
    async.waterfall([function (cb) {
        MongoClient.connect(repository.dBUrl, cb);
    }, function (db, cb) {
        mongoDB = db;
        let updateOperations = {};
        updateOperations.accountID = account.accountID;
        updateOperations.accountType = account.accountType;
        updateOperations.dutyStations = account.dutyStations;
        mongoDB.collection("seAccount").updateOne({
                accountID: account.accountID,
            },
            {
                $set: updateOperations
            },
            {
                upsert: true

            },
            cb);
    }], function (err, result) {
        if (err) {
            callback(err, false);
            mongoDB.close();
            return;
        }
        if (result.result.n == 1) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
        mongoDB.close();
    });
};

AccountRepository.prototype.getAccount = function (accountID, callback) {
    var repository = this;
    var mongoDB;
    async.waterfall([function (cb) {
        MongoClient.connect(repository.dBUrl, cb);
    }, function (db, cb) {
        mongoDB = db;
        var cursor = db.collection('seAccount').find({"accountID": accountID});
        cursor.limit(1).next(cb);
    }], function (err, document) {
        if (err) {
            callback(err, null);
            mongoDB.close();
            return;
        }
        if (_.isNull(document)) {
            callback(null, null);
            mongoDB.close();
            return;
        }
        var account = new Account(document);
        callback(null, account);
        mongoDB.close();
    });
};

module.exports = AccountRepository;