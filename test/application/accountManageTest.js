'use strict';
var bearcat = require('bearcat');
var should = require('should');

describe('accountManage use case test', function () {
    var accountManage;
    before(function () {
        var contextPath = require.resolve('../../testbcontext.json');
        bearcat.createApp([contextPath]);
        bearcat.start(function () {
            accountManage = bearcat.getBean('accountManage');
        });
    });
    context('register account #registerAccount(accountData,callback)', function () {
        it('account register fail if no accountID or accountType', function (done) {
            var accountData = {};
            accountData.accountID = "";
            accountData.dutyStations = [];
            accountManage.registerAccount(accountData, function (err, isSuccess) {
                isSuccess.should.be.eql(false);
                done();
            });
        });
        it('account can register', function (done) {
            var accountData = {};
            accountData.accountID = "WeChatAccount";
            accountData.accountType = "WeChat";
            accountData.dutyStations = [];
            accountManage.registerAccount(accountData, function (err, isSuccess) {
                isSuccess.should.be.eql(true);
                done();
            });
        });
    });
    context('get account #getAccount(accountID,callback)', function () {
        it('get account for account id', function (done) {
            var accountID = "WeChatAccount";
            accountManage.getAccount(accountID, function (err, accountData) {
                accountData.accountID.should.be.eql("WeChatAccount");
                accountData.accountType.should.be.eql("WeChat");
                accountData.dutyStations.should.be.eql([]);
                done();
            });
        });
    });
    context('account auth #accountAuth(authData,callback)', function () {
        it('WeChat account can auth pass', function (done) {
            var authData = {};
            authData.accountID = "WeChat";
            authData.accountType = "WeChat";
            accountManage.accountAuth(authData, function (err, isPass) {
                isPass.should.be.eql(true);
                done();
            });
        });
    });
});