// Importing the MongoDB client
const {MongoClient, ServerApiVersion} = require('mongodb');

// Create connection URI with encoded root and password
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("MONGO_URI not defined");
}
if (!dbName) {
  throw new Error("DB_NAME not defined");
}

// Set up client
const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

let db;

// Function to test the connection with the database
async function connectDB() {
    if (db) return db;

    try {
        await client.connect();
        console.log('Connected to MongoDB.');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.log(`Failed to connect to MongoDB ${error}`);
        throw error;
    }
}

// Accessing the collections
function getCollections() {
    if (!db) {
        throw new Error("Database not connected. Call connectDB first.");
    }

    return {
        productsCollection: db.collection("Products"),
        ordersCollection: db.collection("Orders")
    };
}

// Exporting the collections 
module.exports = { connectDB, getCollections }; 