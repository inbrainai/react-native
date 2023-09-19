import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type Props = {
  points: number;
  multiplier: number;
  currencySale: boolean;
};

const Points: React.FC<Props> = ({points, multiplier, currencySale}) => {
  const multiplied = currencySale && multiplier > 1;
  let pointsValues = multiplied ? points * multiplier : points;

  return (
    <View style={styles.pointsContainer}>
      {multiplied && <Text style={styles.pointsMultiplied}>{points}</Text>}
      <Text style={styles.pointsText}>{`${pointsValues} points`}</Text>
    </View>
  );
};

export default Points;

const styles = StyleSheet.create({
  pointsMultiplied: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#b4b4b4',
    marginRight: 5,
    fontSize: 20,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  pointsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#47a3dc',
    fontSize: 20,
  },
  pointsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
