import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

UserSchema.statics.hash = function (value) { 
  return crypto
  .createHmac('sha1', 'secret')
  .update(value)
  .digest('hex'); 
};

UserSchema.methods.authenticate = function (password) {
  return this.password === this.model('User').hash(password);
};

export default mongoose.model('User', UserSchema); 
