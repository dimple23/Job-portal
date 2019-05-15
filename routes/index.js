
/* 
 * use this file to collect ALL routes (api and HTML) and package them
 */


const router = require('express').Router();

const path = require('path');

const htmlRoutes = require('./html');
const apiRoutes = require('./api');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);


router.use((req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));


module.exports = router;
