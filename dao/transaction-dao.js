const {Transaction, Account, Wallet} = require('../database/sequellize');

function getList(callback,filter){
    console.log(`filter: ${JSON.stringify(filter)}`)
        Transaction.findAll({
            // include:[{
            //     model: Customer,
            //     as: 'customers',
            // }],
            where: filter
        }).then(
            (transactions)=>{
                callback(null, transactions);
            }
        )
    }
    
   function topup(data, callback){
       Transaction.create({
        anCredit: data.anCredit,
        amount: data.amount

       })
   }
    module.exports = {getList, getById};