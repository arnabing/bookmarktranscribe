import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface BookmarkFolderProps {
    onCreateFolder: (name: string) => void;
}

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({ onCreateFolder }) => {
    const [folderName, setFolderName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (folderName.trim()) {
            onCreateFolder(folderName.trim());
            setFolderName('');
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <Input
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Enter folder name"
                />
                <Button type="submit" colorScheme="blue">
                    Create Folder
                </Button>
            </VStack>
        </Box>
    );
};
