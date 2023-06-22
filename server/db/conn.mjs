import { MongoClient } from 'mongodb';

const connectionString = process.env.THREADS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch(e) {
    console.error(e)
}

let db = conn.db('threads_college');

export default db;