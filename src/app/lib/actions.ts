'use server';
import Module from '../models/Module';
import db from '../utils/db';
import { NextResponse } from 'next/server';

export async function createModule(
  moduleName: string,
  description: string,
  moduleCode: string,
  icon: string,
  basePrice: number,
  status: string
) {
  try {
    db.connect();
    const data = {
      module_name: moduleName,
      module_code: moduleCode,
      description,
      icon,
      base_price: basePrice,
      status,
    };
    const newModule = await Module.create(data);
    return NextResponse.json({
      message: 'Module Created successfully!',
      status: 200,
      newModule,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create module',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function updateModule() {
  return 'write some logic';
}

export async function deleteModule() {
  return 'write some logic';
}
