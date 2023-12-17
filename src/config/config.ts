const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 4000;

const MONGO_DB_PORT = process.env.MONGO_DB_PORT || 27017;
const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || 'root';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || 'password';
const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'todo';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'todo';
const MONGO_DB_URL = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}`;

export {
    SERVER_HOSTNAME,
    SERVER_PORT,
    MONGO_DB_URL,
    DB_NAME,
    COLLECTION_NAME,
};