import { Document, model, Model, Schema } from 'mongoose';

interface IUserDetail {
  name: string;
  avatar: string;
  work_mail: string;
  phone: number;
  created_at: string;
  updated_at: string;
}
export type UserDetailDocument = IUserDetail & Document;

const UserDetailSchema: Schema = new Schema({
  name: { type: String, required: false, default: '' },
  avatar: { type: String, required: false },
  work_mail: { type: String, required: false, default: '' },
  phone: { type: Number, required: false, default: 0 },
  created_at: { type: Date, required: false, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
  isActive: { type: Boolean, required: false, default: false }
});

const UserDetail: Model<UserDetailDocument> = model(
  'UserDetail',
  UserDetailSchema
);
export default UserDetail;
