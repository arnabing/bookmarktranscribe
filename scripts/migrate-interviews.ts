const dotenvInterviews = require('dotenv');
const pathInterviews = require('path');
const { sql: sqlInterviews } = require('@vercel/postgres');

// Load environment variables from .env.local
dotenvInterviews.config({ path: pathInterviews.resolve(__dirname, '../.env.local') });

interface TranscriptEntry {
    id: number;
    start_time: number;
    speaker: string;
    content: string;
}

function timeStringToSeconds(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

async function migrateInterviews() {
    try {
        // Create or update the interviews table
        await sqlInterviews`
            CREATE TABLE IF NOT EXISTS interviews (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL UNIQUE,
                audio_url TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Create or update the transcript_entries table
        await sqlInterviews`
            CREATE TABLE IF NOT EXISTS transcript_entries (
                id SERIAL PRIMARY KEY,
                interview_id INTEGER REFERENCES interviews(id),
                start_time INTEGER NOT NULL,
                speaker TEXT NOT NULL,
                content TEXT NOT NULL
            )
        `;

        // Insert the interview
        const result = await sqlInterviews`
            INSERT INTO interviews (title, audio_url) 
            VALUES ('How AI Changes Venture Capital', '/podcasts/How AI Changes Venture Capital.mp3')
            ON CONFLICT (title) DO UPDATE SET audio_url = EXCLUDED.audio_url
            RETURNING id
        `;

        const interviewId = result.rows[0].id;
        console.log(`Inserted/Updated interview with id: ${interviewId}`);

        // Clear existing transcript entries for this interview
        await sqlInterviews`DELETE FROM transcript_entries WHERE interview_id = ${interviewId}`;
        console.log(`Cleared existing transcript entries for interview ${interviewId}`);

        const transcriptEntries = [
            { start_time: "00:00:00", speaker: "Q", content: "What recent change has affected the capital requirements for startups?" },
            { start_time: "00:00:00", speaker: "A", content: "The advent of AI tools like Auto GPTs has significantly reduced the amount of capital needed for startups. A small team of 2-3 people can now do the work that previously required 20-30 people." },
            { start_time: "00:00:36", speaker: "Q", content: "How has this change impacted startup funding?" },
            { start_time: "00:00:36", speaker: "A", content: "Instead of needing $10-40 million Series A rounds, startups can now make significant progress with hundreds of thousands or low millions of dollars." },
            { start_time: "00:00:50", speaker: "Q", content: "What challenge does this pose for large venture capital funds?" },
            { start_time: "00:00:50", speaker: "A", content: "Large funds that raised billions for late-stage deals now struggle to pivot to early-stage investing, as they need to learn how to write smaller checks and support smaller teams effectively." },
            { start_time: "00:01:27", speaker: "Q", content: "What experiment did the speakers try seven years ago?" },
            { start_time: "00:01:27", speaker: "A", content: "They tried an automated investing system called \"Capital as a Service,\" which used machine learning to make investment decisions based on metrics submitted by companies." },
            { start_time: "00:01:47", speaker: "Q", content: "What problem did they encounter with this automated investing approach?" },
            { start_time: "00:01:47", speaker: "A", content: "The administrative burden of supporting 500 companies worldwide was incredibly large and complicated, involving various legal and regulatory challenges in different countries." },
            { start_time: "00:02:12", speaker: "Q", content: "How does this new landscape affect the venture capital business model?" },
            { start_time: "00:02:12", speaker: "A", content: "The VC business, traditionally a \"software-light, people-heavy artisanal business,\" now needs to become highly automated to effectively manage a large number of small investments." },
            { start_time: "00:02:28", speaker: "Q", content: "What term does Friedberg use to describe the current state of the tech industry?" },
            { start_time: "00:02:28", speaker: "A", content: "Friedberg uses the term \"dust storm\" to describe the extremely confusing and rapidly changing environment." },
            { start_time: "00:03:35", speaker: "Q", content: "According to David Sacks, what opportunities does this new wave of AI create?" },
            { start_time: "00:03:35", speaker: "A", content: "Sacks believes there's potential for dozens of new unicorns to be created in various aspects of AI, including AI infrastructure, AI co-pilots for different professions, and improved SaaS products." },
            { start_time: "00:06:09", speaker: "Q", content: "How has the job market changed for developers?" },
            { start_time: "00:06:09", speaker: "A", content: "Many developers who previously had multiple high-paying job offers from big tech companies now face fewer options, leading them to start their own companies." },
            { start_time: "00:07:00", speaker: "Q", content: "What unique situation is occurring in the startup ecosystem right now?" },
            { start_time: "00:07:00", speaker: "A", content: "There's an unprecedented amount of destruction (with existing companies facing layoffs and reduced targets) occurring simultaneously with creation (new startups with impressive products entering the market)." },
            { start_time: "00:07:24", speaker: "Q", content: "How might AI tools change the film industry, according to the example given?" },
            { start_time: "00:07:24", speaker: "A", content: "AI tools could potentially revolutionize screenplay writing software, allowing for more interactive and dynamic creation of dialogue, scenes, and storyboards." },
            { start_time: "00:08:29", speaker: "Q", content: "How might the traditional venture capital model need to change?" },
            { start_time: "00:08:29", speaker: "A", content: "Instead of investing hundreds of millions in each startup, VCs might need to adapt to owning significant stakes (10-20%) in companies for just a few million dollars, as AI reduces the capital needs of startups." },
            { start_time: "00:09:06", speaker: "Q", content: "What warning does one speaker give about the potential writers' strike in Hollywood?" },
            { start_time: "00:09:06", speaker: "A", content: "He suggests that a strike might encourage the industry to find AI-powered alternatives to human writers, potentially harming the writers' position in the long run." },
        ];

        for (const entry of transcriptEntries) {
            const startTimeSeconds = timeStringToSeconds(entry.start_time);
            await sqlInterviews`
                INSERT INTO transcript_entries (interview_id, start_time, speaker, content)
                VALUES (${interviewId}, ${startTimeSeconds}, ${entry.speaker}, ${entry.content})
            `;
            console.log(`Inserted transcript entry: Start time: ${startTimeSeconds}s, Original time: ${entry.start_time}, Speaker: ${entry.speaker}, Content: ${entry.content.substring(0, 50)}...`);
        }

        // Verify the inserted data
        const verificationResult = await sqlInterviews`
            SELECT id, start_time, speaker, content
            FROM transcript_entries
            WHERE interview_id = ${interviewId}
            ORDER BY start_time
        `;
        console.log('Verification of inserted data:');
        verificationResult.rows.forEach((row: TranscriptEntry, index: number) => {
            console.log(`Entry ${index + 1}: ID ${row.id}, Start time: ${row.start_time}s, Speaker: ${row.speaker}, Content: ${row.content.substring(0, 50)}...`);
        });

        console.log('Interview migration completed successfully');
    } catch (error) {
        console.error('Error during interview migration:', error);
    }
}

migrateInterviews().then(() => process.exit());
