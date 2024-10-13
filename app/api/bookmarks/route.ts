import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const result = await sql`SELECT * FROM bookmarks ORDER BY created_at DESC`;
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return NextResponse.json({ error: 'Error fetching bookmarks' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { folder_name, quote, transcript_entry_id } = await request.json();

        // Validate input
        if (!folder_name || !quote || !transcript_entry_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const result = await sql`
            INSERT INTO bookmarks (folder_name, quote, transcript_entry_id)
            VALUES (${folder_name}, ${quote}, ${transcript_entry_id})
            RETURNING *
        `;

        console.log('Bookmark created:', result.rows[0]);
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding bookmark:', error);
        return NextResponse.json({ error: 'Error adding bookmark' }, { status: 500 });
    }
}
