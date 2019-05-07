import express from 'express';
const accountDao = require('../dao/account-dao');
const resp = require('../models/response');

const AccountRoute = express.Router();

AccountRoute.get('/accounts', (req, res)=>{
  let filter={};
  if(req.query.balance){
filter.balance=req.query.balance;
  }
  if(req.query.accountNumber){
      filter.accountNumber = rq.query.accountNumber;
  }
    accountDao.getList(function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, result);
        }
    },filter);
})
AccountRoute.get('/account/:ac', (req, res)=>{
    accountDao.getById(req.params['ac'], function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
            
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
})

AccountRoute.put('/account/:ac',(req,res,next)=>{
    accountDao.update(req.params.ac, req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.ac);
        }
    });
});

AccountRoute.post('/account', (req, res, next)=>{
    accountDao.insert(req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, result);
        }s
    })
})

AccountRoute.delete('/account/ac', (req,res,next)=>{
    accountDao.remove(req.params.ac, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.ac);
        }
    })
})

export default AccountRoute;