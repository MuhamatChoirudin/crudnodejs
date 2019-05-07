import express from 'express';
const transactionDao = require('../dao/transaction-dao');
const resp = require('../models/response');

const TransactionRoute = express.Router();

TransactionRoute.get('/transactions', (req, res) => {
    let filter = {};

    if (req.query.accountNumber) {
        filter.accountNumber = rq.query.accountNumber;
    }
    if (req.query.transactionType) {
        filter.transactionType = req.query.transactionType;
    }
    // if(req.query.transactionType){
    //     filter.balance=req.query.transactionType;
    //       }
    transactionDao.getList(function (error, result) {
        if (error) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    }, filter);
})

TransactionRoute.post('/topup', (req, res, next) => {
    transactionDao.topup(req.body, function (error, result) {
        if (error) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    })
})

TransactionRoute.post('/withdraw', (req, res, next) => {
    transactionDao.withdraw(req.body, function (error, result) {
        if (error) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    })
})

TransactionRoute.post('/transfer', (req, res, next) => {
    transactionDao.Transfer(req.body, function (error, result) {
        if (error) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    })
})

export default TransactionRoute;