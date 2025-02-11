import mongoose from 'mongoose';

interface ConnectionState {
  isConnected?: boolean;
}

const connection: ConnectionState = {};

async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState === 1;
    if (connection.isConnected) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI || '');
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState === 1;
}

async function disconnect(): Promise<void> {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
      console.log('disconnected');
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
