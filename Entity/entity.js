const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:data');


const Customers = sequelize.define('customer',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,

    },
    name:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    mass:{
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    volume:{
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    address:{
        type: Sequelize.STRING,
        allowNull: true
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    }

});

const createTables = function() {
    sequelize.sync({ logging: console.log, force: true }).then(fullfil => {
        sequelize.authenticate().then(() => { console.log('Connection succeeded');})
            .catch(err => {console.error('error in conection', err);});
    });
};

const locations = sequelize.define('location', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});


locations.belongsTo(Customers, {
    foreignKey: 'cId',
    targetKey: 'id'
});

module.exports.Customers = Customers;
module.exports.locations = locations;
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
module.exports.createTables = createTables;