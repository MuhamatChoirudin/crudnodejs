import express from 'express';
const customerDao = require('../dao/customer-dao');
const resp = require('../models/response');

const CustomerRoute = express.Router();

CustomerRoute.get('/customers', (req, res)=>{
    /* customerDao.getList(function(error, data){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, data);
        }
    }); */

    customerDao.getList(function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, result);
        }
    });
})

// CustomerRoute.get('/customer/:cif', (req, res)=>{
    /* customerDao.getById(req.params['cif'], function(error, data){
        if(error){
            resp.notOk(res, error);
        }else if(data){
            resp.ok(res, data);
        }else{
            resp.notFound(res, req.param.cif);
        }
    }); */
//     customerDao.getById(req.params['cif']).then(
//         function(data){
//             if(data){
//                 resp.ok(res, data);
//             }else{
//                 resp.notFound(res, req.param.cif);
//             }
//         },
//         function(error){
//             resp.notOk(res, error);
//         }
//     );
// })

CustomerRoute.put('/customer/:cif', (req, res, next) => {
    customerDao.update(req.params.cif, req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
});

CustomerRoute.get('/customer/:cif', (req, res)=>{
    customerDao.getById(req.params['cif'], function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
})

CustomerRoute.post('/customer', (req, res, next) => {
    customerDao.insert(req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, result);
        }
    });
});

CustomerRoute.put('/customer/:cif', (req, res, next) => {
    customerDao.update(req.params.cif, req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
});

CustomerRoute.delete('/customer/:cif', (req, res, next) => {
    customerDao.remove(req.params.cif, function(error, result){
        if(error){
            resp.notOk(res, error);
        }else if(result){
            resp.ok(res, result);
        }else{
            resp.notFound(res, req.params.cif);
        }
    });
});

// CustomerRoute.post('/customer', (req, res, next) => {
//     customerDao.insert(req.body, function(error, data){
//         if(error){
//             resp.notOk(res, error);
//         }else if(data){
//             resp.ok(res, data);
//         }else{
//             resp.notFound(res, req.param.cif);
//         }
//     });
//   });
  
export default CustomerRoute;
