const UserModel = require("../models/user_model");

exports.index = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.send({ apiStatus: true, message: "all users fetched", data });
  } catch (e) {
    res.send({ apiStatus: false, message: e.message, error: e });
  }
};
exports.login = async (req, res) => {
  try {
    const userData = await UserModel.login(
      req.body.userName,
      req.body.password
    );
    const token = await userData.generateToken();
    res.send({
      apiStatus: true,
      message: "logged in",
      data: { userData, token },
    });
  } catch (e) {
    // console.log(e);
    res.send({ apiStatus: false, message: e.message, error: e });
  }
};
exports.register = async (req, res) => {
  try {
    const userData = new UserModel(req.body);
    await userData.save();
    res.send({ apiStatus: true, message: "user registered", data: userData });
  } catch (e) {
    res.send({ apiStatus: false, message: e.message, error: e });
  }
};

exports.edit = async (req, res) => {
  try {
    const data = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.send({ apiStatus: true, message: "User Updated", data });
  } catch (e) {
    res.send({ apiStatus: false, message: e.message, error: e });
  }
};
exports.profile = (req, res) => {
  res.send({
    apiStatus: true,
    message: "done",
    data: req.user,
  });
};
exports.logout = async (req, res) => {
  const result = req.user.tokens.splice((tok) => tok.token == req.token);
  console.log(result);
  req.user.save();
  res.send({
    apiStatus: true,
    message: "logged out",
    data: req.user,
  });
};
exports.addTransaction = (req, res) => {
  req.user.transactions.push(req.body);
  req.user.balance += req.body.amount;
  req.user.save();
  res.send({
    apiStatus: true,
    message: "add transaction done",
    data: req.user,
  });
};
exports.withdraw = (req, res) => {
  req.user.transactions.push(req.body);
  req.user.balance -= req.body.amount;
  req.user.save();
  res.send({
    apiStatus: true,
    message: "withdraw done",
    data: req.user,
  });
};
