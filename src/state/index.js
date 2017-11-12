import Post from '../models/Post';
import User from '../models/User';

const getInitialState = (req) => {
  const promises = [];
  if (req.session.user_id) {
    const promise = User.findOne({ _id: req.session.user_id }).then((user) => {
      const { login, email, avatar } = user;
      return { user: { user: { login, email, avatar } } };
    });
    promises.push(promise);
  }
  if (req.path == '/') {
    const promise = Post.list({limit: 50, skip: 0}).then((items) => {
      return { posts: items };
    });
    promises.push(promise);
  } 
  if (req.path.match(/^\/posts\/.+/g)) {
    const promise = Post.getBySlug(req.path.replace(/\/posts\//g, '')).then((item) => {
      return { posts: { items: [item] } };
    });
    promises.push(promise);
  }
  return Promise.all(promises).then((states) => {
    return states.reduce((carry, state) => {
      return Object.assign(carry, state);
    }, {});
  });
};

export default getInitialState;