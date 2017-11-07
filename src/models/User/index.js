import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  }
});

UserSchema.statics.hash = (value) => { return crypto.createHmac('sha1', (new Date()).toString()).update(value).digest('hex') };

export default mongoose.model('User', UserSchema); 
