import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await sql`DELETE FROM bookmarks WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        return NextResponse.json({ error: 'Error deleting bookmark' }, { status: 500 });
    }
}
