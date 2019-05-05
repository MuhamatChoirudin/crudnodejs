const {Wallet}= require('../database/sequellize');

function getList(callback){
    Wallet.findAll({

    }).the(
        (wallets)=>{
            callback(null, wallets);
        }
    )
}

function getById(ad, callback){
    Wallet.findOne(
        {
            where: {idWallet: ad}
        }
        ).then(
            (wallet)=>{
                callback(null, wallet)
            }
        )
}

function insert(data, callback){
    Wallet.create({
        
    })
}

