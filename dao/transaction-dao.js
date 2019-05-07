const {Transaction, Account, Wallet} = require('../database/sequellize');
const accountDao = require('../dao/account-dao');

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
    
function topup(data,callback){
 getBalance(data.anCredit, (balan) =>{
    let aaa = balan + data.amount;
    updateBalance(data.anCredit, aaa);
 })
 Transaction.create({
    anCredit: data.anCredit,
    anDebit: 0,
    amount: data.amount,
    transactionType: data.transactionType,
    accountNumber: data.anCredit
   }).then(
    (transafer)=>{
        callback(null, transafer);
    }
)
}

function withdraw(data,callback){
    getBalance(data.anDebit, (balan) =>{
       let aaa = balan - data.amount;
       updateBalance(data.anDebit, aaa);
    })
    Transaction.create({
       anCredit: 0,
       anDebit: data.anDebit,
       amount: data.amount,
       transactionType: data.transactionType,
       accountNumber: data.anDebit
      }).then(
       (transafer)=>{
           callback(null, transafer);
       }
   )
   }


   function getBalance (ac,callback){
      let data =  Account.findOne({
           where: {accountNumber:ac}
       }).then((data)=>{
        callback(data.balance) ;
       })
      
   }

    function updateBalance(ac,result){
        Account.update({
            balance: result
           
        }, {
            where: {accountNumber: ac}
        })
    } 

   function Transfer(data,callback){
    balanceDebit = getBalance(data.anDebit,(dataq)=>{
        let debit = dataq - data.amount;
        updateBalance(data.anDebit, debit);
    });
    balanceCredit = getBalance(data.anCredit, (data1)=>{
        let credit = data1 + data.amount;
        updateBalance(data.anCredit, credit);
    });
    Transaction.create({
        anCredit: data.anCredit,
        anDebit: data.anDebit,
        amount: data.amount,
        transactionType: data.transactionType,
        accountNumber: data.anDebit
       }).then(
        (transafer)=>{
            callback(null, transafer);
        }
    )
   }
    module.exports = {getList, topup, withdraw,Transfer};