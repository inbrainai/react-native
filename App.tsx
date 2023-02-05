/**
 * Inbrain React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';

import inbrain, {
  InBrainNativeSurvey,
  InBrainReward,
  InBrainSurveyFilter,
  InBrainSurveyCategory,
  StatusBarConfig,
  NavigationBarConfig,
} from 'inbrain-surveys';

import {BackHandler} from 'react-native';
import ActionList from './components/ActionList';
import NativeSurveysList from './components/NativeSurveysList';

export default class App extends Component<InbBrainAppProps, InbBrainAppState> {
  public filter: InBrainSurveyFilter;
  constructor(props: InbBrainAppProps) {
    super(props);
    this.state = {
      rewards: [],
      points: 0,
      nativeSurveys: [],
      placementId: undefined,
    };

    this.filter = {
      placementId: this.state.placementId,
      categoryIds: [
        InBrainSurveyCategory.Automotive,
        InBrainSurveyCategory.Business,
        InBrainSurveyCategory.SmokingTobacco,
      ],
      excludedCategoryIds: [InBrainSurveyCategory.BeveragesAlcoholic],
    };
  }

  componentDidMount = () => {
    // To test with your account, replace the credentials below
    const CLIENT_ID = '35c6e720-4f76-4d25-9e18-e718678e27ae';
    const CLIENT_SECRET =
      'nd7Urn+w0vgjdgOYu2k751mQp7p8tCuFWHrDZZzmIK6cXNXKLHacaU6zPeMu8Eql62ijn/m+guTybj0bCspkdA==';
    const USER_ID = 'RNSDKTestUser';

    //Init sdk (required)
    inbrain.setInBrain(CLIENT_ID, CLIENT_SECRET, USER_ID);

    /***** Optional methods *****/

    //set or change userID (can be set in setInBrain, ot using this method)
    inbrain.setSessionID('setUserID');
    // set user session ID
    inbrain.setSessionID('newSessionId');
    // set Data options if required,
    inbrain.setDataOptions({age: '21'});

    /***** UI methods *****/

    // change status bar color, lightStatusBar - works only for IOS, statusBarColor only for android
    const statusBarConfig: StatusBarConfig = {
      lightStatusBar: true,
      statusBarColor: '#EAAAAA',
    };
    inbrain.setStatusBarConfig(statusBarConfig);

    //set navigationBar UI settings
    const navigationBarConfig: NavigationBarConfig = {
      title: 'inBrain Surveys',
      backgroundColor: '#EAAAAA',
      titleColor: '#222AAA',
      buttonsColor: '#ABCDEF',
      hasShadow: false,
    };
    inbrain.setNavigationBarConfig(navigationBarConfig);

    // add lister
    inbrain.setOnSurveysCloseLister(() => {
      this.printLog('[onClose SUCCESS] => ');
      this.sumRewards();
      this.getNativeSurveys(this.filter);
    });

    inbrain.setOnSurveysCloseLister((data) => {
      this.sumRewards();
      this.printLog('[setSurveysCloseListener SUCCESS]');
    })

    // On back button, clean the state to go back to Action list page
    BackHandler.addEventListener('hardwareBackPress', this.cleanState);
  };

  /**
   * How to call inbrain.showSurveys()
   */
  onClickShowSurveys = () => {
    inbrain
      .showSurveys()
      .then(() => {
        this.printLog('[Show Surveys SUCCESS]');
      })
      .catch((err: Error) => {
        this.printLog(`[Show Surveys ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.getRewards()
   */
  sumRewards = () => {
    inbrain
      .getRewards()
      .then((result: InBrainReward[]) => {
        const points = result.reduce((sum, reward) => sum + reward.amount, 0);
        this.printLog(`[Get rewards SUCCESS] => Adding points ${points}`);
        this.setState({points});
        this.confirmReward(result);
      })
      .catch((err: Error) => {
        this.printLog(`[Get rewards ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.confirmReward()
   */
  confirmReward = (rewards: InBrainReward[]) => {
    inbrain.confirmRewards(rewards).then(() => {
      this.printLog('[Confirm rewards SUCCESS]');
    });
  };

  onClickShowNativeSurveys = () => {
    this.getNativeSurveys(this.filter);
  };

  /**
   * How to call inbrain.getNativeSurveys()
   */
  getNativeSurveys = (config: InBrainSurveyFilter) => {
    inbrain
      .getNativeSurveys(config)
      .then((nativeSurveys: InBrainNativeSurvey[]) => {
        this.printLog('[Get Native Surveys SUCCESS]');
        this.setState({nativeSurveys});
      })
      .catch((err: Error) => {
        this.printLog(`[Get Native Surveys ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.showNativeSurvey(id: string)
   */
  onClickShowNativeSurvey = (nativeSurvey: InBrainNativeSurvey) => {
    inbrain
      .showNativeSurvey(nativeSurvey.id, nativeSurvey.searchId)
      .then(() => {
        this.printLog('[Show Native Surveys SUCCESS]');
      })
      .catch((err: Error) => {
        this.printLog(`[Show Native Survey ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.checkSurveysAvailable()
   */
  checkSurveysAvailable = () => {
    inbrain
      .checkSurveysAvailable()
      .then((available: boolean) => {
        this.printLog(`[Check Surveys Available:${available}`);
      })
      .catch((err: Error) => {
        this.printLog(
          `[Check Surveys Available ERROR] => ${err.message || err}`,
        );
        console.log(err);
      });
  };

  // Convenient methods for logging
  printLog = (log: String) => console.log(log);

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>inBrain Surveys</Text>
          <Text style={styles.appSubtitle}>
            {this.state.nativeSurveys.length === 0
              ? 'Example App'
              : 'Native Surveys'}
          </Text>
        </View>

        {this.state.nativeSurveys.length === 0 && (
          <ActionList
            onClickShowNativeSurveys={this.onClickShowNativeSurveys}
            onClickShowSurveys={this.onClickShowSurveys}
          />
        )}

        {this.state.nativeSurveys.length > 0 && (
          <NativeSurveysList
            nativeSurveys={this.state.nativeSurveys}
            onClickShowNativeSurvey={this.onClickShowNativeSurvey}
          />
        )}

        <View>
          <Text style={styles.points}>
            Total Points: {this.state.points.toString()}
          </Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            style={styles.imageLogo}
            source={require('./assets/Logo.png')}
          />
        </View>
        {this.state.nativeSurveys.length > 0 && (
          <View>
            <Button
              onPress={this.cleanState}
              title="Close Survey List"
              color="#841584"
            />
          </View>
        )}
      </SafeAreaView>
    );
  }

  /**
   * Clean App state
   */
  cleanState = () => {
    this.sumRewards();
    this.setState({nativeSurveys: []});
    return true;
  };
}

/**
 * Application state
 */
type InbBrainAppState = {
  points: Number;
  rewards: InBrainReward[];
  nativeSurveys: InBrainNativeSurvey[];
  placementId: string | undefined;
};

/**
 * Application props
 */
type InbBrainAppProps = {};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 10,
    flex: 1,
  },
  headerContainer: {
    marginTop: 20,
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
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 25,
    color: '#0370BE',
    textAlign: 'center',
  },
  imageLogo: {
    width: 220,
    height: 35,
    marginTop: 30,
    resizeMode: 'contain',
  },
  closeButton: {
    width: 35,
    height: 35,
    marginTop: 30,
    marginLeft: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
});
