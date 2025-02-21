import { NextResponse } from 'next/server';
import db from '@/app/utils/db';
import User from '@/app/models/User';
import { generateToken } from '@/app/utils/auth';

export async function POST(req: Request) {
  try {
    await db.connect();

    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        {
          message: 'Invalid Credential!',
          status: 200,
        },
        { status: 200 }
      );
    }

    const response = NextResponse.json({
      message: 'Login Suceesfully!',
      status: true,
    });

    const token = generateToken(user._id);
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,

      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return response;
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
