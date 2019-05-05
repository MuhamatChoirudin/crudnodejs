module.exports = (sequelize, DataTypes) =>{
    const Account = sequelize.define('account',{
        accountNumber: {
            field: 'account_number',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accountName:{
            field: 'account_name',
            type: DataTypes.STRING, 
        },
        openDate:{
            field: 'open_date',
            type: DataTypes.DATE, 
        },
        balance:{
            field: 'balance',
            type: DataTypes.DECIMAL, 
        },
    //     customerNumber:{
    //         field:'customer_number',
    //         type: DataTypes.INTEGER,
    //         foreignKey: true
    //     }
     },
    {
        tableName: 'tbl_account',
        timestamps: false
    });
    return Account;
};