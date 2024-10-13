const dotenv = require('dotenv');
const path = require('path');
const { sql } = require('@vercel/postgres');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function addTranscriptEntryIdColumn() {
    try {
        if (!process.env.POSTGRES_URL) {
            throw new Error('POSTGRES_URL is not defined in the environment variables');
        }

        console.log('Attempting to connect to the database...');

        await sql`
            ALTER TABLE bookmarks
            ADD COLUMN IF NOT EXISTS transcript_entry_id INTEGER NOT NULL DEFAULT 0
        `;
        console.log('Successfully added transcript_entry_id column to bookmarks table');
    } catch (error) {
        console.error('Error adding transcript_entry_id column:', error);
    }
}

// Log the POSTGRES_URL (make sure to remove this in production)
console.log('POSTGRES_URL:', process.env.POSTGRES_URL);

addTranscriptEntryIdColumn().then(() => process.exit());
