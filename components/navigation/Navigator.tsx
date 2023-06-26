import React from 'react';
import Main from './Main';
import NativeSurveys from './NativeSurveys';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const baseOptions = () => {
    return {
      headerTitle: '',
      headerBackVisible: false,
    };
  };

  // const options = ({navigation}) => {
  //   return {
  //     headerTitle: '',
  //     headerBackVisible: false,
  //     headerRight: () => (
  //       <HomeBtn onPress={() => navigation.navigate('Home')} />
  //     ),
  //   };
  // };

  // const backBtnOptions = ({navigation}) => {
  //   return {
  //     headerTitle: '',
  //     headerLeft: () => <BackBtn onPress={() => navigation.goBack()} />,
  //     headerRight: () => (
  //       <HomeBtn onPress={() => navigation.navigate('Home')} />
  //     ),
  //   };
  // };

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#0a0c27',
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          headerBackTitleVisible: false,
          headerTransparent: true,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Main" component={Main} options={baseOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
