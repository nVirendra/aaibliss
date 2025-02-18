'use server';
import Master from '../models/Master';
import db from '../utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import EarningComponent from '../models/EarningComponent';
import Module from '../models/Module';
import PayrollSetting from '../models/PayrollSetting';

export async function fetchModuleById(id: string) {
  try {
    await db.connect();
    const module = await Module.findOne({ _id: id });
    return {
      success: !!module,
      message: module ? 'Module found!' : 'Module not found!',
      result: module ?? null,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      result: null,
    };
  }
}

export type State = {
  errors?: {
    masterName?: string[];
    masterCode?: string[];
    masterGroup?: string[];
    description?: string[];
    webIcon?: string[];
    appIcon?: string[];
    color?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createMaster(prevState: State, formData: FormData) {
  try {
    await db.connect();

    const masterName = formData.get('masterName');
    const description = formData.get('description');
    const masterCode = formData.get('masterCode');
    const masterGroup = formData.get('masterGroup');
    const webIcon = formData.get('webIcon');
    const appIcon = formData.get('appIcon');
    const color = formData.get('color');
    const status = formData.get('status');

    const newMaster = await Master.create({
      master_name: masterName,
      description,
      master_code: masterCode,
      master_group: masterGroup,
      web_icon: webIcon,
      app_icon: appIcon,
      color: color,
      status: status,
    });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      result: null,
    };
  }

  // Revalidate and redirect
  revalidatePath('/superadmin/masters');
  redirect('/superadmin/masters');
}

export async function fetchMasters() {
  try {
    await db.connect();
    const masters = await Master.find({}).lean(); // Get plain objects

    return JSON.parse(JSON.stringify(masters));
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      result: null,
    };
  }
}

export async function fetchMasterById(id: string) {
  try {
    await db.connect();
    const master = await Master.findOne({ _id: id });
    return {
      success: !!Master,
      message: master ? 'master found!' : 'master not found!',
      result: master ?? null,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      result: null,
    };
  }
}

export async function UpdateMaster(
  id: string,
  prevState: State,
  formData: FormData
) {
  try {
    const masterName = formData.get('masterName');
    const description = formData.get('description');
    const masterCode = formData.get('masterCode');
    const masterGroup = formData.get('masterGroup');
    const webIcon = formData.get('webIcon');
    const appIcon = formData.get('appIcon');
    const color = formData.get('color');
    const status = formData.get('status');

    const updatedModule = await Module.findByIdAndUpdate(id, {
      master_name: masterName,
      description: description,
      master_code: masterCode,
      master_group: masterGroup,
      web_icon: webIcon,
      app_icon: appIcon,
      color: color,
      status: status,
    });

    if (!updatedModule) {
      return { success: false, message: 'Master not found' };
    }
    return { success: true, message: 'Master updated Successfully' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      result: null,
    };
  }
}

export async function deleteMaster(id: string) {
  await db.connect();
  const deletedMaster = await Master.findByIdAndDelete(id);
  if (!deletedMaster) {
    return {
      success: false,
      message: 'Master Not found',
      result: null,
    };
  }
  revalidatePath('/superadmin/masters');
  return { message: 'Deleted Master.' };
}

export type EarningComponentFormData = {
  earningName: string;
  earningDescription: string;
  calculateProrataBasis: boolean;
  showPayslip: boolean;
  payslipName: string;
  calculationType: string;
  calculationThreshold: number;
  considerForPFCondition: 'Always' | 'If PF Wage < 15k';
  considerForPF: boolean;
  considerForESIC: boolean;
  isTaxable: boolean;
  status: 'Active' | 'Inactive';
};
export async function CreateEarningComponent(data: EarningComponentFormData) {
  try {
    await db.connect();
    const newEarningComponent = await EarningComponent.create({
      earningName: data.earningName,
      earningDescription: data.earningDescription,
      calculateProrataBasis: data.calculateProrataBasis,
      showPayslip: data.showPayslip,
      payslipName: data.payslipName,
      calculationType: data.calculationType,
      calculationThreshold: data.calculationThreshold,
      considerForPFCondition: data.considerForPFCondition,
      considerForPF: data.considerForPF,
      considerForESIC: data.considerForESIC,
      isTaxable: data.isTaxable,
      status: data.status,
    });

    // Convert MongoDB document to a plain object and stringify _id
    const serializedEarningComponent = {
      ...newEarningComponent.toObject(),
      _id: newEarningComponent._id.toString(), // Convert ObjectId to string
      createdAt: newEarningComponent.createdAt.toISOString(), // Convert Date to string
      updatedAt: newEarningComponent.updatedAt.toISOString(),
    };

    return {
      success: true,
      message: 'Earning Component created successfully.',
      result: serializedEarningComponent,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      result: null,
    };
  }
}

export interface PayrollSettingsFormData {
  basicCalculationType: string;
  basicPercentage: number;
  basicFixedAmount: number;

  conveyanceCalculationType: string;
  conveyancePercentage: number;
  conveyanceFixedAmount: number;

  daCalculationType: string;
  daPercentageOfBasic: number;

  hraCalculationType: string;
  hraPercentageOfBasic: number;

  medicalCalculationType: string;
  medicalFixedAmount: number;
  medicalThresholdPercentage: number;

  otherCalculationType: string;
  otherFixedAmount: number;

  otherIncomeCalculationType: string;
  otherIncomeFixedAmount: number;
}

/** Create or update a single payroll setting record */
export async function savePayrollSettings(data: PayrollSettingsFormData) {
  try {
    await db.connect();

    // If you only keep one settings document, we can do an upsert:
    const settings = await PayrollSetting.findOneAndUpdate(
      {},
      { ...data },
      { upsert: true, new: true }
    );

    return {
      success: true,
      data: settings.toObject(),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Unknown error',
    };
  }
}

/** Fetch existing settings (if any) */
export async function getPayrollSettings() {
  await db.connect();
  const settings = await PayrollSetting.findOne({});
  return settings ? settings.toObject() : null;
}
