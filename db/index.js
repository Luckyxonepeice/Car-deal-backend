var {MongoClient, Db} = require('mongodb');

const uri = process.env.DB_URL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function connectDatabase() {
  try {
    await client.connect(); 
    let db=client.db('assingment');
    return db;
} catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
async function closeDatabase() {

  try {
    await client.close();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
}
}

exports.connectDatabase = connectDatabase;
exports.closeDatabase = closeDatabase;