import React, { useState, useEffect } from 'react';
import { Button, Select, Box } from '@chakra-ui/react';

interface BookmarkButtonProps {
    onBookmark: (folderId: number) => void;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ onBookmark }) => {
    const [folders, setFolders] = useState<{ id: number; name: string }[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

    useEffect(() => {
        fetchFolders();
    }, []);

    const fetchFolders = async () => {
        const response = await fetch('/api/bookmarks/folders');
        const data = await response.json();
        setFolders(data);
        if (data.length > 0) {
            setSelectedFolder(data[0].id);
        }
    };

    const handleBookmark = () => {
        if (selectedFolder !== null) {
            onBookmark(selectedFolder);
        }
    };

    return (
        <Box>
            <Select
                value={selectedFolder || ''}
                onChange={(e) => setSelectedFolder(Number(e.target.value))}
                mb={2}
            >
                {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                        {folder.name}
                    </option>
                ))}
            </Select>
            <Button onClick={handleBookmark} size="sm" colorScheme="blue" isDisabled={!selectedFolder}>
                Bookmark
            </Button>
        </Box>
    );
};
