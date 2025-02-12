import { NextResponse } from 'next/server';
import db from '@/app/utils/db';
import Module from '@/app/models/Module';

export async function POST(req: Request) {
  try {
    await db.connect();
    const body = await req.json();

    const newModule = await Module.create({
      module_name: body.moduleName,
      module_code: body.moduleCode,
      description: body.description,
      icon: body.icon,
      base_price: body.basePrice,
      status: body.status,
    });

    return NextResponse.json(
      {
        message: 'Module Created successfully!',
        status: 200,
        newModule,
      },
      { status: 200 }
    );
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

export async function GET() {
  try {
    await db.connect();

    const modules = await Module.find({});

    return Response.json(modules);
  } catch (error) {
    return NextResponse.json({
      errors: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    });
  }
}
