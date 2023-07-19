import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import ActionList from '../ActionList';
import {useInbrain} from '../context/inbrainContext';
import ToastNotify from '../common/ToastNotify';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({navigation}: RouterProps) => {
  const inbrain = useInbrain();
  const [unAvailable, setUnAvailable] = useState<boolean>(false);
  const [notifyMsg, setNotifyMsg] = useState<string>('');

  /**
   * How to call inbrain.showSurveys()
   */
  const getSurveyWall = () => {
    inbrain
      ?.showSurveys()
      .then(() => {
        console.log('[Show Surveys SUCCESS]');
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  /**
   * How to call inbrain.checkSurveysAvailable()
   */

  const onClickShowSurveys = () => {
    inbrain
      ?.checkSurveysAvailable()
      .then((available: boolean) => {
        if (available) {
          getSurveyWall();
        } else {
          setNotifyMsg('Ooops... No surveys available right now!');
        }
        setUnAvailable(!available);
      })
      .catch((err: Error) => {
        console.log(
          `[Check SurveysWall Available ERROR] => ${err.message || err}`,
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {unAvailable && (
        <ToastNotify message={notifyMsg} callBack={() => setNotifyMsg('')} />
      )}
      <View style={styles.titleContainer}>
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
  titleContainer: {
    marginTop: 15,
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
