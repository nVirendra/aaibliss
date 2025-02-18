import mongoose, { Schema, Document } from 'mongoose';

// Define the Earning Component interface
interface IEarningComponent extends Document {
  earningName: string;
  earningDescription?: string;
  calculateProrataBasis: boolean;
  showPayslip: boolean;
  payslipName?: string;
  calculationType: 'ctc_percentage' | 'basic_percentage' | 'fixed';
  calculationThreshold: number;
  considerForPFCondition: 'Always' | 'If PF Wage < 15k';
  considerForPF: boolean;
  considerForESIC: boolean;
  isTaxable: boolean;
  status: 'Active' | 'Inactive';
}

// Define the Earning Component schema
const earningComponentSchema = new Schema(
  {
    earningName: { type: String, required: true },
    earningDescription: { type: String },
    calculateProrataBasis: { type: Boolean, default: false },
    showPayslip: { type: Boolean, default: false },
    payslipName: { type: String },
    calculationType: {
      type: String,
      enum: ['ctc_percentage', 'basic_percentage', 'fixed'],
      required: true,
    },
    calculationThreshold: { type: Number, required: true },
    considerForPFCondition: {
      type: String,
      enum: ['Always', 'If PF Wage < 15k'],
      required: true,
    },
    considerForPF: { type: Boolean, default: false },
    considerForESIC: { type: Boolean, default: false },
    isTaxable: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create and export the model
const EarningComponent =
  mongoose.models.EarningComponent ||
  mongoose.model<IEarningComponent>('EarningComponent', earningComponentSchema);

export default EarningComponent;
