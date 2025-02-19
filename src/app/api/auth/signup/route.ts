import { NextResponse } from 'next/server';

import db from '@/app/utils/db';
import User from '@/app/models/User';
import { generateToken } from '@/app/utils/auth';

export async function POST(req: Request) {
  try {
    await db.connect();

    const { name, email, password } = await req.json();
    console.log(name, email, password);
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return NextResponse.json(
      {
        message: 'Module Created successfully!',
        status: 200,
        user,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      {
        message: 'Failed to create muser',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
