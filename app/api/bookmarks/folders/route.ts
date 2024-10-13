import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const result = await sql`
            SELECT DISTINCT folder_name 
            FROM bookmarks 
            ORDER BY folder_name
        `;
        return NextResponse.json(result.rows.map(row => row.folder_name));
    } catch (error) {
        console.error('Error fetching bookmark folders:', error);
        return NextResponse.json({ error: 'Error fetching bookmark folders' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        await sql`
            INSERT INTO bookmarks (folder_name, quote) 
            VALUES (${name}, '')
        `;
        return NextResponse.json({ success: true, message: 'Folder created successfully' });
    } catch (error) {
        console.error('Error creating bookmark folder:', error);
        return NextResponse.json({ error: 'Error creating bookmark folder' }, { status: 500 });
    }
}
