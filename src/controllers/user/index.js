import User from '../../models/User';

function register(req, res, next) {
  const { email, password } = req.body;
  const hashed_password = User.hash(password);
  const model = new User({ email, hashed_password });
  model.save()
  .then(item => res.json('ok'))
  .catch(e => next(e));
}

const UserController = { register }

export default UserController;
