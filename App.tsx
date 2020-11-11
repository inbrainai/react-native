import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ImageBackground, ScrollView} from 'react-native';
import inbrain, { InBrainNativeSurveys, InBrainReward, InitOptions } from 'inbrain-surveys';
import { BackHandler } from 'react-native';
import ActionList from './components/ActionList';
import NativeSurveysList from './components/NativeSurveysList';

export default class App extends Component<InbBrainAppProps, InbBrainAppState> {

  constructor(props: InbBrainAppProps) {
    super(props);
    this.state = {
      rewards: [], 
      points: 0, 
      nativeSurveys: []
    };
  }

  componentDidMount = () => {
    // To test with your account, replace the credentials below
    const CLIENT_ID='c0bbffc5-3c2b-44e7-a89e-f720c1a5867f'
    const CLIENT_SECRET='5iwiMGX3nWBLtNFHDinib7OfHb1mLUVII9x6Q+5bCLT+CMZZ9YbN9MWdywT/rfGFkmvRV+EwD2ltTAFzGGx1lQ=='

    // Init  options
    const options: InitOptions = {
      sessionUid: 'sessionId', 
      userId: 'userId', 
      dataPoints: { gender: 'male', age: '25'},
      title: "inBrain Surveys",
      navbarColor: "#EC7D37",
      isS2S: false,
      language: 'fr-fr'
    };

    // Initialise the SDK
    inbrain.init(CLIENT_ID, CLIENT_SECRET, options).then(() => {
      this.appendLog(`[Init SUCCESS]`);
    }).catch( (err: any) => {
      this.appendLog(`[Init ERROR] => ${err.message || err}`);
      console.log(err);
    });

    // OnClose listeners
    inbrain.setOnCloseListener(() => {
      this.sumRewards();
      this.appendLog(`[onClose SUCCESS] => `);
    });
    inbrain.setOnCloseListenerFromPage(() => this.appendLog(`[onCloseFromPage SUCCESS] => `));



    // On back button, clean the state to go back to Action list page
    BackHandler.addEventListener('hardwareBackPress', this.cleanState);

  }

  /**
   * How to call inbrain.showSurveys()
   */
  onClickShowSurveys = () => {
    inbrain.showSurveys().then(() => {
      this.appendLog(`[Show Surveys SUCCESS]`);
    }).catch( (err: any) => {
      this.appendLog(`[Show Surveys ERROR] => ${err.message || err}`);
      console.log(err);
    });
  }

  /**
   * How to call inbrain.getRewards()
   */
  sumRewards = () => {
    inbrain.getRewards().then((result: InBrainReward[]) => {
      this.appendLog(`[Get rewards SUCCESS] => Adding points`);

      const points = result.reduce((sum, reward) => sum + reward.amount, 0);
      this.setState({points})
    }).catch( (err: any) => {
      this.appendLog(`[Get rewards ERROR] => ${err.message || err}`);
      console.log(err);
    });
  }

  /**
   * How to call inbrain.getNativeSurveys()
   */
  onClickShowNativeSurveys = () => {
    inbrain.getNativeSurveys().then((nativeSurveys: InBrainNativeSurveys[]) => {
      this.appendLog(`[Get Native Surveys SUCCESS: ${nativeSurveys.length} surveys]`);
      this.setState({nativeSurveys});
    }).catch( (err: any) => {
      this.appendLog(`[Get Native Surveys ERROR] => ${err.message || err}`);
      console.log(err);
    });
  }

  /**
   * How to call inbrain.showNativeSurvey(id: string)
   */
  onClickShowNativeSurvey = (nativeSurvey: InBrainNativeSurveys) => {
    inbrain.showNativeSurvey(nativeSurvey.id).then(() => {
      this.appendLog(`[Show Native Surveys SUCCESS`);
    }).catch( (err: any) => {
      this.appendLog(`[Show Native Survey ERROR] => ${err.message || err}`);
      console.log(err);
    });
  }

  /**
   * How to call inbrain.checkSurveysAvailable()
   */
  checkSurveysAvailable = () => {
    inbrain.checkSurveysAvailable().then((available: boolean) => {
      this.appendLog(`[Check Surveys Available:${available}`);
    }).catch( (err: any) => {
      this.appendLog(`[Check Surveys Available ERROR] => ${err.message || err}`);
      console.log(err);
    });
  }
 
  // Convenient methods for logging
  appendLog = (log: String) => console.log(log);

  render() {
    return (
      <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>inBrain Surveys</Text>
        <Text style={styles.appSubtitle}>{this.state.nativeSurveys.length == 0 ? 'Example App': 'Native Surveys'}</Text>
      </View>

      {this.state.nativeSurveys.length == 0 && <ActionList 
          onClickShowNativeSurveys={this.onClickShowNativeSurveys}
          onClickShowSurveys={this.onClickShowSurveys}/>}

      {this.state.nativeSurveys.length > 0 && <NativeSurveysList 
          nativeSurveys={this.state.nativeSurveys}
          onClickShowNativeSurvey={this.onClickShowNativeSurvey}/>}

      <View>
         <Text style={styles.points}>Total Points: {this.state.points}</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Image style={styles.imageLogo} source={require('./assets/Logo.png')} />
      </View>

    </SafeAreaView>
    );
  }

  /**
   * Clean App state
   */
  cleanState = () => { 
    this.setState({nativeSurveys: []}); 
    return true;
  }

}

/**
 * Application state
 */
type InbBrainAppState = {
  points: Number, 
  rewards: InBrainReward[], 
  nativeSurveys: InBrainNativeSurveys[]
};

/**
 * Application props
 */
type InbBrainAppProps = {};

/**
 * Styles in JS
 */
const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 10,
    flex: 1
  },
  headerContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  appSubtitle: {
    fontSize: 20,
    marginTop: 0,
    textAlign: 'center',
    color: 'grey'
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
    resizeMode: 'contain'
  }
});


