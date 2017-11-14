import User from '../../models/User';
import streamToPromise from 'stream-to-promise';
import fs from 'fs';
import _ from 'lodash';

function register(req, res, next) {
  let newPath;
  let { login, email, password } = req.body;
  const { avatar } = req.files;
  password = password ? User.hash(password) : null;
  const model = new User({ login, email, password });
  model.save()
  .then((item) => {
    const extenstion = avatar.path.split('.').pop();
    const filename = User.hash(avatar.originalFilename) + '.' + extenstion;
    newPath = `/store/${filename}`;
    const stream = fs.createReadStream(avatar.path)
    .pipe(fs.createWriteStream(`public${newPath}`));
    return streamToPromise(stream);
  })
  .then(() => {
    model.avatar = newPath;
    return model.save();
  })
  .then(() => {
    req.session.user_id = model._id;
    req.session.save((err) => {
      const { login, email, avatar } = model;
      res.json({ login, email, avatar });
    });
  })
  .catch((e) => {
    const message = e.code === 11000 ?
    { login : "login or email already taken" } :
    _.mapValues(e.errors, (item => item.kind)); 
    const error = {
      status: 400,
      message: message
    };
    next(error);
  });
}

function login(req, res, next) {
  const { login, password } = req.body;
  User.findOne({ login: login })
  .then((item) => {
    if (item && item.authenticate(password)) {
      req.session.user_id = item._id;
      req.session.save((err) => {
        const { login, email, avatar } = item;
        console.log(avatar);
        res.json({ login, email, avatar });
      });
    } else {
      throw {
        status: 400,
        message: {
          login: "Login or password incorrect"
        }
      };
    } 
  })
  .catch((e) => {
    next(e);
  });
}

function logout(req, res, next) {
  req.session.destroy();
  res.json("ok");
}

function self(req, res, next) {
  User.findOne({ _id: req.session.user_id})
  .then((item) => {
    if (item) {
      const { login, email, avatar } = item;
      res.json({ login, email, avatar });
    } else {
      res.json(null);
    }
  })
  .catch((e) => {
    next(e);
  });
}

const UserController = { self, register, login, logout }

export default UserController;
