
/**   *************************************************************************************
 * File name: user-routes.js
 * 
 * This file to collect ALL routes (api and HTML) and package them
 **************************************************************************************   */


const router = require('express').Router();

const path = require('path');

// const htmlRoutes = require('./html');
const apiRoutes = require('./api');

// router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

router.get('/user-profile', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/assets/html/user-profile.html"));
});


router.use((req, res) => res.sendFile(path.join(__dirname, '../public/assets/index.html')));


module.exports = router;
