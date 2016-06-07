'use strict';

function Account(accountData) {
    this.accountID = accountData.accountID;
    this.accountType = accountData.accountType;
    this.dutyStations = accountData.dutyStations;
};

module.exports = Account;