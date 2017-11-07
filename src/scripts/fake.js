import mongoose from 'mongoose';
import faker from 'faker';
import Post from '../models/Post';
import config from '../config';

mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.host}`);
});

let count = 100;

Post.remove({}).then(() => {
  const promises = [];
  while (count--) {
    const model = new Post({
      title: faker.lorem.word(),
      preview: faker.lorem.paragraph(),
      text: faker.lorem.paragraphs(),
      slug: faker.lorem.slug(),
    });
    promises.push(model.save());
  }
  Promise.all(promises).then((items) => {
    console.log('done');
    process.exit(0);
  });
});

