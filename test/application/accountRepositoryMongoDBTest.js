'use strict';
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var bearcat = require('bearcat');
var _ = require('underscore');
var should = require('should');
var Account = require('../../lib/domain/account');

describe('account repository MongoDB use case test', function () {
    var Repository;
    before(function () {
        var contextPath = require.resolve('../../testbcontext.json');
        bearcat.createApp([contextPath]);
        bearcat.start(function () {
            Repository = bearcat.getBean('accountRepository');
        });
    });
    describe('#saveAccount(account, cb)', function () {
        context('save a account', function () {
            it('should return true if save success', function (done) {
                var account = new Account({
                    accountID: "WeChatAccount",
                    accountType: "WeChat",
                    dutyStations: ["station"]
                });
                Repository.saveAccount(account, function (err, isSuccess) {
                    isSuccess.should.be.eql(true);
                    done();
                });
            });
        });
    });
    describe('#getAccount(accountID, cb)', function () {
        context('get a account for id', function () {
            it('should return null if no this account', function (done) {
                var accountID = "noAccount";
                Repository.getAccount(accountID, function (err, account) {
                    _.isNull(account).should.be.eql(true);
                    done();
                });
            });
            it('should return account', function (done) {
                var accountID = "WeChatAccount";
                Repository.getAccount(accountID, function (err, account) {
                    account.accountID.should.be.eql("WeChatAccount");
                    account.accountType.should.be.eql("WeChat");
                    account.dutyStations.should.be.eql(["station"]);
                    done();
                });
            });
        });
    });
    after(function (done) {
        MongoClient.connect("mongodb://localhost:27017/TestGDataCenter", function (err, db) {
            if (err) {
                return;
            }
            db.collection('seAccount').drop(function (err, response) {
                db.close();
                done();
            });
        });
    });
});
