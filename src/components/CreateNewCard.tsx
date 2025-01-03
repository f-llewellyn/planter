import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const CreateNewCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        <FontAwesome5 name="plus" iconStyle="solid" />
      </Text>
      <Text style={styles.cardText}>Add plant</Text>
    </View>
  );
};

export default CreateNewCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 16,
    gap: 10,
    borderRadius: 5,

    flexDirection: 'row',
    alignItems: 'center',

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

  cardText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Poppins-Bold',
    textAlignVertical: 'center',
  },
});
