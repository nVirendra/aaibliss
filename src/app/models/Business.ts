import mongoose, { Schema, Document } from 'mongoose';

interface IAddress {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface IBusiness extends Document {
  business_name: string;
  business_slug: string;
  registration_number: string;
  address: IAddress;
  contact_number: string;
  email: string;
  business_type: mongoose.Schema.Types.ObjectId;
  business_category: mongoose.Schema.Types.ObjectId;
  status: 'active' | 'inactive';
}

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  }, // Linking to Country model
});

const BusinessSchema = new Schema(
  {
    business_name: { type: String, required: true },
    business_slug: { type: String, required: true, unique: true },
    registration_number: { type: String, required: true },
    address: AddressSchema,
    contact_number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    business_type: {
      type: Schema.Types.ObjectId,
      ref: 'Master',
      required: true,
    },
    business_category: {
      type: Schema.Types.ObjectId,
      ref: 'Master',
      required: true,
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  {
    timestamps: true,
  }
);

const Business =
  mongoose.models.Business ||
  mongoose.model<IBusiness>('Business', BusinessSchema);

export default Business;
