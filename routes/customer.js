var express = require('express');
var router = express.Router();
var data = require('../Methods/methods');

/* GET users listing. */


router.get('/',function(req, res,next){
    data.allCustomers((all)=>{
        res.send(all);
    })

});

router.post('/', function(req, res, next) {

    var customer = {
        name: req.body.name,
        mass: req.body.mass,
        volume: req.body.volume,
        address: req.body.address,
        latitude: req. body.latitude,
        longitude: req.body.longitude
    };
    data.insertCustomer(customer,function(){
        res.send('inserted');
    });

});


router.delete('/:id', function(req, res, next){
    data.deleteCustomer(req.params.id,function(){
        res.send('deleted');
    });



});

module.exports = router;
