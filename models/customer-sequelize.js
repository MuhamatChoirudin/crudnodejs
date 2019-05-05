module.exports=(sequelize,DataTypes)=>{
    const Customer = sequelize.define('customer',{
        customerNumber:{
            field:'customer_number',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        firstName:{
            field:'firstname',
            type: DataTypes.STRING,

        },
        lastName:{
            field:'lastname',
            type: DataTypes.STRING,

        },
        birthdate:{
            field:'birthdate',
            type: DataTypes.DATE,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,



    },
    {
        tableName: 'tbl_customer',
        timestamps: false
    });

   return Customer;
};