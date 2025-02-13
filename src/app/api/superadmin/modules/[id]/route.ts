import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/utils/db';
import Module from '@/app/models/Module';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id; // Extract the ID from the URL

  try {
    db.connect();
    const body = await req.json();
    const { moduleName, description, moduleCode, icon, basePrice, status } =
      body;

    const updatedModule = await Module.findByIdAndUpdate(id, {
      module_name: moduleName,
      module_code: moduleCode,
      description: description,
      icon,
      base_price: basePrice,
      status,
    });

    if (!updatedModule) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: 'Module updated successfully',
      result: '',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.connect(); // Connect to MongoDB
    const id = params.id; // Get the module ID from the URL
    const deletedModule = await Module.findByIdAndDelete(id);

    if (!deletedModule) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Module deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
