import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

//@TODO ADD TYPESCIPT

const Time = ({time}) => {
  return (
    <View style={styles.timeContainer}>
      <Image
        style={styles.timeImage}
        resizeMode={'contain'}
        source={require('../../assets/time.png')}
      />
      <Text style={styles.timeText}>{time}</Text>
      <Text style={styles.timeText}>min</Text>
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  timeImage: {
    width: 12,
    height: 12,
    marginLeft: 8,
  },
  timeText: {
    marginLeft: 3,
    color: '#b4b4b4',
    fontSize: 12,
  },
  timeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
