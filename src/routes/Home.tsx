import React, {useCallback, useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import PlantCard from '../components/PlantCard';
import CreateNewCard from '../components/CreateNewCard';
import {PlantContext} from '../../App';
import {getAllPlants} from '../db/plants';
import {useDBContext} from '../utils/hooks/useDBContext.hook';

const Home = () => {
  const {plants, setPlants} = useContext(PlantContext);
  const {db} = useDBContext();

  const loadPlantData = useCallback(async () => {
    if (!db) {
      return;
    }
    try {
      const data = await getAllPlants(db);
      console.log(data);
      setPlants(data);
    } catch (error) {
      console.error(error);
      throw Error('Failed to get plants');
    }
  }, [setPlants, db]);

  useEffect(() => {
    loadPlantData();
  }, [loadPlantData]);

  if (!db) {
    return <Text>Connecting to DB</Text>;
  }

  return (
    <SafeAreaView style={styles.appView}>
      <StatusBar backgroundColor={'#f8f8f8'} barStyle={'dark-content'} />
      <Text style={styles.title}>Planter 🪴</Text>

      <View>
        <CreateNewCard />
        {plants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  appView: {
    backgroundColor: '#f8f8f8',
    height: '100%',
    paddingVertical: 38,
    paddingHorizontal: 24,
  },

  title: {
    fontFamily: 'Poppins-Bold',
    color: '#333333',
    fontSize: 48,
    marginBottom: 10,
  },
});
