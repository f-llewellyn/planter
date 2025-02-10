import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TPlant} from '../types/plant.type';
import Puck from './Puck';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import {getSeason} from '../utils/getSeason';

interface IProps {
  plant: TPlant;
}

const PlantCard = ({plant}: IProps) => {
  const imgSrc = plant.imageSrc;

  const season = getSeason();

  return (
    <View style={styles.plantCard}>
      <Image
        style={styles.plantCardImage}
        source={{uri: imgSrc ? imgSrc : 'https://placehold.co/250/png'}}
      />

      <View style={styles.plantCardInfo}>
        <Text style={styles.plantCardText}>{plant.name}</Text>
        <View style={styles.plantCardPucks}>
          <Puck colour="#FFF0C6">
            <Text>
              <FontAwesome5 name="sun" iconStyle="solid" />
            </Text>
            <Text style={styles.puckText}>{plant.sunlight}</Text>
          </Puck>
          <Puck colour="#c6e7ff">
            <Text>
              <FontAwesome5 name="tint" iconStyle="solid" />
            </Text>
            <Text>{plant.waterFreq[season]}</Text>
          </Puck>
          <Puck colour="#C9FFC6">
            <Text>
              <FontAwesome5 name="utensils" iconStyle="solid" />
            </Text>
            <Text style={styles.puckText}>{plant.feedFreq[season]}</Text>
          </Puck>
        </View>
      </View>
    </View>
  );
};

export default PlantCard;

const styles = StyleSheet.create({
  plantCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 5,

    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    backgroundColor: 'white',
    elevation: 3,
  },

  plantCardImage: {
    width: '30%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  plantCardInfo: {
    padding: 16,
  },

  plantCardText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#333333',
  },

  plantCardPucks: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 10,
  },

  puckText: {
    textAlignVertical: 'center',
    lineHeight: 18,
  },
});
