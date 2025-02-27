import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import Business from '@/app/models/Business';
import User from '@/app/models/User';
import Role from '@/app/models/Role';
import db from '@/app/utils/db';

export async function POST(req: Request) {
  try {
    await db.connect();
    const {
      businessName,
      businessType,
      businessCategory,
      email,
      phone,
      address,
      password,
    } = await req.json();

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }

    // Create Business Entry
    const newBusiness = new Business({
      name: businessName,
      type: businessType,
      category: businessCategory,
      address,
      phone,
    });

    const savedBusiness = await newBusiness.save();

    // Find or Create Admin Role
    let adminRole = await Role.findOne({
      business_id: savedBusiness._id,
      name: 'Admin',
    });
    if (!adminRole) {
      adminRole = new Role({
        business_id: savedBusiness._id,
        name: 'Admin',
        permissions: ['manage_users', 'view_reports'],
        status: 'active',
      });
      await adminRole.save();
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User with Admin Role
    const newUser = new User({
      first_name: 'Business',
      last_name: 'Owner',
      email,
      phone,
      password: hashedPassword,
      role_id: adminRole._id,
      business_id: savedBusiness._id,
      status: 'active',
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: 'Business and Admin user created successfully',
        business: savedBusiness,
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
