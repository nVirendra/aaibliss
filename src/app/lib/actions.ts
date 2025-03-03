'use server';
import Master from '../models/Master';
import db from '../utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import EarningComponent from '../models/EarningComponent';
import Module from '../models/Module';
import PayrollSetting from '../models/PayrollSetting';
import Business from '../models/Business';
import slugify from 'slugify';
import Country from '../models/Country';
import { z } from 'zod';

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

const businessSchema = z
  .object({
    businessName: z
      .string()
      .min(2, 'Business name must be at least 2 characters long'),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
    address: z.string().min(5, 'Address must be at least 5 characters long'),
    selectedCountry: z.string().nonempty('Country is required'),
    selectedState: z.string().nonempty('State is required'),
    cityName: z.string().optional(),
    streetName: z.string().optional(),
    businessType: z.string().nonempty('Business type is required'),
    businessCategory: z.string().nonempty('Business category is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type BusinessState = {
  errors?: {
    businessName?: string[];
    registrationNumber?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    confirmPassword?: string[];
    address?: string[];
    selectedCountry?: string[];
    selectedState?: string[];
    businessType?: string[];
    businessCategory?: string[];
  };
  message?: string | null;
};

export async function createBusiness(
  prevState: BusinessState,
  formData: FormData
): Promise<BusinessState> {
  try {
    // Validate form data
    const validatedFields = businessSchema.safeParse({
      businessName: formData.get('businessName'),
      registrationNumber: formData.get('registrationNumber'),
      selectedCountry: formData.get('selectedCountry'),
      selectedState: formData.get('selectedState'),
      cityName: formData.get('cityName'),
      streetName: formData.get('streetName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      address: formData.get('address'),

      businessType: formData.get('businessType'),
      businessCategory: formData.get('businessCategory'),
    });

    // If validation fails, return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing or invalid fields. Please check your input.',
      };
    }

    // Connect to the database
    await db.connect();

    // Create a business slug
    const businessName = formData.get('businessName') as string;
    const businessSlug = slugify(businessName, { lower: true, strict: true });

    // Create the business
    await Business.create({
      business_name: businessName,
      business_slug: businessSlug,
      registration_number: formData.get('registrationNumber'),
      email: formData.get('email'),
      contact_number: formData.get('phone'),
      address: {
        street: formData.get('streetName'),
        city: formData.get('cityName'),
        state: formData.get('selectedState'),
        postal_code: formData.get('postalCode'),
        country: formData.get('selectedCountry'),
      },
      business_type: formData.get('businessType'),
      business_category: formData.get('businessCategory'),
    });

    return { message: 'Business registered successfully!' };
  } catch (error) {
    console.error('Error creating business:', error);
    return {
      message: 'Failed to register business. Please try again.',
    };
  }
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
    if (!id) {
      return { success: false, message: 'Invalid master ID' };
    }

    const masterName = formData.get('masterName')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const masterCode = formData.get('masterCode')?.toString() || '';
    const masterGroup = formData.get('masterGroup')?.toString() || '';
    const webIcon = formData.get('webIcon')?.toString() || '';
    const appIcon = formData.get('appIcon')?.toString() || '';
    const color = formData.get('color')?.toString() || '';
    const status = formData.get('status')?.toString() || 'inactive';

    const updatedMaster = await Master.findByIdAndUpdate(
      id,
      {
        master_name: masterName,
        description: description,
        master_code: masterCode,
        master_group: masterGroup,
        web_icon: webIcon,
        app_icon: appIcon,
        color: color,
        status: status,
      },
      { new: true } // Ensures the updated document is returned
    );

    if (!updatedMaster) {
      return { success: false, message: 'Master not found' };
    }

    const serializedMaster = {
      ...updatedMaster.toObject(),
      _id: updatedMaster._id.toString(), // Convert ObjectId to string
      createdAt: updatedMaster.createdAt.toISOString(), // Convert Date to string
      updatedAt: updatedMaster.updatedAt.toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Revalidate and redirect
  revalidatePath('/superadmin/masters');
  redirect('/superadmin/masters');
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

export async function getCountry() {
  try {
    await db.connect();
    const countries = await Country.find({});
    return JSON.parse(JSON.stringify(countries)); // Convert to plain JSON
  } catch (error) {
    console.log('Error getting countries', error);
    return [];
  }
}
