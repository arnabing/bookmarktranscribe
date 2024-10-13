'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';
import { BookmarkFolder } from './BookmarkFolder';
import Link from 'next/link';

interface Bookmark {
    id: number;
    folder_name: string;
    quote: string;
    created_at: string;
}

export const Bookmarks: React.FC = () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/bookmarks');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch bookmarks: ${errorData.error}, ${errorData.details}`);
            }
            const data = await response.json();
            setBookmarks(data);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to fetch bookmarks',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateFolder = async (name: string) => {
        // Implement folder creation logic
    };

    const handleExportCSV = () => {
        // Implement CSV export logic
    };

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box p={4}>
            <Link href="/" passHref legacyBehavior>
                <Button as="a" mb={4}>Back to Transcripts</Button>
            </Link>
            <BookmarkFolder onCreateFolder={handleCreateFolder} />
            <Button onClick={handleExportCSV} mt={4} colorScheme="green">
                Export to CSV
            </Button>
            <VStack align="stretch" spacing={4} mt={8}>
                {bookmarks.length === 0 ? (
                    <Text>No bookmarks found.</Text>
                ) : (
                    bookmarks.map((bookmark) => (
                        <Box key={bookmark.id} borderWidth={1} borderRadius="lg" p={4}>
                            <Text fontWeight="bold">{bookmark.folder_name}</Text>
                            <Text>{bookmark.quote}</Text>
                            <Text fontSize="sm" color="gray.500">
                                {new Date(bookmark.created_at).toLocaleString()}
                            </Text>
                        </Box>
                    ))
                )}
            </VStack>
        </Box>
    );
};
