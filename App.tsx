import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TPlant} from './src/types/plant.type';
import {SunlightEnum} from './src/enums/sunlight.enum';
import PlantCard from './src/components/PlantCard';
import CreateNewCard from './src/components/CreateNewCard';

const plants: TPlant[] = [
  {
    id: 1,
    name: 'Peace Lily',
    imageSrc:
      'https://www.gardenersdream.co.uk/blog/wp-content/uploads/2021/06/peace-2.jpg',
    feedFreq: {
      summer: 14,
      winter: 0,
    },
    waterFreq: {
      summer: 4,
      winter: 9,
    },
    sunlight: SunlightEnum.INDIRECT,
  },
  {
    id: 2,
    name: 'Spider Plant',
    imageSrc:
      'https://www.thespruce.com/thmb/pJlTxKPJKx9WqKiRM20V46z2_Uk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spider-plants-chlorophytum-definition-1902773-01b-b3f60dce30a64c399d52b5538417cc7d.jpg',
    feedFreq: {
      summer: 7,
      winter: 14,
    },
    waterFreq: {
      summer: 3,
      winter: 7,
    },
    sunlight: SunlightEnum.PART_SHADE,
  },
  {
    id: 3,
    name: 'Snake Plant',
    imageSrc:
      'https://media.houseandgarden.co.uk/photos/6736030759a56cf43ffed622/master/w_1600%2Cc_limit/517540986',
    feedFreq: {
      summer: 21,
      winter: 30,
    },
    waterFreq: {
      summer: 7,
      winter: 14,
    },
    sunlight: SunlightEnum.FULL_SHADE,
  },
];

const App = () => {
  return (
    <View style={styles.appView}>
      <Text style={styles.title}>Planter 🪴</Text>

      <View>
        <CreateNewCard />
        {plants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </View>
    </View>
  );
};

export default App;

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
