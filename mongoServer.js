// Import classes from mongoDB
const path = require('path');
const propertiesReader = require('properties-reader'); 
const propertiesPath = path.resolve(__dirname, './conf/db.properties');
const properties = propertiesReader(propertiesPath);
const {MongoClient, ServerApiVersion} = require('mongodb');

// Create connection URI with encoded root and password
const uri = process.env.MONGO_URI;
const db = process.env.DB_NAME;

if (!uri) {
  throw new Error("MONGO_URI not defined");
}
if (!db) {
  throw new Error("DB_NAME not defined");
}

// Set up client
const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

// Function to test the connection with the database
async function testConnection() {
    try {
        await client.connect();
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.log(`Failed to connect to MongoDB ${error}`);
    }
}
testConnection();

// The collections that will be used
const productsCollection = db.collection("Products");
const ordersCollection = db.collection("Orders");

// Exporting the collections 
module.exports = { productsCollection, ordersCollection };