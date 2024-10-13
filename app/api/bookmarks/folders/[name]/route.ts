import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function DELETE(
    request: Request,
    { params }: { params: { name: string } }
) {
    const folderName = params.name;

    try {
        // Delete all bookmarks in the folder
        await sql`DELETE FROM bookmarks WHERE folder_name = ${folderName}`;

        return NextResponse.json({ success: true, message: 'Bookmark folder deleted successfully' });
    } catch (error) {
        console.error('Error deleting bookmark folder:', error);
        return NextResponse.json({ error: 'Error deleting bookmark folder' }, { status: 500 });
    }
}
