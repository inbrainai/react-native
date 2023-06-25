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
  BackHandler,
  ActivityIndicator,
} from 'react-native';

import inbrain, {
  InBrainNativeSurvey,
  InBrainReward,
  InBrainSurveyFilter,
  InBrainSurveyCategory,
  StatusBarConfig,
  NavigationBarConfig,
} from 'inbrain-surveys';

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
      showNativeWall: false,
      isLoading: false,
      error: '',
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
    // To test with your account, replace the credentials belowc3630a51ae79405662146581066b387f550ea6de
    const CLIENT_ID = '852dd4b7-1d05-4803-a1e3-037d0fcfe18f';
    const CLIENT_SECRET =
      'nd7Urn+w0vgjdgOYu2k751mQp7p8tCuFWHrDZZzmIK6cXNXKLHacaU6zPeMu8Eql62ijn/m+guTybj0bCspkdA==';
    const USER_ID = 'RNSDKTestUser';

    // Init the sdk (required)
    inbrain.setInBrain(CLIENT_ID, CLIENT_SECRET);

    /***** Optional methods *****/

    // Set or change userID (can be set in setInBrain, ot using this method)
    inbrain.setUserID(USER_ID);
    //Set user session ID
    inbrain.setSessionID('newSessionId');

    /***** UI customization *****/

    // Customize statusBar.
    const statusBarConfig: StatusBarConfig = {
      lightStatusBar: true,
      statusBarColor: '#EAAAAA', // Android only option, have no effect at iOS.
    };
    inbrain.setStatusBarConfig(statusBarConfig);

    // Customize navigationBar
    const navigationBarConfig: NavigationBarConfig = {
      title: 'inBrain.ai Surveys',
      backgroundColor: '#EAAAAA',
      titleColor: '#222AAA',
      buttonsColor: '#ABCDEF',
      hasShadow: false,
    };
    inbrain.setNavigationBarConfig(navigationBarConfig);

    // Add lister
    inbrain.setOnSurveysCloseLister(() => {
      this.printLog('[setOnSurveysCloseLister SUCCESS] => ');
      this.sumRewards();

      // Refresh the surveys if survey wall is open and some survey already taken,
      this.state.showNativeWall && this.getNativeSurveysRoutine();
    });

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
        const rewSum = result.reduce((sum, reward) => sum + reward.amount, 0);
        const points = this.state.points + rewSum;
        this.printLog(`[Get rewards SUCCESS] => Adding points ${points}`);
        this.setState({points});
        this.confirmRewards(result);
      })
      .catch((err: Error) => {
        this.printLog(`[Get rewards ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.confirmReward()
   */
  confirmRewards = (rewards: InBrainReward[]) => {
    inbrain.confirmRewards(rewards).then(() => {
      this.printLog('[Confirm rewards SUCCESS]');
    });
  };

  onClickShowNativeSurveys = () => {
    this.getNativeSurveysRoutine();
    this.setState({showNativeWall: true});
  };

  /**
   * How to call inbrain.getNativeSurveys()
   */
  getNativeSurveys = (filter: InBrainSurveyFilter) => {
    this.setState({isLoading: true});

    inbrain
      .getNativeSurveys(filter)
      .then((nativeSurveys: InBrainNativeSurvey[]) => {
        this.printLog('[Get Native Surveys SUCCESS]');
        this.setState({nativeSurveys, isLoading: false});
      })
      .catch((err: Error) => {
        this.printLog(`[Get Native Surveys ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.showNativeSurvey(id: string, searchId: string)
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
      });
  };

  // Convenient methods for logging
  printLog = (log: String) => console.log(log);

  getNativeSurveysRoutine = () => {
    inbrain
      .checkSurveysAvailable()
      .then((available: boolean) => {
        available && this.getNativeSurveys(this.filter);
      })
      .catch((err: Error) => {
        this.printLog(
          `[Check Surveys Available ERROR] => ${err.message || err}`,
        );
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.showNativeWall && (
          <View style={styles.headerContainer}>
            <Text style={styles.title}>inBrain Surveys</Text>
            <Text style={styles.appSubtitle}>
              {this.state.showNativeWall ? 'Example App' : 'Native Surveys'}
            </Text>
          </View>
        )}

        {this.state.isLoading && (
          <View style={[styles.activityContainer]}>
            <ActivityIndicator />
          </View>
        )}

        {!this.state.showNativeWall && (
          <ActionList
            onClickShowNativeSurveys={this.onClickShowNativeSurveys}
            onClickShowSurveys={this.onClickShowSurveys}
          />
        )}

        {this.state.showNativeWall && (
          <NativeSurveysList
            isLoading={this.state.isLoading}
            nativeSurveys={this.state.nativeSurveys}
            onClickShowNativeSurvey={this.onClickShowNativeSurvey}
          />
        )}

        {!this.state.showNativeWall && (
          <View style={styles.footer}>
            <Text style={styles.points}>
              Total Points: {this.state.points.toString()}
            </Text>
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
    this.setState({...this.state, showNativeWall: false, nativeSurveys: []});
    return true;
  };
}

/**
 * Application state
 */
type InbBrainAppState = {
  points: number;
  rewards: InBrainReward[];
  nativeSurveys: InBrainNativeSurvey[];
  placementId: string | undefined;
  showNativeWall: boolean;
  isLoading: boolean;
  error: string;
};

/**
 * Application props
 */
type InbBrainAppProps = {};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // margin: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#47a3dc',
    textAlign: 'center',
  },
  imageLogo: {
    width: 220,
    height: 35,
    marginTop: 20,
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
  footer: {
    flex: 0.2,
  },
  activityContainer: {
    // flex: 5,
    // backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99,
    elevation: 99,
  },
});
