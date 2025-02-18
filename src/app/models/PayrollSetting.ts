import { Schema, model, models } from 'mongoose';

const PayrollSettingSchema = new Schema(
  {
    // Basic Salary
    basicCalculationType: {
      type: String, // e.g. "fixed" or "percentage_of_ctc"
      default: 'percentage_of_ctc',
    },
    basicPercentage: {
      type: Number, // used if basicCalculationType = "percentage_of_ctc"
      default: 30,
    },
    basicFixedAmount: {
      type: Number, // used if basicCalculationType = "fixed"
      default: 0,
    },

    // Conveyance Allowance
    conveyanceCalculationType: {
      type: String, // e.g. "fixed" or "percentage_of_ctc"
      default: 'fixed',
    },
    conveyancePercentage: {
      type: Number, // used if conveyanceCalculationType = "percentage_of_ctc"
      default: 0,
    },
    conveyanceFixedAmount: {
      type: Number, // used if conveyanceCalculationType = "fixed"
      default: 1600,
    },

    // DA
    daCalculationType: {
      type: String, // e.g. "percentage_of_basic"
      default: 'percentage_of_basic',
    },
    daPercentageOfBasic: {
      type: Number, // used if daCalculationType = "percentage_of_basic"
      default: 25,
    },

    // HRA
    hraCalculationType: {
      type: String, // e.g. "percentage_of_basic"
      default: 'percentage_of_basic',
    },
    hraPercentageOfBasic: {
      type: Number, // used if hraCalculationType = "percentage_of_basic"
      default: 30,
    },

    // Medical Allowance
    medicalCalculationType: {
      type: String, // e.g. "fixed", "percentage_of_ctc", or "threshold_of_basic"
      default: 'fixed',
    },
    medicalFixedAmount: {
      type: Number,
      default: 1250,
    },
    medicalThresholdPercentage: {
      type: Number, // if you want a threshold, e.g. 10% of Basic
      default: 0,
    },

    // Other Allowance
    otherCalculationType: {
      type: String, // e.g. "fixed" or "remainder" (some companies set the leftover as 'other allowance')
      default: 'fixed',
    },
    otherFixedAmount: {
      type: Number,
      default: 0,
    },

    // Other Income
    otherIncomeCalculationType: {
      type: String, // e.g. "fixed" or "variable"
      default: 'fixed',
    },
    otherIncomeFixedAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PayrollSetting =
  models.PayrollSetting || model('PayrollSetting', PayrollSettingSchema);

export default PayrollSetting;
