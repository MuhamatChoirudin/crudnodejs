module.exports=(sequelize,DataTypes)=>{
    const Wallet = sequelize.define('wallet',{
        idWallet:{
            field:'id_wallet',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        description:{
            field:'description',
            type: DataTypes.STRING,

        },
        createdDate:{
            field:'created_date',
            type: DataTypes.DATE

        },
        accountNumber:{
            field:'account_number',
            type: DataTypes.INTEGER,
            foreignKey: true
        },
    
    },
    {
        tableName: 'tbl_customer',
        timestamps: false
    });

   return Wallet;
};