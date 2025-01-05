import React, {useCallback, useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import PlantCard from '../components/PlantCard';
import CreateNewCard from '../components/CreateNewCard';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@react-navigation/elements';
import {PlantContext} from '../../App';
import {getAllPlants} from '../db/plants';

const Home = () => {
  const {plants, setPlants} = useContext(PlantContext);

  const navigation = useNavigation();

  const loadPlantData = useCallback(async () => {
    try {
      const data = await getAllPlants();
      console.log(data);
      setPlants(data);
    } catch (error) {
      console.error(error);
      throw Error('Failed to get plants');
    }
  }, [setPlants]);

  useEffect(() => {
    loadPlantData();
  }, [loadPlantData]);

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

      <Button
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }>
        Go to details
      </Button>
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
