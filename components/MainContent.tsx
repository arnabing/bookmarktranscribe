'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement, useToast, Button, ButtonGroup } from '@chakra-ui/react'
import { SearchIcon, DownloadIcon, DeleteIcon } from '@chakra-ui/icons'
import { Sidebar } from './Sidebar'
import { TranscriptView } from './TranscriptView'
import { InterviewPlayer } from './InterviewPlayer'
import { AudioPlayer } from './AudioPlayer'
import { Bookmark, Interview, TranscriptEntry } from '../types'

export const MainContent: React.FC = () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [bookmarkFolders, setBookmarkFolders] = useState<string[]>([])
    const [selectedSection, setSelectedSection] = useState('How AI Changes Venture Capital')
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentAudioTime, setCurrentAudioTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const toast = useToast()

    useEffect(() => {
        console.log("Selected section changed:", selectedSection);
        console.log("Is interview selected:", !!selectedInterview);

        // Clear selectedInterview if the selected section is a bookmark folder
        if (bookmarkFolders.includes(selectedSection)) {
            setSelectedInterview(null);
        } else {
            // Set selectedInterview if the selected section is an interview
            const interview = interviews.find(i => i.title === selectedSection);
            setSelectedInterview(interview || null);
        }
    }, [selectedSection, interviews, bookmarkFolders]);

    useEffect(() => {
        fetchInterviews()
        fetchBookmarks()
    }, [])

    const fetchInterviews = async () => {
        const mockInterview: Interview = {
            id: 1,
            title: "How AI Changes Venture Capital",
            audio_url: "/podcasts/How AI Changes Venture Capital.mp3",
            transcript_entries: [
                { id: 1, start_time: 0, speaker: "Q", content: "What recent change has affected the capital requirements for startups?" },
                { id: 2, start_time: 0, speaker: "A", content: "The advent of AI tools like Auto GPTs has significantly reduced the amount of capital needed for startups. A small team of 2-3 people can now do the work that previously required 20-30 people." },
                { id: 3, start_time: 36, speaker: "Q", content: "How has this change impacted startup funding?" },
                { id: 4, start_time: 36, speaker: "A", content: "Instead of needing $10-40 million Series A rounds, startups can now make significant progress with hundreds of thousands or low millions of dollars." },
                { id: 5, start_time: 50, speaker: "Q", content: "What challenge does this pose for large venture capital funds?" },
                { id: 6, start_time: 50, speaker: "A", content: "Large funds that raised billions for late-stage deals now struggle to pivot to early-stage investing, as they need to learn how to write smaller checks and support smaller teams effectively." },
                { id: 7, start_time: 87, speaker: "Q", content: "What experiment did the speakers try seven years ago?" },
                { id: 8, start_time: 87, speaker: "A", content: "They tried an automated investing system called \"Capital as a Service,\" which used machine learning to make investment decisions based on metrics submitted by companies." },
                { id: 9, start_time: 107, speaker: "Q", content: "What problem did they encounter with this automated investing approach?" },
                { id: 10, start_time: 107, speaker: "A", content: "The administrative burden of supporting 500 companies worldwide was incredibly large and complicated, involving various legal and regulatory challenges in different countries." },
                { id: 11, start_time: 132, speaker: "Q", content: "How does this new landscape affect the venture capital business model?" },
                { id: 12, start_time: 132, speaker: "A", content: "The VC business, traditionally a \"software-light, people-heavy artisanal business,\" now needs to become highly automated to effectively manage a large number of small investments." },
                { id: 13, start_time: 148, speaker: "Q", content: "What term does Friedberg use to describe the current state of the tech industry?" },
                { id: 14, start_time: 148, speaker: "A", content: "Friedberg uses the term \"dust storm\" to describe the extremely confusing and rapidly changing environment." },
                { id: 15, start_time: 215, speaker: "Q", content: "According to David Sacks, what opportunities does this new wave of AI create?" },
                { id: 16, start_time: 215, speaker: "A", content: "Sacks believes there's potential for dozens of new unicorns to be created in various aspects of AI, including AI infrastructure, AI co-pilots for different professions, and improved SaaS products." },
                { id: 17, start_time: 369, speaker: "Q", content: "How has the job market changed for developers?" },
                { id: 18, start_time: 369, speaker: "A", content: "Many developers who previously had multiple high-paying job offers from big tech companies now face fewer options, leading them to start their own companies." },
                { id: 19, start_time: 420, speaker: "Q", content: "What unique situation is occurring in the startup ecosystem right now?" },
                { id: 20, start_time: 420, speaker: "A", content: "There's an unprecedented amount of destruction (with existing companies facing layoffs and reduced targets) occurring simultaneously with creation (new startups with impressive products entering the market)." },
                { id: 21, start_time: 444, speaker: "Q", content: "How might AI tools change the film industry, according to the example given?" },
                { id: 22, start_time: 444, speaker: "A", content: "AI tools could potentially revolutionize screenplay writing software, allowing for more interactive and dynamic creation of dialogue, scenes, and storyboards." },
                { id: 23, start_time: 509, speaker: "Q", content: "How might the traditional venture capital model need to change?" },
                { id: 24, start_time: 509, speaker: "A", content: "Instead of investing hundreds of millions in each startup, VCs might need to adapt to owning significant stakes (10-20%) in companies for just a few million dollars, as AI reduces the capital needs of startups." },
                { id: 25, start_time: 546, speaker: "Q", content: "What warning does one speaker give about the potential writers' strike in Hollywood?" },
                { id: 26, start_time: 546, speaker: "A", content: "He suggests that a strike might encourage the industry to find AI-powered alternatives to human writers, potentially harming the writers' position in the long run." }
            ],
            ai_summary: "This interview discusses how the advent of AI tools has significantly reduced the capital requirements for startups, impacting startup funding and posing challenges for large venture capital funds. The speakers also discuss their experiences with automated investing systems and how the venture capital business model needs to adapt to the new landscape. The interview highlights opportunities created by the new wave of AI and the unique situation occurring in the startup ecosystem."
        };
        setInterviews([mockInterview]);
        setSelectedInterview(mockInterview);
    };

    const fetchBookmarks = async () => {
        // ... (keep existing fetchBookmarks logic)
    }

    const toggleBookmark = useCallback(async (item: TranscriptEntry, isBookmarked: boolean, currentSection: string): Promise<void> => {
        if (isBookmarked) {
            setBookmarks(prev => prev.filter(b => b.id !== item.id));
        } else {
            const newBookmark: Bookmark = {
                ...item,
                folderName: currentSection,
                audioUrl: selectedInterview?.audio_url || ''
            };
            setBookmarks(prev => [...prev, newBookmark]);
        }
        toast({
            title: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    }, [selectedInterview, toast]);

    const addBookmarkFolder = useCallback(() => {
        const folderName = prompt("Enter the name for the new bookmark folder:");
        if (folderName) {
            if (!bookmarkFolders.includes(folderName)) {
                setBookmarkFolders(prev => [...prev, folderName]);
                setSelectedSection(folderName);
                toast({
                    title: 'Folder created',
                    description: `New folder "${folderName}" has been created.`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Folder already exists',
                    description: `A folder named "${folderName}" already exists.`,
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                });
            }
        } else {
            // User cancelled the prompt
            console.log("Folder creation cancelled");
        }
    }, [bookmarkFolders, toast]);

    const playAudio = useCallback((startTime: number, audioUrl: string) => {
        console.log("playAudio called with:", startTime, audioUrl);
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.currentTime = startTime;
            audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
                toast({
                    title: "Error",
                    description: "Failed to play audio. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
            setIsPlaying(true);
            setCurrentAudioUrl(audioUrl);
        } else {
            console.error('Audio element not found or audioUrl is empty');
            toast({
                title: "Error",
                description: "Unable to play audio. Audio source not found.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [toast]);

    const handleAudioTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentAudioTime(audioRef.current.currentTime);
        }
    };

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const isBookmarkSection = bookmarkFolders.includes(selectedSection)

    const downloadCSV = useCallback(() => {
        const csvContent = bookmarks.map(b => `"${b.folderName}","${b.content}"`).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'bookmarks.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [bookmarks]);

    const deleteBookmark = useCallback((bookmarkId: number) => {
        setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
        toast({
            title: 'Bookmark deleted',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    }, [toast]);

    const handleDelete = useCallback(() => {
        if (selectedInterview) {
            setInterviews(prev => prev.filter(i => i.id !== selectedInterview.id));
            setSelectedInterview(null);
            setSelectedSection('');
            toast({
                title: 'Interview deleted',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } else {
            // Delete all bookmarks in the current folder
            setBookmarks(prev => prev.filter(b => b.folderName !== selectedSection));
            toast({
                title: 'Bookmarks deleted',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
    }, [selectedInterview, selectedSection, toast]);

    return (
        <Flex flexDirection="column" height="100vh">
            <Flex flex="1" overflow="hidden">
                <Sidebar
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    interviews={interviews}
                    bookmarkFolders={bookmarkFolders}
                    addBookmarkFolder={addBookmarkFolder}
                />
                <Box flex="1" p={6} position="relative" height="100%" overflowY="auto">
                    <Flex justifyContent="space-between" alignItems="center" mb={4}>
                        <InputGroup flex="1" mr={4}>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.300" />
                            </InputLeftElement>
                            <Input
                                placeholder="Search transcript..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputGroup>
                        <ButtonGroup>
                            <Button leftIcon={<DeleteIcon />} onClick={handleDelete} colorScheme="red">
                                Delete
                            </Button>
                            <Button leftIcon={<DownloadIcon />} onClick={downloadCSV}>
                                Download CSV
                            </Button>
                        </ButtonGroup>
                    </Flex>
                    {selectedInterview ? (
                        <InterviewPlayer
                            title={selectedInterview.title}
                            audioUrl={selectedInterview.audio_url}
                            transcriptEntries={selectedInterview.transcript_entries}
                            bookmarks={bookmarks}
                            toggleBookmark={toggleBookmark}
                            searchQuery={searchQuery}
                            onPlayAudio={playAudio}
                            currentTime={currentAudioTime}
                            isPlaying={isPlaying}
                            aiSummary={selectedInterview.ai_summary} // Add this line
                        />
                    ) : (
                        <TranscriptView
                            selectedSection={selectedSection}
                            bookmarks={bookmarks}
                            toggleBookmark={toggleBookmark}
                            searchQuery={searchQuery}
                            onPlayAudio={playAudio}
                            onDeleteBookmark={deleteBookmark}
                        />
                    )}
                </Box>
            </Flex>
            <audio
                ref={audioRef}
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
            <AudioPlayer
                currentTime={currentAudioTime}
                duration={audioRef.current?.duration || 0}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onSeek={handleSeek}
            />
        </Flex>
    )
}