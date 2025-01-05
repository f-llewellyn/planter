import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {TPlant} from '../types/plant.type';
import {connectToDatabase} from './db';

export const getAllPlants = async (): Promise<TPlant[]> => {
  const db = await connectToDatabase();
  const selectQuery = `
            SELECT * FROM plants;
        `;

  try {
    const [results] = await db.executeSql(selectQuery);
    const plants: TPlant[] = [];

    for (let i = 0; i < results.rows.length; i++) {
      const plant = results.rows.item(i);
      plants.push({
        id: plant.id,
        name: plant.name,
        imageSrc: plant.imageSrc,
        feedFreq: {
          summer: plant.summerFeedFreq,
          winter: plant.winterFeedFreq,
        },
        waterFreq: {
          summer: plant.summerWaterFreq,
          winter: plant.winterWaterFreq,
        },
        sunlight: plant.sunlight,
      });
    }

    return plants;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get plants');
  }
};

export const getPlantByIdPlants = async (
  db: SQLiteDatabase,
  id: number,
): Promise<TPlant | null> => {
  const selectQuery = `
            SELECT * FROM plants WHERE id = ${id};
        `;

  try {
    const [results] = await db.executeSql(selectQuery);
    const plants: TPlant[] = [];

    for (let i = 0; i < results.rows.length; i++) {
      const plant = results.rows.item(i);
      plants.push({
        id: plant.id,
        name: plant.name,
        imageSrc: plant.imageSrc,
        feedFreq: {
          summer: plant.summerFeedFreq,
          winter: plant.winterFeedFreq,
        },
        waterFreq: {
          summer: plant.summerWaterFreq,
          winter: plant.winterWaterFreq,
        },
        sunlight: plant.sunlight,
      });
    }

    if (!plants.length) {
      return null;
    }

    return plants[0];
  } catch (error) {
    console.error(error);
    throw Error('Failed to get plants');
  }
};

export const addPlant = async (db: SQLiteDatabase, plant: TPlant) => {
  const insertQuery = `
        INSERT INTO plants (
        name,
        imageSrc,
        summerFeedFreq,
        winterFeedFreq,
        summerWaterFreq,
        winterWaterFreq,
        sunlight
        ) VALUES (
        '${plant.name}',
        '${plant.imageSrc}',
        '${plant.feedFreq.summer}',
        '${plant.feedFreq.winter}',
        '${plant.waterFreq.summer}',
        '${plant.waterFreq.winter}',
        '${plant.sunlight}'
        );
    `;

  try {
    await db.executeSql(insertQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add plant');
  }
};

export const updatePlant = async (
  db: SQLiteDatabase,
  plant: TPlant,
  id: number,
) => {
  const updateQuery = `
        UPDATE plants
        SET
        name = '${plant.name}',
        imageSrc = '${plant.imageSrc}',
        summerFeedFreq = '${plant.feedFreq.summer}',
        winterFeedFreq = '${plant.feedFreq.winter}',
        summerWaterFreq = '${plant.waterFreq.summer}',
        winterWaterFreq = '${plant.waterFreq.winter}',
        sunlight = '${plant.sunlight}'
        WHERE id = ${id};
    `;

  try {
    await db.executeSql(updateQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update plant');
  }
};

export const deletePlant = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `
            DELETE FROM plants WHERE id = ${id};
        `;

  try {
    await db.executeSql(deleteQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to delete plant');
  }
};
