import Post from '../models/Post';

const getInitialState = (req) => {
  if (req.path == '/') {
    return Post.list({limit: 50, skip: 0}).then((items) => {
      return { posts: { items } };
    });
  } else if (req.path.match(/^\/posts\/.+/g)) {
    return Post.getBySlug(req.path.replace(/\/posts\//g, '')).then((item) => {
      return { posts: { items : [item] } };
    });
  } else {
    return Promise.resolve(null);
  }
};

export default getInitialState;