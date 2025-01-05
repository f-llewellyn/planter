import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    {
      name: 'plant.db',
      location: 'default',
    },
    () => {},
    error => {
      console.error(error);
      throw Error('Failed to connect to database');
    },
  );
};

export const createTable = async (db: SQLiteDatabase) => {
  const plantsCreateQuery = `
    CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      imageSrc TEXT NOT NULL,
      summerFeedFreq NUMBER NOT NULL,
      winterFeedFreq NUMBER NOT NULL,
      summerWaterFreq NUMBER NOT NULL,
      winterWaterFreq NUMBER NOT NULL,
      sunlight TEXT NOT NULL
    );
    `;

  try {
    await db.executeSql(plantsCreateQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to create table');
  }
};
