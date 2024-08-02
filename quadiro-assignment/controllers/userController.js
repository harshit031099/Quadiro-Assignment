const User = require('../models/user');
const Car = require('../models/car');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
  res.render('user/login', { title: "Assignment for Quadiro Technologies" });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, role: 'user' });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.redirect('/user/login');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/user/cars');
};

exports.getCars = async (req, res) => {
  const cars = await Car.find();
  res.render('user/carList', { cars });
};
