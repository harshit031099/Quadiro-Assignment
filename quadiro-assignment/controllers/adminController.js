const User = require('../models/user');
const Car = require('../models/car');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
  res.render('admin/login', { title: "Assignment for Quadiro Technologies" });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, role: 'admin' });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.redirect('/admin/login');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/admin/dashboard');
};

exports.getDashboard = async (req, res) => {
  const cars = await Car.find();
  const totalCars = cars.length;
  res.render('admin/dashboard', { cars, totalCars });
};

exports.getNewCar = (req, res) => {
  res.render('admin/carForm');
};

exports.createCar = async (req, res) => {
  const { name, manufacturingYear, price } = req.body;
  const car = new Car({ name, manufacturingYear, price });
  await car.save();
  res.redirect('/admin/dashboard');
};

exports.getEditCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('admin/carForm', { car });
};

exports.updateCar = async (req, res) => {
  const { name, manufacturingYear, price } = req.body;
  await Car.findByIdAndUpdate(req.params.id, { name, manufacturingYear, price });
  res.redirect('/admin/dashboard');
};

exports.deleteCar = async (req, res) => {
  await Car.findByIdAndRemove(req.params.id);
  res.redirect('/admin/dashboard');
};
