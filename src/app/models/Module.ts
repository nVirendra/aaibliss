import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Module document
interface IModule extends Document {
  module_name: string;
  module_code: string;
  description?: string;
  icon: string;
  base_price: number;
  image: string;
  status: 'active' | 'inactive';
}

// Define the schema
const ModuleSchema = new Schema(
  {
    module_name: { type: String, required: true },
    module_code: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String, required: true },
    base_price: { type: Number, required: true },
    image: { type: String, required: true },
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
const Module =
  mongoose.models.Module || mongoose.model<IModule>('Module', ModuleSchema);

export default Module;
