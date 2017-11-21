import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  preview: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

PostSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((item) => {
        if (item) {
          return item;
        } else {
          return Promise.reject('No such item exists!');
        }
      });
  },
  getBySlug(slug) {
    return this.findOne({ slug })
      .exec()
      .then((item) => {
        if (item) {
          return item;
        } else {
          return Promise.reject('No such item exists!');
        }
      });
  },
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
}

export default mongoose.model('Post', PostSchema); 
