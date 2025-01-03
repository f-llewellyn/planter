import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface IProps {
  children: ReactNode;
  colour: string;
}

const Puck = ({children, colour}: IProps) => {
  return (
    <View style={{backgroundColor: colour, ...styles.puck}}>
      <View style={styles.puckContent}>{children}</View>
    </View>
  );
};

export default Puck;

const styles = StyleSheet.create({
  puck: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  puckContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
