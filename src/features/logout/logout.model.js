import mongoose from 'mongoose';

const tokensSchema = new mongoose.Schema({
  refresh_token: String
});

export const UserReFreshToken = mongoose.model(
  'user_refresh_token',
  tokensSchema
);
