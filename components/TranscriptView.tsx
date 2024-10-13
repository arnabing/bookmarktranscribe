import React from 'react';
import { Box, VStack, Text, Icon, Button, Flex, Heading, Divider } from '@chakra-ui/react';
import { FaQuestionCircle, FaCommentDots, FaBookmark, FaPlay, FaTrash, FaPlus } from 'react-icons/fa';
import { Bookmark, TranscriptEntry } from '../types';

interface TranscriptViewProps {
    selectedSection: string;
    bookmarks: Bookmark[];
    toggleBookmark: (item: TranscriptEntry, isBookmarked: boolean, currentSection: string) => Promise<void>;
    searchQuery: string;
    onPlayAudio: (startTime: number, audioUrl: string) => void;
    onDeleteBookmark: (bookmarkId: number) => void;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({
    selectedSection,
    bookmarks,
    toggleBookmark,
    searchQuery,
    onPlayAudio,
    onDeleteBookmark,
}) => {
    const currentFolderBookmarks = bookmarks.filter(b =>
        b.folderName === selectedSection &&
        b.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const suggestedBookmarks = bookmarks.filter(b =>
        b.folderName !== selectedSection &&
        b.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderBookmarkItem = (item: Bookmark, isSuggestion: boolean) => (
        <Box key={`${item.id}-${item.folderName}-${isSuggestion ? 'suggestion' : 'bookmark'}`} p={4} borderWidth="1px" borderRadius="md" mb={4}>
            <Flex alignItems="center" mb={2}>
                <Icon as={item.speaker === 'Q' ? FaQuestionCircle : FaCommentDots} color={item.speaker === 'Q' ? "blue.600" : "green.500"} boxSize={4} mr={2} />
                <Text fontWeight="bold" fontSize="sm">{item.speaker === 'Q' ? 'Question' : 'Answer'}</Text>
            </Flex>
            <Text fontSize="sm" mb={3}>{item.content}</Text>
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xs" color="gray.500">From: {item.folderName}</Text>
                <Flex>
                    {isSuggestion ? (
                        <Button onClick={() => toggleBookmark(item, false, selectedSection)} size="sm" leftIcon={<FaPlus />} colorScheme="green" variant="outline" mr={2}>
                            Add
                        </Button>
                    ) : (
                        <>
                            <Button onClick={() => onDeleteBookmark(item.id)} size="sm" leftIcon={<FaTrash />} colorScheme="red" variant="outline" mr={2}>
                                Delete
                            </Button>
                            <Button onClick={() => toggleBookmark(item, true, item.folderName)} size="sm" leftIcon={<FaBookmark />} colorScheme="yellow" variant="outline" mr={2}>
                                Remove
                            </Button>
                        </>
                    )}
                    <Button onClick={() => onPlayAudio(item.start_time, item.audioUrl)} size="sm" leftIcon={<FaPlay />} colorScheme="blue" variant="outline">
                        Play
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );

    return (
        <Box>
            <Heading as="h2" size="lg" mb={6}>{selectedSection}</Heading>
            <VStack spacing={8} align="stretch">
                <Box>
                    <Heading as="h3" size="md" mb={4}>Bookmarked Items</Heading>
                    {currentFolderBookmarks.length > 0 ? (
                        currentFolderBookmarks.map(item => renderBookmarkItem(item, false))
                    ) : (
                        <Text>No bookmarks in this folder yet.</Text>
                    )}
                </Box>
                <Divider />
                <Box>
                    <Heading as="h3" size="md" mb={4}>Suggestions</Heading>
                    {suggestedBookmarks.length > 0 ? (
                        suggestedBookmarks.map(item => renderBookmarkItem(item, true))
                    ) : (
                        <Text>No suggestions available.</Text>
                    )}
                </Box>
            </VStack>
        </Box>
    );
};
