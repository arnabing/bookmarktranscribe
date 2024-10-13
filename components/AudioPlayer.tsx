import React from 'react';
import { Box, Flex, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, useColorModeValue } from '@chakra-ui/react';
import { FaBackward, FaPlay, FaPause, FaForward } from 'react-icons/fa';

interface AudioPlayerProps {
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onSeek: (time: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    currentTime,
    duration,
    isPlaying,
    onPlay,
    onPause,
    onSeek
}) => {
    console.log('AudioPlayer render:', { currentTime, duration, isPlaying });

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
    const color = useColorModeValue('gray.800', 'white');

    const handlePlay = () => {
        console.log('Play button clicked in AudioPlayer');
        onPlay();
    };

    const handlePause = () => {
        console.log('Pause button clicked in AudioPlayer');
        onPause();
    };

    const handleSeek = (newTime: number) => {
        console.log('Seek initiated in AudioPlayer:', newTime);
        onSeek(newTime);
    };

    return (
        <Box
            bg={bg}
            backdropFilter="blur(10px)"
            p={4}
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)"
            zIndex={1000}
        >
            <Flex justifyContent="center" alignItems="center" maxWidth="800px" margin="0 auto">
                <Flex alignItems="center" gap={4} width="100%">
                    <Button variant="ghost" onClick={() => handleSeek(Math.max(0, currentTime - 10))} color={color}>
                        <FaBackward />
                    </Button>
                    <Button variant="ghost" onClick={isPlaying ? handlePause : handlePlay} color={color}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </Button>
                    <Button variant="ghost" onClick={() => handleSeek(Math.min(duration, currentTime + 10))} color={color}>
                        <FaForward />
                    </Button>
                    <Flex alignItems="center" flex={1} ml={4}>
                        <Text mr={2} color={color} fontSize="sm">{formatTime(currentTime)}</Text>
                        <Slider
                            aria-label="audio-progress"
                            value={currentTime}
                            min={0}
                            max={duration}
                            onChange={(value) => handleSeek(value)}
                            flex={1}
                            focusThumbOnChange={false}
                        >
                            <SliderTrack bg={useColorModeValue('gray.200', 'gray.600')}>
                                <SliderFilledTrack bg={useColorModeValue('blue.500', 'blue.200')} />
                            </SliderTrack>
                            <SliderThumb boxSize={3} />
                        </Slider>
                        <Text ml={2} color={color} fontSize="sm">{formatTime(duration)}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};
