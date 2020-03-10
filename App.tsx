import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import inbrain, { InBrainReward } from 'inbrain-surveys';
import { CLIENT_ID, CLIENT_SECRET, USER_ID, SESSION_UID } from 'react-native-dotenv';

const BridgeButton = (props: any) => {
  return <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.name}</Text>
  </TouchableOpacity>;
}

interface IAppState {
  logs: string[];
  rewards: InBrainReward[];
}

export default class App extends Component<{},IAppState> {

  constructor(props:{}) {
    super(props);
    this.state = {rewards: [], logs: []};
  }

  componentDidMount() {
    const clientId = CLIENT_ID;
    const clientSecret = CLIENT_SECRET;
    const sessionUid = SESSION_UID;
    const userId = USER_ID;

    // Init and setAppUserId
    this.callBridge('init', () => inbrain.init(clientId, clientSecret, sessionUid) )();   
    this.callBridge('setAppUserId', () => inbrain.setAppUserId(userId) )(); 
    
    // OnClose listener
    inbrain.setOnCloseListener(() => this.appendLog(`[onClose SUCCESS] => `));
  }

  /**
   * Convenient wrapper method to call the SDK React Native methods.
   * This wrapper will call the SDK method, optionally perform a success callback, and log the output of the bridge or any error.
   * @param name: user friendly name for the method
   * @param sdkMethod: inbrain SDKs method to call
   * @param successCallback: [optional] callback to perform once the promise has been resolved
   */
  callBridge = (name: string, sdkMethod: () => Promise<any>, successCallback?: (obj: any) => void) => () => {
    sdkMethod().then((result:any) => {
      successCallback && successCallback(result);
      this.appendLog(`[${name} SUCCESS] => ${result}`);
    }).catch( (err: any) => {
      this.appendLog(`[${name} ERROR] => ${err}`);
    });
  };

  // Convenient 'setRetults' callbacks for 'callBridge'
  void = (obj:any) => {};
  setRewards = (rewards: InBrainReward[]) => this.setState({rewards});
  appendLog = (log: string) => this.setState({ logs: this.state.logs.concat(log)});

  render() {
    return (
    <SafeAreaView style={styles.container}>

      <View>
        <Text style={styles.title}>SDK Methods</Text>
        <View style={styles.buttonsContainer}>
          <View style={{flexGrow:1, margin: 2}}>
            <BridgeButton name="showSurveys" onPress={this.callBridge("showSurveys", () => inbrain.showSurveys() )} />
            <BridgeButton name="getRewards" onPress={this.callBridge("getRewards", () => inbrain.getRewards(), this.setRewards)} />
            <BridgeButton name="confirmRewards" onPress={this.callBridge("confirmRewards", () => inbrain.confirmRewards(this.state.rewards) )} />
          </View>
          <View style={{flexGrow:1, margin: 2}}>
            <BridgeButton name="setTitle" onPress={this.callBridge("setTitle", () => inbrain.setTitle("InBrain Example Webview") )} />
            <BridgeButton name="setNavbarColor" onPress={this.callBridge("setNavbarColor", () => inbrain.setNavbarColor("ff0000") )} />
            <BridgeButton name="setButtonColor" onPress={this.callBridge("setButtonColor", () => inbrain.setButtonColor("ffff00") )} />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Rewards</Text>

        {this.state.rewards.map((r,i) => (
          <Text style={styles.message} key={r.transactionId}>
            [ Reward {i} ] id={r.transactionId} / amount={r.amount} / currency={r.currency} / transactionType={r.transactionType}
          </Text>
        ))}
      </View>

      <Text style={styles.title}>Logs</Text>
      <ScrollView style={{ flexGrow: 1 }}>
        {this.state.logs.map((m, i) => (
          <Text style={styles.message} key={i}>
            {m}
          </Text>
        ))}
      </ScrollView>

    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 30,
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
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
    backgroundColor: '#2196F3',
    margin: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
});
