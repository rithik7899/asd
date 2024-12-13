// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { Pool } from '@neondatabase/serverless';

// export const runtime = 'nodejs'; // Use 'nodejs' runtime for stability

// export async function GET(request: Request) {
//   const neon = new Pool({ connectionString: process.env.DATABASE_URL });
//   const adapter = new PrismaNeon(neon);
//   const prisma = new PrismaClient();

//   try {
//     const users = await prisma.user.findMany();

//     if (!users) {
//       return NextResponse.json({ error: 'No users found' }, { status: 404 });
//     }

//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
