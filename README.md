video demo: https://photos.app.goo.gl/xJDA6N7KuaUwWvRZ7

# AI-Powered Interview Transcript Bookmarking System

This project is an AI-powered interview transcript bookmarking system that allows users to navigate, search, and bookmark key moments from interview transcripts.

## Design Decisions

1. **Component Structure**:
   - `MainContent`: The main container component that manages the overall state and renders either the InterviewPlayer or TranscriptView.
   - `InterviewPlayer`: Displays individual interview transcripts with bookmarking functionality.
   - `TranscriptView`: Shows bookmarked items and suggestions across all interviews.
   - `Sidebar`: Provides navigation between interviews and bookmark folders.
   - `AudioPlayer`: Controls audio playback for interviews and bookmarks.

2. **State Management**:
   - Used React's useState and useCallback hooks for local state management.
   - Centralized main state in the MainContent component for easier data flow and management.

3. **Search Functionality**:
   - Implemented real-time filtering of transcript entries based on user input.
   - Search works across both interview transcripts and bookmarks.

4. **Bookmarking System**:
   - Users can bookmark specific moments in interviews.
   - Bookmarks are organized into folders for easy management.
   - Implemented a suggestion system to show relevant bookmarks from other interviews.

5. **Audio Integration**:
   - Integrated audio playback functionality for both interviews and bookmarked moments.
   - Used HTML5 audio element for playback, controlled via custom AudioPlayer component.

6. **AI Summary**:
   - Added an AI-generated summary at the top of each interview for quick context.

7. **User Interface**:
   - Used Chakra UI for consistent and responsive design.
   - Implemented icons (from react-icons) for intuitive user interaction.

8. **Data Management**:
   - Created custom types (Interview, TranscriptEntry, Bookmark) for better type safety and code clarity.

9. **CSV Export**:
   - Added functionality to export bookmarks as a CSV file for external use.

10. **Deletion Functionality**:
    - Implemented deletion for both interviews and bookmark folders.

This design focuses on creating a user-friendly interface that allows for easy navigation, searching, and bookmarking of interview transcripts, while also leveraging AI capabilities for enhanced context and suggestions.
