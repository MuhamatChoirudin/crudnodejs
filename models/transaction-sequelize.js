module.exports=(sequelize,DataTypes)=>{
    const Transaction = sequelize.define('transaction',{
        idTransaction:{
            field:'id_transaction',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        date:{
            field:'date',
            type: DataTypes.DATE,

        },
        anDebit:{
            field:'an_debit',
            type: DataTypes.INTEGER,

        },
        anCredit:{
            field:'an_credit',
            type: DataTypes.INTEGER,
        },
        amount:{
            field:'amount',
            type: DataTypes.DOUBLE,
        },
        transactionType:{
            field:'transaction_type',
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'tbl_transaction',
        timestamps: false
    });

   return Transaction;
};