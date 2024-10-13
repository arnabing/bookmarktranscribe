import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { BookmarkButton } from './BookmarkButton';

interface TranscriptProps {
    transcript: {
        id: number;
        title: string;
        questionAnswers: {
            id: number;
            question: string;
            answer: string;
        }[];
    };
    onBookmark: (transcriptId: number, questionAnswerId: number, quote: string, folderId: number) => void;
}

export const Transcript: React.FC<TranscriptProps> = ({ transcript, onBookmark }) => {
    return (
        <Box borderWidth={1} borderRadius="lg" p={4} mb={4}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
                {transcript.title}
            </Text>
            <VStack align="stretch" spacing={4}>
                {transcript.questionAnswers.map((qa) => (
                    <Box key={qa.id}>
                        <Text fontWeight="bold">{qa.question}</Text>
                        <Text>{qa.answer}</Text>
                        <BookmarkButton
                            onBookmark={(folderId) => onBookmark(transcript.id, qa.id, qa.answer, folderId)}
                        />
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};
