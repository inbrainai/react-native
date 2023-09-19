import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export type Props = {
  rank: number;
};

const Rank: React.FC<Props> = ({rank}) => {
  let stars = [false, false, false, false, false];
  const emptyStar = require('../../assets/emptyStar.png');
  const filledStar = require('../../assets/star.png');

  return (
    <View style={styles.starsContainer}>
      {stars.map((star, index) => {
        return (
          <Image
            key={index}
            style={styles.star}
            resizeMode={'contain'}
            source={index <= rank ? filledStar : emptyStar}
          />
        );
      })}
    </View>
  );
};

export default React.memo(Rank);

const styles = StyleSheet.create({
  star: {
    width: 12,
    height: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
