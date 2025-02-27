import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role_id: mongoose.Schema.Types.ObjectId;
  business_id: mongoose.Schema.Types.ObjectId;
  profile_picture?: string;
  status: 'active' | 'inactive';
}

const UserSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true }, // Linked to Role model
    business_id: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    }, // Linked to Business model
    profile_picture: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
