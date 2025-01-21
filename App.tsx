import React, {createContext, useCallback, useEffect, useState} from 'react';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/routes/Home';
import Details from './src/routes/Details';
import {TPlant} from './src/types/plant.type';
import {connectToDatabase, createTable} from './src/db/db';
import Create from './src/routes/Create';

type RootStackParamList = StaticParamList<typeof RootStack>;

interface IPlantContext {
  plants: TPlant[];
  setPlants: (value: TPlant[]) => void;
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: {backgroundColor: '#f8f8f8'},
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        title: 'Planter 🪴',
      },
    },
    Details: Details,
    Create: {
      screen: Create,
      options: {
        title: 'Add new plant',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const PlantContext = createContext<IPlantContext>(
  null as unknown as IPlantContext,
);

const App = () => {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTable(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [plants, setPlants] = useState<TPlant[]>([]);

  return (
    <PlantContext.Provider value={{plants, setPlants}}>
      <Navigation />
    </PlantContext.Provider>
  );
};

export default App;
