const db = require('../Entity/entity');
let geodist = require('geodist');







var insertCustomer = async (data,f)=>{
    db.Customers.create({
        name: data.name,
        mass: data.mass,
        volume: data.volume,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude})
        .then(row => {
            console.log("inserted");
            f();
        })
        .catch(err => {
            return console.log(err.message);
        })

}

const deleteCustomer = async function(cId, f) {
    db.Customers.destroy({
        where: {
            id: cId,
        }
    }).catch(err => {
        console.log(err.message)
    }).then(r => {
        console.log("deleted");
        f();
    });
};






var allCustomers = function(f){

    db.Customers.findAll().then(rows => {
        var all = [];
        rows.forEach(function (row) {
            let  customer = {
                id: row.dataValues.id,
                name: row.dataValues.name,
                mass: row.dataValues.mass,
                volume: row.dataValues.volume,
                address: row.dataValues.address,
                latitude: row.dataValues.latitude,
                longitude: row.dataValues.longitude,
                visited: 0
            };
            all.push(customer);
        });


        let randomIndex =  Math.floor(Math.random() * Math.floor(all.length)) ;

        let array = [];
        if(all.length !== 0) {
            if (all.length === 1){
                randomIndex = 0;
            }
            all[randomIndex].visited = 1;
            let curentIndex = randomIndex;
            let distance = 0;
            array.push(all[curentIndex]);

            while(array.length !== all.length){
                let minDistance = 100000000;
                let minIndex = -1;
                for(let i = 0; i<all.length; i++){
                    if(all[i].visited === 0 && i !== curentIndex){
                        distance = geodist({lat: all[i].latitude, lon: all[i].longitude},
                            {lat: all[curentIndex].latitude, lon: all[curentIndex].longitude});
                        if (distance <= minDistanceist){
                            minDistance = distance;
                            minIndex = i;
                        }
                    }
                }
                if (minIndex === -1) {
                    break;
                }
                curentIndex = minIndex;
                all[minIndex].visited = 1;
                sorted.push(all[minIndex])

            }
        }

        f(array);

    }).catch(err => {
        console.log('error',err.message);
    })
}


module.exports = {
    allCustomers,
    insertCustomer,
    deleteCustomer
};
