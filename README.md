## Take Home Test

**Table of Contents**

- [Context](#context)
- [Objective](#objective)
- [Deliverables](#deliverables)
- [Getting Started](#getting-started)
- [Deploying on Vercel](#deploying-on-vercel)

## Context:

This repo is a bare bones NextJS / Typescript / Postgres / [Chakra UI](https://v2.chakra-ui.com/docs/components/). On load, it renders a list of interview transcripts broken down as question / answer pairs. This is a very similar representation to how we have structured the data in Junior.

Your task is to build a simple quote bookmarking feature. In the ideal version, a user should be able to bookmark individual quotes from any transcript and be able to view all of their bookmarks & all of their saved quotes in one place. The bookmarks should be stored in the Postgres database and be exportable to a CSV file. Users should be able to create different bookmark folders.

Note 1: the data is mocked using fakerjs. You can ignore the actual transcripts and focus on the bookmarking feature.

Note 2: You can always reach out to me if you have any questions.

## Objective:

Specific requirements for the bookmarking feature:

1. Easily create bookmark folders
2. Ability to save quotes from any transcript into any bookmark folder
3. View all bookmarks in a new route
4. Store bookmarks in a database
5. Export bookmarks to CSV

**Bonus Points**:

- Implement filtering and searching within bookmarks.
- Add an OpenAI generated summary of the quotes for a given bookmark.
- Add a way to delete bookmarks or individual bookmark quotes.

### Deliverables:

- Source code repository (GitHub, GitLab, etc.).
- A brief documentation of your design decisions. Please update the readme.
- A written self assessment of what you turned in. Please update the readme. Include hours spent.
- Ideally: a vercel deployment of the application.

#### Evaluation Criteria

**UI & design**
You are free to design the UI as you see fit. As you will often be required to fill in design gaps, we care about and will evaluate the design as well, but we are primarily evaluating the functionality.

**Functionality**

All the core requirements listed above. We will also be evaluating the code quality, readability, and maintainability.

**Time Expectations**

We expect this to take no more than 4 hours.

## Getting Started

First, you need to set up a Vercel Postgres database. Check out Vercel's [Postgres documentation](https://vercel.com/docs/storage/vercel-postgres) for more details. You can also see this [guide](https://nextjs.org/learn/dashboard-app/setting-up-your-database) for more details.

Then, you need to create a .env.local file with the env variables given above.

You are now ready to run the dev app. You can install the dependencies and run the development server:

```bash
yarn install
yarn dev
```

**Seeding data**:
You can seed the db by hitting `http://localhost:3000/api/seed`. This will seed the database with 5 new transcripts & 20 question-answer pairs. If you need to reset the entire database, you can hit `http://localhost:3000/api/seed?reset=true`.

**Opening the app**:
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploying on Vercel

The easiest way to deploy your Next.js app is to use Vercel. Check out Vercel's [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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
