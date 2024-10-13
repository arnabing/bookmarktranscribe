export interface TranscriptEntry {
    id: number;
    start_time: number;
    speaker: string;
    content: string;
}

export interface Bookmark extends TranscriptEntry {
    folderName: string;
    audioUrl: string;
}

export interface Interview {
    id: number;
    title: string;
    audio_url: string;
    transcript_entries: TranscriptEntry[];
    ai_summary: string;
}
