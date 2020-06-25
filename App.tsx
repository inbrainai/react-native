import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import inbrain, { InBrainReward, InitOptions } from 'inbrain-surveys';

export default class App extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentState) {
    super(props);
    this.state = {rewards: [], logs: []};
  }

  componentDidMount = () => {
    const CLIENT_ID='c0bbffc5-3c2b-44e7-a89e-f720c1a5867f'
    const CLIENT_SECRET='5iwiMGX3nWBLtNFHDinib7OfHb1mLUVII9x6Q+5bCLT+CMZZ9YbN9MWdywT/rfGFkmvRV+EwD2ltTAFzGGx1lQ=='
    const USER_ID='react-testing@inbrain.ai'
    const SESSION_UID='sessionid'

    // Init 
    const options: InitOptions = {
      sessionUid: SESSION_UID, 
      userId: USER_ID, 
      dataPoints: { gender: 'male', age: '25'},
      title: "inBrain Surveys",
      navbarColor: "#EC7D37",
      production: true
    };

    inbrain.init(CLIENT_ID, CLIENT_SECRET, options).then(() => {
      this.appendLog(`[Init SUCCESS]`);
    }).catch( (err: any) => {
      this.appendLog(`[Init ERROR] => ${err.message || err}`);
      console.log(err);
    });

    // OnClose listener
    inbrain.setOnCloseListener(() => this.appendLog(`[onClose SUCCESS] => `));
    inbrain.setOnCloseListenerFromPage(() => this.appendLog(`[onCloseFromPage SUCCESS] => `));
  }

  onClickGetRewards= () =>  {
    inbrain.getRewards().then((result) => {
     this.appendLog(`[Get rewards SUCCESS] => ${result}`);
     this.setRewards(result)
   }).catch( (err: any) => {
     this.appendLog(`[Get rewards ERROR] => ${err.message || err}`);
     console.log(err);
   });
  }

  onClickConfirmRewards = () => {
    inbrain.confirmRewards(this.state.rewards).then(() => {
      this.appendLog(`[Confirm rewards SUCCESS]`);
    }).catch( (err: any) => {
      this.appendLog(`[Confirm rewards ERROR] => ${err.message || err}`);
      console.log(err);
    });
   }

   onClickShowSurveys = () => {
      inbrain.showSurveys().then(() => {
        this.appendLog(`[Show Surveys SUCCESS]`);
      }).catch( (err: any) => {
        this.appendLog(`[Show Surveys ERROR] => ${err.message || err}`);
         console.log(err);
      });
    }

      // Convenient 'setRetults' callbacks for 'callBridge'
  setRewards = (rewards: InBrainReward[]) => this.setState({rewards});
  appendLog = (log: String) => console.log(log);

  render() {
    return (
      <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>inBrain Surveys</Text>
        <Text style={styles.appTitle}>Example App</Text>

        <View style={styles.imageContainer}>
          <Image style={styles.imageFloatingLady} source={require('./assets/FloatingWoman.png')} />
        </View>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={this.onClickShowSurveys}>
        <Text style={styles.button}>Open Survey Wall</Text>
      </TouchableOpacity>

      <View style={{flex:1}} />
      <View style={{alignItems: 'center'}}>
        <Image style={styles.imageLogo} source={require('./assets/Logo.png')} />
      </View>

    </SafeAreaView>
    );
  }
}


type ComponentState = {rewards: InBrainReward[], logs: String[]};
type ComponentProps = {};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 30,
    flex: 1
  },
  headerContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  appTitle: {
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
    color: 'grey'
  },
  message: {
    fontSize: 10,
    textAlign: 'left'
  },
  buttonsContainer: {
    alignContent: 'center',
    flexDirection: 'row'
  },
  buttonContainer: {
    marginTop: 80,
    height: 80,
    backgroundColor: '#EC7D37',
    borderRadius: 10,
    justifyContent: 'center'
  },
  button: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
  imageContainer: {
    marginTop: 100,
    alignItems: 'center'
  },
  imageFloatingLady: {
    height: 120,
    resizeMode: 'contain'
  },
  imageLogo: {
    width: 250,
    height: 90,
    resizeMode: 'contain'
  }
});


