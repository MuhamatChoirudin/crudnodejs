const {Customer, Account,Wallet} = require('../database/sequellize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
//const Op =  require("Sequelize").op;

// function getList(callback){
//     Customer.findAll().then(
//         (customers)=>{
//             callback(null, customers);
//         }
//     )
// }

function getList(callback){
    Customer.findAll({
        include:[{
            model: Account,
            //as: 'accounts',
        }]
    }).then(
        (customers)=>{
            callback(null, customers);
        }
    )
}

// function getById(cif, callback){
//     callback(null, findCust);
// }

// function getListPromise(){
//     return new Promise((resolve, reject)=>{
//         resolve(customers);
//     });
// }

function getById(cif,callback){
        Customer.findOne(
           {
            where: {customerNumber: cif},
                    include:[{
                        model: Account,
                        as: 'accounts',
                    }]

                }
            
        ).then(
            (customer) =>{
            callback(null, customer);
        });
}

function insert(data,callback){
    Customer.create({
       // customerNumber: data.customerNumber,
       firstName: data.firstName,
       lastName: data.lastName,
       birthdate: data.birthdate,
       username: data.username,
       password: data.password
    }).then(
        (customer) => {
            callback(null, customer);
        }
    )
}

function update(cif,data,callback){
    Customer.update({
        firstName: data.firstName,
        lastName: data.lastName,
        birthdate: data.birthdate,
        username: data.username,
        password: data.password
       
    }, {
        where: {customerNumber: cif}
    }).then(
        (customer) => {
            callback(null, customer)
        }
    )

}

function remove(cif,callback){
    Customer.destroy({
        where: {customerNumber: cif},
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


function login(username, password, callback){
    Customer.findOne({
        where:{
            [Op.and] : [{username: username},{password: password}]}

    }).then((customer)=>{
        callback(null,customer);
    })
}

// function getById(id, callback){
//     Customer.findByPk(id, {
//         include: [{
//             model: Account,
//             as: 'accounts',
//         }]
//     }).then(
//         (customer) => {
//             callback(null, customer);
//         }
//     )
// }

// function getByIdPromise(cif){
//     console.log(cif);
//     return new Promise((resolve, reject)=>{
//         resolve(customers.find(cus => {return cus.customerNumber == cif;}));
//     }
//     );
// }

// function insert(data, callback){
//     const index = customers.findIndex((cus) => {
//         return cus.id == data.customerNumber;
//     });

//     if (index < 0) {
//         customers.push(data);
//     }

//     getById(data.customerNumber, callback);
// }

module.exports = {getList, getById,remove, insert, update,login};
