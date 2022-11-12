/**
 * Inbrain React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component, type PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  useColorScheme,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import inbrain, {
  InBrainNativeSurveys,
  InBrainReward,
  InitOptions,
  InBrainSurveyFilter,
  InBrainSurveyCategory
} from 'inbrain-surveys';

import { BackHandler } from 'react-native';
import ActionList from './components/ActionList';
import NativeSurveysList from './components/NativeSurveysList';

export default class App extends Component<InbBrainAppProps, InbBrainAppState> {

  constructor(props: InbBrainAppProps) {
    super(props);
    this.state = {
      rewards: [],
      points: 0,
      nativeSurveys: [],
      placementId: undefined,
    };
  }

  componentDidMount = () => {
    // To test with your account, replace the credentials below
    const CLIENT_ID = '852dd4b7-1d05-4803-a1e3-037d0fcfe18f';
    const CLIENT_SECRET =
      'nd7Urn+w0vgjdgOYu2k751mQp7p8tCuFWHrDZZzmIK6cXNXKLHacaU6zPeMu8Eql62ijn/m+guTybj0bCspkdA==';

    // Init  options
    const options: InitOptions = {
      sessionUid: 'newSessionId',
      userId: 'RNSDKTestUser',
      dataPoints: { gender: 'male', age: '25' },
      title: 'inBrain Surveys',
      statusBar: {
        lightStatusBar: true,
      },
      navigationBar: {
        backgroundColor: '#EAAAAA',
        titleColor: '#222AAA',
        buttonsColor: '#ABCDEF',
        hasShadow: false,
      },
      isS2S: false,
      language: 'en-us',
    };

    // Initialise the SDK
    inbrain
      .init(CLIENT_ID, CLIENT_SECRET, options)
      .then(() => {
        this.printLog('[Init SUCCESS]');
      })
      .catch((err: Error) => {
        this.printLog(`[Init ERROR] => ${err.message || err}`);
        console.log(err);
      });

    // OnClose listeners
    inbrain.setOnCloseListener(() => {
      this.sumRewards();
      this.printLog('[onClose SUCCESS] => ');
    });
    inbrain.setOnCloseListenerFromPage(() =>{
      this.sumRewards();
      this.printLog('[onCloseFromPage SUCCESS] => ');
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

        const points = result.reduce((sum, reward) => sum + reward.amount, 0);
        this.printLog(`[Get rewards SUCCESS] => Adding points ${points}`);

        this.setState({ points });
      })
      .catch((err: Error) => {
        this.printLog(`[Get rewards ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.getNativeSurveys()
   */
  
  onClickShowNativeSurveys = () => {
    let config:InBrainSurveyFilter = {
      placementId: this.state.placementId,
      categoryIds: [InBrainSurveyCategory.Automotive],
      excludedCategoryIds: [InBrainSurveyCategory.BeveragesAlcoholic]
    };

    inbrain
      .getNativeSurveys(config)
      .then((nativeSurveys: InBrainNativeSurveys[]) => {
        this.printLog(
          `[Get Native Surveys SUCCESS: ${nativeSurveys.length} surveys]`,
        );
        this.setState({ nativeSurveys });
      })
      .catch((err: Error) => {
        this.printLog(`[Get Native Surveys ERROR] => ${err.message || err}`);
        console.log(err);
      });
  };

  /**
   * How to call inbrain.showNativeSurvey(id: string)
   */
  onClickShowNativeSurvey = (nativeSurvey: InBrainNativeSurveys) => {
    inbrain
      .showNativeSurvey(nativeSurvey.id, this.state.placementId)
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
            {this.state.nativeSurveys.length == 0
              ? 'Example App'
              : 'Native Surveys'}
          </Text>
        </View>

        {this.state.nativeSurveys.length == 0 && (
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
          <Text style={styles.points}>Total Points: {this.state.points}</Text>
        </View>

       
        <View style={{ alignItems: 'center' }}>
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
    this.setState({ nativeSurveys: [] });
    return true;
  };


}


/**
 * Application state
 */
type InbBrainAppState = {
  points: Number;
  rewards: InBrainReward[];
  nativeSurveys: InBrainNativeSurveys[];
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
});

// export default App;
