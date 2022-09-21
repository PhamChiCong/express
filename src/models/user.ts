import { Schema, model, SchemaTypes } from 'mongoose';
const ncrypt = require('ncrypt-js');

interface IUser {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  is_activated: boolean;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: SchemaTypes.String, required: true, unique: true },
  password: { type: SchemaTypes.String },
  username:  { type: SchemaTypes.String, unique: true, required: true },
  firstname: { type: SchemaTypes.String },
  lastname: { type: SchemaTypes.String },
  is_activated: { type: SchemaTypes.Boolean, default: false },
  created_at: { type: SchemaTypes.Date },
  updated_at: { type: SchemaTypes.Date },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, collection: 'users', versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const UserModel = model<IUser>('User', UserSchema);
