import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/utils/auth';

export async function GET(req: Request) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      {
        message: 'No token provided',
        status: 200,
      },
      { status: 200 }
    );
  }

  try {
    const decoded = verifyToken(token);
    return {
      status: true,
      message: 'Protected route accessed',
      result: decoded,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
      result: null,
    };
  }
}
