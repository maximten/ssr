import mongoose from 'mongoose';
import faker from 'faker';
import Post from '../models/Post';
import User from '../models/User';
import config from '../config';

mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.host}`);
});

console.log(User.hash('aaa'));