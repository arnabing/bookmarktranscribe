import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
    const folder = request.nextUrl.searchParams.get('folder');

    if (!folder) {
        return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
    }

    try {
        const result = await sql`
            SELECT quote, created_at
            FROM bookmarks
            WHERE folder_name = ${folder}
            ORDER BY created_at DESC
        `;

        const csvContent = [
            ['Quote', 'Created At'],
            ...result.rows.map(row => [
                `"${row.quote.replace(/"/g, '""')}"`,
                new Date(row.created_at).toISOString()
            ])
        ].join('\n');

        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${folder}_bookmarks.csv"`
            }
        });
    } catch (error) {
        console.error('Error exporting bookmarks:', error);
        return NextResponse.json({ error: 'Error exporting bookmarks' }, { status: 500 });
    }
}
