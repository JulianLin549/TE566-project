const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get all vendors
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from vendor');
    res.status(StatusCodes.OK).json(result);
});

// add new vendor
router.post('/',async (req, res, next) => {
    const newVendor = req.body;
    console.log(newVendor);
    const result = await db.none(`
        INSERT INTO vendor (company_name, address) VALUES ($1, $2)`,
        [newVendor.companyName, newVendor.address]);

    res.status(StatusCodes.OK).json(result);
});

module.exports = router