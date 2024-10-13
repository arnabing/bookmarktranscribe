import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface TranscriptEntry {
    id: number;
    start_time: number;
    speaker: string;
    content: string;
}

interface Interview {
    id: number;
    title: string;
    audio_url: string;
    transcript_entries: TranscriptEntry[];
}

export async function GET() {
    try {
        const result = await sql`
            SELECT i.*, 
                   (SELECT json_agg(te.* ORDER BY te.start_time)
                    FROM transcript_entries te
                    WHERE te.interview_id = i.id) as transcript_entries
            FROM interviews i
            ORDER BY i.created_at DESC
        `;
        console.log('Raw database result:', JSON.stringify(result.rows, null, 2));

        const interviews: Interview[] = result.rows.map((row: any) => ({
            id: row.id,
            title: row.title,
            audio_url: row.audio_url,
            transcript_entries: row.transcript_entries || []
        }));

        console.log('Processed interviews data:', JSON.stringify(interviews, null, 2));
        console.log('First transcript entry:', interviews[0]?.transcript_entries[0]);

        return NextResponse.json(interviews);
    } catch (error: unknown) {
        console.error('Error fetching interviews:', error);
        const errorMessage = typeof error === 'string' ? error : (error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({ error: 'Error fetching interviews', details: errorMessage }, { status: 500 });
    }
}
