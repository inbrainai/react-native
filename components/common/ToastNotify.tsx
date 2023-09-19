import React, {useEffect, useRef} from 'react';
import {Animated, Text, View, StyleSheet} from 'react-native';

type msgProps = {
  message: string;
  callBack: () => void;
};

const ToastNotify = ({message, callBack}: msgProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        callBack();
      });
    }
  }, [message]);

  return (
    <Animated.View
      style={[
        styles.msgContainer,
        {
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}>
      <View style={styles.message}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default ToastNotify;

const styles = StyleSheet.create({
  msgContainer: {
    position: 'absolute',
    paddingTop: 45,
    left: 0,
    right: 0,
    backgroundColor: '#ff6b6b',
    elevation: 999,
    zIndex: 999,
  },
  message: {
    paddingVertical: 15,
    verticalAlign: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
  },
});
