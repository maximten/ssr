import Post from '../../models/Post';

function query(req, res, next) {
  const { limit = 50, skip = 0, slug } = req.query;
  if (slug) {
    Post.getBySlug(slug)
    .then(item => res.json(item))
    .catch(e => next(e));
  } else {
    Post.list({ limit, skip })
    .then(items => res.json(items))
    .catch(e => next(e));
  }
}

function add(req, res, next) {
  const model = new Post(req.body);
  model.save()
  .then(item => res.json(item))
  .catch(e => next(e));
}

const postsController = { query, add }

export default postsController;
