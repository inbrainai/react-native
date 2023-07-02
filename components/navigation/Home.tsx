import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ActionList from '../ActionList';
import {useInbrain} from '../context/inbrainContext';
// import {useReward} from '../context/RewardContext';

type RootStackParamList = {
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const inbrain = useInbrain();
  /**
   * How to call inbrain.showSurveys()
   */
  const onClickShowSurveys = () => {
    inbrain
      ?.showSurveys()
      .then(() => {
        console.log('[Show Surveys SUCCESS]');
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>inBrain Surveys</Text>
        <Text style={styles.appSubtitle}>Example App</Text>
      </View>
      <ActionList
        onClickShowSurveys={() => {
          onClickShowSurveys();
        }}
        onClickShowNativeSurveys={() => {
          navigation.navigate('NativeSurveys');
        }}
      />
      <View style={styles.footer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/Logo.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  appSubtitle: {
    fontSize: 20,
    marginTop: 0,
    textAlign: 'center',
    color: 'grey',
  },
  points: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#47a3dc',
    textAlign: 'center',
  },
  imageLogo: {
    width: 220,
    height: 35,
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
  },
});
