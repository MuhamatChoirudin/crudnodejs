const {Customer, Account, Wallet} = require('../database/sequellize');

function getList(callback,filter){
console.log(`filter: ${JSON.stringify(filter)}`)
    Account.findAll({
        // include:[{
        //     model: Customer,
        //     as: 'customers',
        // }],
        where: filter
    }).then(
        (accounts)=>{
            callback(null, accounts);
        }
    )
}

function getById(ac,callback){
        Account.findOne(
           {
            where: {accountNumber: ac},
                    // include:[{
                    //     model: Customer,
                    //     as: 'customers',
                    // }]

                }
            
        ).then(
            (account) =>{
            callback(null, account);
        });
}

function insert(data,callback){
   Account.create({
       // customerNumber: data.customerNumber,
       accountName: data.accountName,
       openDate: data.openDate,
       balance: data.balance
    }).then(
        (account) => {
            callback(null, account);
        }
    )
}

function update(ac,data,callback){
    Account.update({
        accountName: data.accountName
       
    }, {
        where: {accountNumber: ac}
    }).then(
        (account) => {
            callback(null, account)
        }
    )

}

function remove(ac,callback){
    Customer.destroy({
        where: {accountNumber: ac},
        include:[{
            model: Account,
            as: 'accounts',
        }]
    }).then(
        (customer) => {
            callback(null, customer);
        }
    )
}


module.exports = {getList, getById,remove, insert, update};
