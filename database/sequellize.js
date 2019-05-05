const Sequelize = require('sequelize');
const CustomerModel = require('../models/customer-sequelize');
const AccountModel = require('../models/account-sequelize');
const WalletModel = require('../models/wallet-sequelize');
const TransactionModel = require('../models/transaction-sequelize');

const sequelize = new Sequelize('e_wallet', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Customer = CustomerModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Wallet = WalletModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);

Account.belongsTo(Customer,{foreignKey: 'customer_number'});
Customer.hasMany(Account, {foreignKey: 'customer_number'});
Wallet.belongsTo(Wallet, {foreignKey: 'account_number'});
Account.hasMany(Account, {foreignKey: 'account_number'});
module.exports = {
  Customer,
  Account,
  Wallet,
  Transaction
};
