import React from 'react'
import { Box, VStack, Text, Flex, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FaBookmark, FaMicrophone } from 'react-icons/fa'
import { Interview } from '../types'

interface SidebarProps {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
    interviews: Interview[];
    bookmarkFolders: string[];
    addBookmarkFolder: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    selectedSection,
    setSelectedSection,
    interviews,
    bookmarkFolders,
    addBookmarkFolder,
}) => {
    return (
        <Box width="250px" bg="gray.100" p={4}>
            <VStack align="stretch" spacing={4}>
                <Box>
                    <Text fontWeight="bold" mb={2}>Interviews</Text>
                    {interviews.map(interview => (
                        <Flex
                            key={interview.id}
                            p={2}
                            bg={selectedSection === interview.title ? "blue.100" : "transparent"}
                            cursor="pointer"
                            onClick={() => setSelectedSection(interview.title)}
                            alignItems="center"
                        >
                            <FaMicrophone style={{ marginRight: '8px' }} />
                            <Text>{interview.title}</Text>
                        </Flex>
                    ))}
                </Box>
                <Box>
                    <Flex justifyContent="space-between" alignItems="center" mb={2}>
                        <Text fontWeight="bold">Bookmarks</Text>
                        <IconButton
                            aria-label="Add bookmark folder"
                            icon={<AddIcon />}
                            size="sm"
                            onClick={addBookmarkFolder}
                        />
                    </Flex>
                    {bookmarkFolders.map(folder => (
                        <Flex
                            key={folder}
                            p={2}
                            bg={selectedSection === folder ? "blue.100" : "transparent"}
                            cursor="pointer"
                            onClick={() => setSelectedSection(folder)}
                            alignItems="center"
                        >
                            <FaBookmark style={{ marginRight: '8px' }} />
                            <Text>{folder}</Text>
                        </Flex>
                    ))}
                </Box>
            </VStack>
        </Box>
    )
}
