import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import ActionList from '../ActionList';
import {useInbrain} from '../context/inbrainContext';
import ToastNotify from '../common/ToastNotify';
import {useReward} from '../context/RewardContext';

import {OnCloseSurveysData, InBrainReward} from 'inbrain-surveys';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({navigation}: RouterProps) => {
  const inbrain = useInbrain();
  const {reward, setReward} = useReward();
  const [unAvailable, setUnAvailable] = useState<boolean>(false);
  const [notifyMsg, setNotifyMsg] = useState<string>('');

  useEffect(() => {
    /**
     * Add setOnSurveysCloseLister event listener
     */
    let subscription = inbrain?.setOnSurveysCloseLister(
      (event: OnCloseSurveysData) => {
        console.log('[setOnSurveysCloseLister SUCCESS] => ');
        console.log('[Close by WebView => ]', event.byWebView);
        getRewards();
      },
    );

    return () => {
      subscription?.remove();
    };
  }, [reward]);

  /**
   * How to call inbrain.getRewards()
   */
  const getRewards = () => {
    inbrain
      ?.getRewards()
      .then((result: InBrainReward[]) => {
        const rewSum = result.reduce((sum, rew) => sum + rew.amount, 0);
        const points = reward + rewSum;
        setReward(points);
        console.log(`[Get rewards SUCCESS] => Adding points ${points}`);
        confirmRewards(result);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  /**
   * How to call inbrain.confirmReward()
   */
  const confirmRewards = (rewards: InBrainReward[]) => {
    inbrain?.confirmRewards(rewards).then(() => {
      console.log('[Confirm rewards SUCCESS]');
    });
  };

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
