import User from '../../models/User';
import streamToPromise from 'stream-to-promise';
import fs from 'fs';

function register(req, res, next) {
  let newPath;
  const { login, email, password } = req.body;
  const { avatar } = req.files;
  const hashed_password = User.hash(password);
  const model = new User({ login, email, hashed_password });
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
    res.json('ok');
  })
  .catch((e) => {
    next(e);
  });
}

function login(req, res, next) {
  const { login, password } = req.body;
  User.findOne({ login: login})
  .then((item) => {
    if (item && item.authenticate(password)) {
      req.session.user_id = item._id;
    } 
    req.session.save(() => {
      res.json('ok');
    });
  })
  .catch((e) => {
    next(e);
  });
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

const UserController = { self, register, login }

export default UserController;
