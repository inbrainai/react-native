import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export type Props = {
  show: boolean;
};

const ActivityWithOverlay: React.FC<Props> = ({show}) => {
  return (
    <>
      {show && (
        <View style={styles.activityContainer}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

export default ActivityWithOverlay;

const styles = StyleSheet.create({
  activityContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99,
    elevation: 99,
  },
});
