import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        console.log('Database URL:', process.env.POSTGRES_URL); // Log the database URL (make sure to remove this in production)
        const result = await sql`SELECT NOW()`;
        return NextResponse.json({ success: true, time: result.rows[0].now });
    } catch (error: any) {
        console.error('Database connection error:', error);
        return NextResponse.json({ success: false, error: 'Database connection failed', details: error.message, stack: error.stack }, { status: 500 });
    }
}
