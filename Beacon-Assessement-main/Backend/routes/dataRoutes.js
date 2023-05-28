const express = require('express');
const router = express.Router();

const { getData, getAlldata } = require('../controllers/data');

router.route('/').post(getData).get(getAlldata);

module.exports = router;
