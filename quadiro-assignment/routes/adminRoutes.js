const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.get('/dashboard', adminController.getDashboard);
router.get('/car/new', adminController.getNewCar);
router.post('/car', adminController.createCar);
router.get('/car/edit/:id', adminController.getEditCar);
router.post('/car/update/:id', adminController.updateCar);
router.post('/car/delete/:id', adminController.deleteCar);

module.exports = router;
