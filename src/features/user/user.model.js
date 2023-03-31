import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  roles: Number
});

export const UserModel = mongoose.model('User', schema);
