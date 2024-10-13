import React from 'react';
import { Box, VStack, Text, Icon, Button, Flex, Heading } from '@chakra-ui/react';
import { FaQuestionCircle, FaCommentDots, FaBookmark, FaPlay } from 'react-icons/fa';
import { Bookmark, TranscriptEntry } from '../types';

interface InterviewPlayerProps {
    title: string;
    audioUrl: string;
    transcriptEntries: TranscriptEntry[];
    bookmarks: Bookmark[];
    toggleBookmark: (item: TranscriptEntry, isBookmarked: boolean, currentSection: string) => Promise<void>;
    searchQuery: string;
    onPlayAudio: (startTime: number, audioUrl: string) => void;
    currentTime: number;
    isPlaying: boolean;
    aiSummary: string;
}

export const InterviewPlayer: React.FC<InterviewPlayerProps> = ({
    title,
    audioUrl,
    transcriptEntries,
    bookmarks,
    toggleBookmark,
    searchQuery,
    onPlayAudio,
    currentTime,
    isPlaying,
    aiSummary,
}) => {
    const filteredEntries = transcriptEntries.filter(entry =>
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderTranscriptItem = (item: TranscriptEntry) => {
        const isBookmarked = bookmarks.some(b => b.id === item.id);
        return (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Flex alignItems="center" mb={2}>
                    <Icon as={item.speaker === 'Q' ? FaQuestionCircle : FaCommentDots} color={item.speaker === 'Q' ? "blue.600" : "green.500"} boxSize={4} mr={2} />
                    <Text fontWeight="bold" fontSize="sm">{item.speaker === 'Q' ? 'Question' : 'Answer'}</Text>
                </Flex>
                <Text fontSize="sm" mb={3}>{item.content}</Text>
                <Flex justifyContent="flex-end">
                    <Button onClick={() => toggleBookmark(item, isBookmarked, title)} size="sm" colorScheme={isBookmarked ? "red" : "gray"} variant="outline" mr={2}>
                        <Icon as={FaBookmark} />
                    </Button>
                    <Button onClick={() => onPlayAudio(item.start_time, audioUrl)} size="sm" leftIcon={<FaPlay />} colorScheme="blue" variant="outline">
                        Play
                    </Button>
                </Flex>
            </Box>
        );
    };

    return (
        <Box>
            <Heading as="h2" size="lg" mb={4}>{title}</Heading>
            <Box p={4} borderWidth="1px" borderRadius="md" mb={6} bg="gray.50">
                <Heading as="h3" size="md" mb={2}>AI Summary</Heading>
                <Text>{aiSummary}</Text>
            </Box>
            <VStack spacing={4} align="stretch">
                {filteredEntries.map(renderTranscriptItem)}
            </VStack>
        </Box>
    );
};
