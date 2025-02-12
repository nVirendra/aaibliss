'use server';
import Module from '../models/Module';
import db from '../utils/db';

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
