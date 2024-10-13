const dotenvMigrate = require('dotenv');
const pathMigrate = require('path');
const { sql: sqlMigrate } = require('@vercel/postgres');

// Load environment variables from .env.local
dotenvMigrate.config({ path: pathMigrate.resolve(__dirname, '../.env.local') });

async function migrate() {
    try {
        await sqlMigrate`
            CREATE TABLE IF NOT EXISTS bookmarks (
                id SERIAL PRIMARY KEY,
                folder_name TEXT NOT NULL,
                quote TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

migrate().then(() => process.exit());
