import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Module document
interface IMaster extends Document {
  master_name: string;
  master_code: string;
  master_group: string;
  description?: string;
  web_icon: string;
  app_icon: string;
  color: string;
  status: 'active' | 'inactive';
}

// Define the schema
const MasterSchema = new Schema(
  {
    master_name: { type: String, required: true },
    master_code: { type: String, required: true, unique: true },
    master_group: { type: String, required: true },
    description: { type: String, default: null },
    web_icon: { type: String, default: null },
    app_icon: { type: String, default: null },
    color: { type: String, default: null },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the model
const Master =
  mongoose.models.Master || mongoose.model<IMaster>('Master', MasterSchema);

export default Master;
