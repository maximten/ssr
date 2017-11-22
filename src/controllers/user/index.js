import User from '../../models/User';
import streamToPromise from 'stream-to-promise';
import fs from 'fs';
import _ from 'lodash';

function register(req, res, next) {
  let newPath;
  let { email, password } = req.body;
  const { avatar } = req.files;
  password = password ? User.hash(password) : null;
  const model = new User({ email, password });
  model.save()
  .then((item) => {
    if (avatar.size) {
      const extenstion = avatar.path.split('.').pop();
      const filename = User.hash(avatar.originalFilename) + '.' + extenstion;
      newPath = `/store/${filename}`;
      const stream = fs.createReadStream(avatar.path)
      .pipe(fs.createWriteStream(`public${newPath}`));
      return streamToPromise(stream);
    }
  })
  .then(() => {
    if (avatar.size) {
      model.avatar = newPath;
      return model.save();
    }
  })
  .then(() => {
    req.session.user_id = model._id;
    req.session.save((err) => {
      const { email, avatar } = model;
      res.json({ email, avatar });
    });
  })
  .catch((e) => {
    const message = e.code === 11000 ?
    { email : "This email already taken" } :
    _.mapValues(e.errors, (item => item.kind)); 
    const error = {
      status: 400,
      message: message
    };
    next(error);
  });
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email: email })
  .then((item) => {
    if (item && item.authenticate(password)) {
      req.session.user_id = item._id;
      req.session.save((err) => {
        const { email, avatar } = item;
        res.json({ email, avatar });
      });
    } else {
      throw {
        status: 400,
        message: {
          email: "Email or password incorrect"
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
      const { email, avatar } = item;
      res.json({ email, avatar });
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
