import {StaticScreenProps} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

type Props = StaticScreenProps<{
  itemId: number;
  otherParam: string;
}>;

const Details = ({route}: Props) => {
  const {itemId, otherParam} = route.params;

  return (
    <View>
      <Text>Details Page</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
    </View>
  );
};

export default Details;
