import mongoose from 'mongoose';
import faker from 'faker';
import Post from '../models/Post';
import config from '../config';

mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.host}`);
});

Post.remove({}).then(() => {
  let count = 100;
  const models = [];
  while (count--) {
    const model = new Post({
      title: faker.lorem.word(),
      preview: faker.lorem.paragraph(),
      text: faker.lorem.paragraphs(),
      slug: faker.lorem.slug(),
    });
    models.push(model);
  }
  const resovle = () => {
    if (models.length) {
      models.shift().save().then((item) => {
        console.log(item);
        resovle();
      });
    } else {
      process.exit(0);
    }
  };
  resovle();
});

