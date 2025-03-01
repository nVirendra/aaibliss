import mongoose, { Schema, Document } from 'mongoose';
import { IState, ICurrency } from '../lib/definitions';

interface ICountry extends Document {
  name: string;
  code: string;
  states: IState[];
  currency: ICurrency;
}

const StateSchema = new Schema<IState>({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const CountrySchema = new Schema<ICountry>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  states: [StateSchema],
  currency: {
    code: { type: String, required: true },
    symbol: { type: String, required: true },
  },
});

const Country =
  mongoose.models.Country || mongoose.model<ICountry>('Country', CountrySchema);

export default Country;
