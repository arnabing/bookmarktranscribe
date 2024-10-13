'use client';

import React, { useEffect, useState } from 'react';
import { Box, VStack, Button, Text } from '@chakra-ui/react';
import { Transcript } from './Transcript';
import Link from 'next/link';

interface TranscriptData {
    id: number;
    title: string;
    questionAnswers: {
        id: number;
        question: string;
        answer: string;
    }[];
}

export const Transcripts: React.FC = () => {
    const [transcripts, setTranscripts] = useState<TranscriptData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTranscripts();
    }, []);

    const fetchTranscripts = async () => {
        try {
            const response = await fetch('/api/transcripts');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch transcripts: ${errorData.error}, ${errorData.details}`);
            }
            const data = await response.json();
            console.log('Fetched transcripts:', data);
            setTranscripts(data);
        } catch (error) {
            console.error('Error fetching transcripts:', error);
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    const handleBookmark = async (transcriptId: number, questionAnswerId: number, quote: string, folderId: number) => {
        const response = await fetch('/api/bookmarks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                folder_id: folderId,
                transcript_id: transcriptId,
                question_answer_id: questionAnswerId,
                quote,
            }),
        });

        if (response.ok) {
            alert('Bookmark added successfully!');
        } else {
            alert('Error adding bookmark');
        }
    };

    if (error) {
        return <Box p={4}><Text color="red.500">{error}</Text></Box>;
    }

    return (
        <Box p={4}>
            <Link href="/bookmarks" passHref legacyBehavior>
                <Button as="a" mb={4}>View Bookmarks</Button>
            </Link>
            <VStack align="stretch" spacing={4}>
                {transcripts.map((transcript) => (
                    <Transcript
                        key={transcript.id}
                        transcript={transcript}
                        onBookmark={handleBookmark}
                    />
                ))}
            </VStack>
        </Box>
    );
};
