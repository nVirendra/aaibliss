'use server';
import Master from '../models/Master';
import db from '../utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    const masters = await Master.find({});
    return masters;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      result: null,
    };
  }
}
